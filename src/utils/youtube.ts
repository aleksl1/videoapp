import type { YouTubeSearchItem } from "@/src/types/youtube";

export interface VideoCardData {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
}

/**
 * Transforms YouTube API search item to the format expected by CategoryCard
 */
export function transformYouTubeVideo(item: YouTubeSearchItem): VideoCardData {
  return {
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description,
  };
}

/**
 * Transforms an array of YouTube API search items
 */
export function transformYouTubeVideos(
  items: YouTubeSearchItem[]
): VideoCardData[] {
  return items.map(transformYouTubeVideo);
}
