import axios from "axios";
import Constants from "expo-constants";

export const YOUTUBE_API_KEY = Constants.expoConfig?.extra?.youtubeApiKey || "";
export const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

const axiosInstance = axios.create({
  baseURL: YOUTUBE_API_BASE_URL,
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        alert("YouTube API quota exceeded or invalid API key"); //todo: better error handling
        console.error("YouTube API quota exceeded or invalid API key");
      } else if (status === 400) {
        console.error("Invalid YouTube API request");
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Functional API client for YouTube Data API v3
 */
export async function youtubeApiGet<T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  // Merge API key with other params
  const requestParams = {
    ...params,
    key: YOUTUBE_API_KEY,
  };

  const response = await axiosInstance.get<T>(endpoint, {
    params: requestParams,
  });

  return response.data;
}
