import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useYouTubeSearch } from "@/src/hooks/useYouTubeSearch";
import * as queries from "@/src/services/youtube/queries";
import React from "react";

// Mock the YouTube queries
jest.mock("@/src/services/youtube/queries");

const mockSearchVideos = queries.searchVideos as jest.MockedFunction<
  typeof queries.searchVideos
>;

const mockYouTubeResponse = {
  kind: "youtube#searchListResponse",
  etag: "test-etag",
  nextPageToken: "next-token",
  regionCode: "US",
  pageInfo: {
    totalResults: 100,
    resultsPerPage: 10,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "video-etag-1",
      id: {
        kind: "youtube#video",
        videoId: "video1",
      },
      snippet: {
        publishedAt: "2024-01-01T00:00:00Z",
        channelId: "channel1",
        title: "Test Video 1",
        description: "Test description 1",
        thumbnails: {
          default: { url: "thumb1-default.jpg", width: 120, height: 90 },
          medium: { url: "thumb1-medium.jpg", width: 320, height: 180 },
          high: { url: "thumb1-high.jpg", width: 480, height: 360 },
        },
        channelTitle: "Test Channel",
        liveBroadcastContent: "none",
        publishTime: "2024-01-01T00:00:00Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "video-etag-2",
      id: {
        kind: "youtube#video",
        videoId: "video2",
      },
      snippet: {
        publishedAt: "2024-01-02T00:00:00Z",
        channelId: "channel2",
        title: "Test Video 2",
        description: "Test description 2",
        thumbnails: {
          default: { url: "thumb2-default.jpg", width: 120, height: 90 },
          medium: { url: "thumb2-medium.jpg", width: 320, height: 180 },
          high: { url: "thumb2-high.jpg", width: 480, height: 360 },
        },
        channelTitle: "Another Channel",
        liveBroadcastContent: "none",
        publishTime: "2024-01-02T00:00:00Z",
      },
    },
  ],
};

const mockSecondPageResponse = {
  ...mockYouTubeResponse,
  nextPageToken: undefined,
  items: [
    {
      kind: "youtube#searchResult",
      etag: "video-etag-3",
      id: {
        kind: "youtube#video",
        videoId: "video3",
      },
      snippet: {
        publishedAt: "2024-01-03T00:00:00Z",
        channelId: "channel3",
        title: "Test Video 3",
        description: "Test description 3",
        thumbnails: {
          default: { url: "thumb3-default.jpg", width: 120, height: 90 },
          medium: { url: "thumb3-medium.jpg", width: 320, height: 180 },
          high: { url: "thumb3-high.jpg", width: 480, height: 360 },
        },
        channelTitle: "Third Channel",
        liveBroadcastContent: "none",
        publishTime: "2024-01-03T00:00:00Z",
      },
    },
  ],
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

describe("useYouTubeSearch Hook", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    queryClient.clear();
    // Wait for any pending timers
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  describe("Data Fetching", () => {
    it("should fetch YouTube videos successfully", async () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React Native",
            maxResults: 10,
            order: "relevance",
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.pages).toHaveLength(1);
      expect(result.current.data?.pages[0].items).toHaveLength(2);
      expect(result.current.data?.pages[0].items[0].snippet.title).toBe(
        "Test Video 1"
      );
    });

    it("should pass correct parameters to search API", async () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      renderHook(
        () =>
          useYouTubeSearch({
            query: "React Native",
            maxResults: 20,
            order: "date",
            type: "video",
          }),
        { wrapper }
      );

      await waitFor(() => expect(mockSearchVideos).toHaveBeenCalled());

      expect(mockSearchVideos).toHaveBeenCalledWith(
        {
          query: "React Native",
          maxResults: 20,
          order: "date",
          type: "video",
        },
        undefined
      );
    });

    it("should use default values for optional parameters", async () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      renderHook(
        () =>
          useYouTubeSearch({
            query: "TypeScript",
          }),
        { wrapper }
      );

      await waitFor(() => expect(mockSearchVideos).toHaveBeenCalled());

      expect(mockSearchVideos).toHaveBeenCalledWith(
        {
          query: "TypeScript",
          maxResults: 10,
          order: "relevance",
          type: "video",
        },
        undefined
      );
    });
  });

  describe("Infinite Scrolling", () => {
    it("should support fetching next page", async () => {
      mockSearchVideos
        .mockResolvedValueOnce(mockYouTubeResponse)
        .mockResolvedValueOnce(mockSecondPageResponse);

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.hasNextPage).toBe(true);

      // Fetch next page
      result.current.fetchNextPage();

      await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));

      expect(result.current.data?.pages[0].items).toHaveLength(2);
      expect(result.current.data?.pages[1].items).toHaveLength(1);
      expect(result.current.hasNextPage).toBe(false);
    });

    it("should pass pageToken when fetching next page", async () => {
      mockSearchVideos
        .mockResolvedValueOnce(mockYouTubeResponse)
        .mockResolvedValueOnce(mockSecondPageResponse);

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "JavaScript",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      result.current.fetchNextPage();

      await waitFor(() => expect(mockSearchVideos).toHaveBeenCalledTimes(2));

      expect(mockSearchVideos).toHaveBeenNthCalledWith(
        2,
        {
          query: "JavaScript",
          maxResults: 10,
          order: "relevance",
          type: "video",
        },
        "next-token"
      );
    });

    it("should indicate when there is no next page", async () => {
      const responseWithoutNextToken = {
        ...mockYouTubeResponse,
        nextPageToken: undefined,
      };

      mockSearchVideos.mockResolvedValue(responseWithoutNextToken);

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.hasNextPage).toBe(false);
    });
  });

  describe("Error Handling", () => {
    it("should handle API errors", async () => {
      const apiError = new Error("YouTube API Error");
      mockSearchVideos.mockRejectedValue(apiError);

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React Native",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("Query Enablement", () => {
    it("should not fetch when query is empty", () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      renderHook(
        () =>
          useYouTubeSearch({
            query: "",
            maxResults: 10,
          }),
        { wrapper }
      );

      expect(mockSearchVideos).not.toHaveBeenCalled();
    });

    it("should not fetch when enabled is false", () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
            enabled: false,
          }),
        { wrapper }
      );

      expect(mockSearchVideos).not.toHaveBeenCalled();
    });

    it("should fetch when enabled is true and query is not empty", async () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
            enabled: true,
          }),
        { wrapper }
      );

      await waitFor(() => expect(mockSearchVideos).toHaveBeenCalled());
    });
  });

  describe("Query Key", () => {
    it("should create unique query keys based on parameters", async () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      const { result: result1 } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
            order: "relevance",
          }),
        { wrapper }
      );

      await waitFor(() => expect(result1.current.isSuccess).toBe(true));

      const { result: result2 } = renderHook(
        () =>
          useYouTubeSearch({
            query: "Vue",
            maxResults: 10,
            order: "relevance",
          }),
        { wrapper }
      );

      await waitFor(() => expect(result2.current.isSuccess).toBe(true));

      // Different queries should result in different data
      expect(mockSearchVideos).toHaveBeenCalledTimes(2);
    });
  });

  describe("Caching", () => {
    it("should cache results based on staleTime", async () => {
      mockSearchVideos.mockResolvedValue(mockYouTubeResponse);

      const { result: result1 } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result1.current.isSuccess).toBe(true));

      // Render the same hook again immediately
      const { result: result2 } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result2.current.isSuccess).toBe(true));

      // Should use cached data, not make another API call
      expect(mockSearchVideos).toHaveBeenCalledTimes(1);
    });
  });

  describe("Loading States", () => {
    it("should indicate loading state during initial fetch", async () => {
      mockSearchVideos.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockYouTubeResponse), 100);
          })
      );

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
          }),
        { wrapper }
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeDefined();
    });

    it("should fetch next page successfully", async () => {
      mockSearchVideos
        .mockResolvedValueOnce(mockYouTubeResponse)
        .mockResolvedValueOnce(mockSecondPageResponse);

      const { result } = renderHook(
        () =>
          useYouTubeSearch({
            query: "React",
            maxResults: 10,
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      result.current.fetchNextPage();

      await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));

      expect(result.current.data?.pages[0].items).toHaveLength(2);
      expect(result.current.data?.pages[1].items).toHaveLength(1);
    });
  });
});
