import { youtubeApiGet } from './api';
import type { YouTubeSearchResponse, YouTubeSearchParams } from '@/src/types/youtube';

export async function searchVideos(
  params: YouTubeSearchParams,
  pageToken?: string
): Promise<YouTubeSearchResponse> {
  const searchParams = {
    part: 'snippet',
    q: params.query,
    type: params.type || 'video',
    maxResults: params.maxResults || 10,
    order: params.order || 'relevance',
    ...(pageToken && { pageToken }),
  };

  return youtubeApiGet<YouTubeSearchResponse>('/search', searchParams);
}

export async function getVideoDetails(videoId: string) {
  const params = {
    part: 'snippet,contentDetails,statistics',
    id: videoId,
  };

  return youtubeApiGet('/videos', params);
}

export async function getVideosByCategory(category: string, pageToken?: string) {
  return searchVideos({ query: category, maxResults: 10 }, pageToken);
}
