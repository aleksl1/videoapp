import { getVideoDetails } from "@/src/services/youtube/queries";
import type { YouTubeVideoDetailsResponse } from "@/src/types/youtube";
import { useQuery } from "@tanstack/react-query";

interface UseYouTubeVideoDetailsOptions {
  videoId: string;
  enabled?: boolean;
}

export function useYouTubeVideoDetails(options: UseYouTubeVideoDetailsOptions) {
  const { videoId, enabled = true } = options;

  return useQuery<YouTubeVideoDetailsResponse, Error>({
    queryKey: ["youtube", "video", videoId],
    queryFn: () => getVideoDetails(videoId),
    enabled: enabled && videoId.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes (formerly cacheTime)
  });
}

