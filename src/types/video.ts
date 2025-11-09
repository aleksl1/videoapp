// Video type definitions
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  viewCount: number;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
}

export interface VideoSearchParams {
  query: string;
  maxResults?: number;
  pageToken?: string;
}
