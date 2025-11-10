import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryList from "@/src/components/category/CategoryList";
import * as useYouTubeSearchHook from "@/src/hooks/useYouTubeSearch";

// Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock CategoryCard component
jest.mock("@/src/components/category/CategoryCard", () => {
  const { View, Text, TouchableOpacity } = require("react-native");
  return function CategoryCard({ video, onPress }: any) {
    return (
      <TouchableOpacity testID={`video-card-${video.id}`} onPress={onPress}>
        <Text>{video.title}</Text>
      </TouchableOpacity>
    );
  };
});

// Mock ShowMoreButton component
jest.mock("@/src/components/category/ShowMoreButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return function ShowMoreButton({ category, onPress }: any) {
    return (
      <TouchableOpacity testID="show-more-button" onPress={onPress}>
        <Text>Show More {category}</Text>
      </TouchableOpacity>
    );
  };
});

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

const mockVideoData = [
  {
    id: { videoId: "video1" },
    snippet: {
      title: "React Native Tutorial",
      channelTitle: "Tech Channel",
      publishedAt: "2024-01-01T00:00:00Z",
      thumbnails: {
        medium: {
          url: "https://example.com/thumb1.jpg",
          width: 320,
          height: 180,
        },
        default: {
          url: "https://example.com/thumb1.jpg",
          width: 120,
          height: 90,
        },
        high: {
          url: "https://example.com/thumb1.jpg",
          width: 480,
          height: 360,
        },
      },
      description: "Learn React Native",
      channelId: "channel1",
      liveBroadcastContent: "none",
      publishTime: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: { videoId: "video2" },
    snippet: {
      title: "Advanced React Native",
      channelTitle: "Pro Channel",
      publishedAt: "2024-01-02T00:00:00Z",
      thumbnails: {
        medium: {
          url: "https://example.com/thumb2.jpg",
          width: 320,
          height: 180,
        },
        default: {
          url: "https://example.com/thumb2.jpg",
          width: 120,
          height: 90,
        },
        high: {
          url: "https://example.com/thumb2.jpg",
          width: 480,
          height: 360,
        },
      },
      description: "Advanced concepts",
      channelId: "channel2",
      liveBroadcastContent: "none",
      publishTime: "2024-01-02T00:00:00Z",
    },
  },
];

describe("CategoryList Component", () => {
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

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  describe("Loading State", () => {
    it("should show loading indicator when fetching data", () => {
      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        error: null,
        status: "pending",
        fetchStatus: "fetching",
        refetch: jest.fn(),
        isFetching: true,
        isSuccess: false,
        isPending: true,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: false,
        isFetchedAfterMount: false,
        isInitialLoading: true,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      expect(screen.getByTestId("activity-indicator")).toBeTruthy();
    });
  });

  describe("Success State", () => {
    it("should render video cards when data is loaded", async () => {
      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: {
          pages: [
            {
              items: mockVideoData,
              kind: "youtube#searchListResponse",
              etag: "test",
              regionCode: "US",
              pageInfo: {
                totalResults: 2,
                resultsPerPage: 10,
              },
            },
          ],
          pageParams: [undefined],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        error: null,
        status: "success",
        fetchStatus: "idle",
        refetch: jest.fn(),
        isFetching: false,
        isSuccess: true,
        isPending: false,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      await waitFor(() => {
        expect(screen.getByText("React Native Tutorial")).toBeTruthy();
        expect(screen.getByText("Advanced React Native")).toBeTruthy();
      });
    });

    it("should display category header", () => {
      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: {
          pages: [
            {
              items: mockVideoData,
              kind: "youtube#searchListResponse",
              etag: "test",
              regionCode: "US",
              pageInfo: {
                totalResults: 2,
                resultsPerPage: 10,
              },
            },
          ],
          pageParams: [undefined],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        error: null,
        status: "success",
        fetchStatus: "idle",
        refetch: jest.fn(),
        isFetching: false,
        isSuccess: true,
        isPending: false,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      expect(screen.getByText("React Native")).toBeTruthy();
    });

    it("should render show more button", () => {
      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: {
          pages: [
            {
              items: mockVideoData,
              kind: "youtube#searchListResponse",
              etag: "test",
              regionCode: "US",
              pageInfo: {
                totalResults: 2,
                resultsPerPage: 10,
              },
            },
          ],
          pageParams: [undefined],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        error: null,
        status: "success",
        fetchStatus: "idle",
        refetch: jest.fn(),
        isFetching: false,
        isSuccess: true,
        isPending: false,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      expect(screen.getByTestId("show-more-button")).toBeTruthy();
    });
  });

  describe("Error State", () => {
    it("should show error message when fetch fails", () => {
      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        error: new Error("API Error"),
        status: "error",
        fetchStatus: "idle",
        refetch: jest.fn(),
        isFetching: false,
        isSuccess: false,
        isPending: false,
        isRefetching: false,
        isLoadingError: true,
        isRefetchError: false,
        dataUpdatedAt: 0,
        errorUpdatedAt: Date.now(),
        failureCount: 1,
        failureReason: new Error("API Error"),
        errorUpdateCount: 1,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      expect(screen.getByText("Failed to load videos")).toBeTruthy();
    });
  });

  describe("Infinite Scroll", () => {
    it("should call fetchNextPage when more data is available", async () => {
      const mockFetchNextPage = jest.fn();

      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: {
          pages: [
            {
              items: mockVideoData,
              kind: "youtube#searchListResponse",
              etag: "test",
              regionCode: "US",
              pageInfo: {
                totalResults: 20,
                resultsPerPage: 10,
              },
              nextPageToken: "next-page-token",
            },
          ],
          pageParams: [undefined],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: mockFetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
        error: null,
        status: "success",
        fetchStatus: "idle",
        refetch: jest.fn(),
        isFetching: false,
        isSuccess: true,
        isPending: false,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      const { getByTestId } = renderWithProviders(
        <CategoryList category="React Native" />
      );

      const flatList = getByTestId("category-flatlist");

      // Simulate scroll to end
      flatList.props.onEndReached();

      await waitFor(() => {
        expect(mockFetchNextPage).toHaveBeenCalled();
      });
    });

    it("should show loading indicator while fetching next page", () => {
      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: {
          pages: [
            {
              items: mockVideoData,
              kind: "youtube#searchListResponse",
              etag: "test",
              regionCode: "US",
              pageInfo: {
                totalResults: 20,
                resultsPerPage: 10,
              },
              nextPageToken: "next-page-token",
            },
          ],
          pageParams: [undefined],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isFetchingNextPage: true,
        error: null,
        status: "success",
        fetchStatus: "fetching",
        refetch: jest.fn(),
        isFetching: true,
        isSuccess: true,
        isPending: false,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      // Footer loading indicator should be visible
      const activityIndicators = screen.getAllByTestId("activity-indicator");
      expect(activityIndicators.length).toBeGreaterThan(0);
    });
  });

  describe("Data Deduplication", () => {
    it("should remove duplicate videos from multiple pages", () => {
      const duplicateVideoData = [
        ...mockVideoData,
        mockVideoData[0], // Duplicate
      ];

      jest.spyOn(useYouTubeSearchHook, "useYouTubeSearch").mockReturnValue({
        data: {
          pages: [
            {
              items: duplicateVideoData,
              kind: "youtube#searchListResponse",
              etag: "test",
              regionCode: "US",
              pageInfo: {
                totalResults: 3,
                resultsPerPage: 10,
              },
            },
          ],
          pageParams: [undefined],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        error: null,
        status: "success",
        fetchStatus: "idle",
        refetch: jest.fn(),
        isFetching: false,
        isSuccess: true,
        isPending: false,
        isRefetching: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: Date.now(),
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPlaceholderData: false,
        isPaused: false,
        isStale: false,
      } as any);

      renderWithProviders(<CategoryList category="React Native" />);

      // Should only render 2 unique videos, not 3
      const videoCards = screen.getAllByTestId(/^video-card-/);
      expect(videoCards).toHaveLength(2);
    });
  });
});
