import { searchVideos } from "@/src/services/youtube/queries";
import type {
  YouTubeSearchParams,
  YouTubeSearchResponse,
} from "@/src/types/youtube";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseYouTubeSearchOptions extends YouTubeSearchParams {
  enabled?: boolean;
}

export function useYouTubeSearch(options: UseYouTubeSearchOptions) {
  const {
    query,
    maxResults = 10,
    type = "video",
    order = "relevance",
    enabled = true,
  } = options;

  return useInfiniteQuery<YouTubeSearchResponse, Error>({
    queryKey: ["youtube", "search", query, maxResults, type, order],
    queryFn: ({ pageParam }) =>
      searchVideos(
        {
          query,
          maxResults,
          type,
          order,
        },
        pageParam as string | undefined
      ),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
  });
}
