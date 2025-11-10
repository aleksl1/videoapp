# YouTube API Integration Setup

This guide explains how to set up and use the YouTube Data API v3 integration with React Query infinite scrolling.

## 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**
4. Create credentials (API Key)
5. Copy your API key

## 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Add your YouTube API key to `.env`:
   ```
   YOUTUBE_API_KEY=your_actual_api_key_here
   ```

3. The API key will be automatically loaded through `app.config.ts` and made available via `expo-constants`

## 3. Usage

### Basic Usage

```typescript
import { useYouTubeSearch } from '@/src/hooks';

function MyComponent() {
  const { data, fetchNextPage, hasNextPage, isLoading } = useYouTubeSearch({
    query: 'React Native',
    maxResults: 10,
    order: 'relevance',
  });

  // Access videos from all pages
  const videos = data?.pages.flatMap(page => page.items) ?? [];

  // Load more videos
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <FlatList
      data={videos}
      onEndReached={loadMore}
      // ... other props
    />
  );
}
```

### Hook Options

```typescript
interface UseYouTubeSearchOptions {
  query: string;              // Search query
  maxResults?: number;        // Results per page (default: 10)
  type?: 'video' | 'channel' | 'playlist'; // Result type (default: 'video')
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
  enabled?: boolean;          // Enable/disable query (default: true)
}
```

### Return Values

The hook returns all standard `useInfiniteQuery` values:

- `data` - Paginated response data
- `fetchNextPage()` - Function to load next page
- `hasNextPage` - Boolean indicating if more pages exist
- `isFetchingNextPage` - Boolean for next page loading state
- `isLoading` - Boolean for initial loading state
- `isError` - Boolean for error state
- `error` - Error object if request failed

### Complete Example

See `src/hooks/useYouTubeSearch.example.tsx` for a complete working example with:
- Infinite scrolling
- Loading states
- Error handling
- Video list rendering

## 4. Type Definitions

All YouTube API types are defined in `src/types/youtube.ts`:

- `YouTubeSearchParams` - Search parameters
- `YouTubeSearchResponse` - API response structure
- `YouTubeSearchItem` - Individual video item
- `YouTubeVideoSnippet` - Video metadata
- `YouTubeThumbnails` - Thumbnail URLs

## 5. API Quotas

Be aware of YouTube API quota limits:
- Each search costs **100 units**
- Default quota: **10,000 units/day**
- Monitor usage in Google Cloud Console

## 6. Caching

The hook includes built-in caching:
- `staleTime`: 5 minutes (data considered fresh)
- `gcTime`: 30 minutes (data kept in cache)

This reduces API calls and improves performance.

## 7. Error Handling

The API client includes automatic error handling for:
- **403 errors** - Quota exceeded or invalid API key
- **400 errors** - Invalid request parameters

Check console logs for detailed error messages.

## Troubleshooting

### "API key not valid" error
- Verify your API key in `.env` is correct
- Ensure YouTube Data API v3 is enabled in Google Cloud Console
- Restart your development server after changing `.env`

### No results returned
- Check your search query
- Verify API key has proper permissions
- Check quota limits in Google Cloud Console

### TypeScript errors
- Ensure all types are imported from `@/src/types/youtube`
- Run `npx expo start --clear` to clear cache
