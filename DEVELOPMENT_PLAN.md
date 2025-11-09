# Development Plan: React Native Video Application

Based on the requirements, here's a comprehensive development plan:

## 📁 Phase 1: Project Structure (Current Focus)

### Proposed Directory Structure

```
videoapp/
├── app/                          # Expo Router file-based routing
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab navigator layout
│   │   ├── index.tsx            # Home/Main screen
│   │   └── search.tsx           # Search screen
│   ├── video/                    # Video detail screens
│   │   └── [id].tsx             # Dynamic video detail route
│   ├── settings.tsx             # Settings screen (notifications)
│   └── _layout.tsx              # Root layout
│
├── src/
│   ├── components/              # Reusable components
│   │   ├── video/
│   │   │   ├── VideoPlayer.tsx         # Main video player component
│   │   │   ├── VideoControls.tsx       # Player controls
│   │   │   ├── MinimizedPlayer.tsx     # Picture-in-picture player
│   │   │   └── FullscreenPlayer.tsx    # Fullscreen mode
│   │   ├── category/
│   │   │   ├── CategoryList.tsx        # Horizontal scrolling list
│   │   │   ├── CategoryCard.tsx        # Video card component
│   │   │   └── ShowMoreButton.tsx      # Category show more button
│   │   ├── search/
│   │   │   ├── SearchBar.tsx           # Search input component
│   │   │   └── SearchResults.tsx       # Search results list
│   │   ├── notes/
│   │   │   ├── NotesList.tsx           # Notes display
│   │   │   ├── NoteItem.tsx            # Individual note
│   │   │   └── NoteEditor.tsx          # Add/edit note form
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── services/                # External service integrations
│   │   ├── youtube/
│   │   │   ├── api.ts                  # YouTube API client
│   │   │   ├── types.ts                # YouTube API types
│   │   │   └── queries.ts              # API query functions
│   │   ├── notifications/
│   │   │   ├── scheduler.ts            # Notification scheduling
│   │   │   └── permissions.ts          # Notification permissions
│   │   └── storage/
│   │       ├── notes.ts                # Notes persistence
│   │       └── settings.ts             # Settings persistence
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useYouTubeVideos.ts         # Fetch YouTube videos
│   │   ├── useVideoPlayer.ts           # Video player state
│   │   ├── useNotes.ts                 # Notes CRUD operations
│   │   └── useNotifications.ts         # Notification management
│   │
│   ├── context/                 # React Context providers
│   │   └── VideoPlayerContext.tsx      # Minimized player state
│   │
│   ├── constants/               # App constants
│   │   ├── categories.ts               # Video categories config
│   │   └── theme.ts                    # Theme/styling constants
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── video.ts
│   │   ├── note.ts
│   │   └── navigation.ts
│   │
│   └── utils/                   # Utility functions
│       ├── formatters.ts               # Date, number formatters
│       └── validators.ts               # Input validation
│
├── assets/                      # Static assets (existing)
├── __tests__/                   # Test files
│   ├── components/
│   ├── services/
│   └── hooks/
│
└── config/                      # Configuration files
    └── env.ts                   # Environment variables

```

## 🏗️ Phase 2: Core Infrastructure

### 2.1 YouTube API Integration

**File**: `src/services/youtube/api.ts`

```typescript
// Core functionality:
- API client configuration
- Rate limiting & error handling
- Request/response interceptors
- Environment variable management (API_KEY)
```

**Key endpoints to implement:**

- `search.list` - Search videos by query
- `videos.list` - Get video details
- Category-based searches for "React Native", "React", "TypeScript", "JavaScript"

### 2.2 Type Definitions

**Files**: `src/types/*.ts`

```typescript
// Define interfaces for:
- Video (YouTube API response)
- Note (user notes)
- AppSettings (notification preferences)
- Navigation params
```

### 2.3 Storage Layer

**Files**: `src/services/storage/*.ts`

```typescript
// Implement using react-native-mmkv:
- MMKV wrapper for notes (synchronous, fast)
- Settings persistence (notification time, enabled/disabled)
- Data migration utilities
- Type-safe storage access
```

---

## 🎨 Phase 3: Main Screen Implementation

### 3.1 Home Screen Layout

**File**: `app/(tabs)/index.tsx`

- Search bar component (tap → navigate to search screen)
- 4 horizontal scrolling lists (FlatList with horizontal prop)
- Each category: "React Native", "React", "TypeScript", "JavaScript"
- "Show more" buttons for each category

### 3.2 Category Lists Component

**File**: `src/components/category/CategoryList.tsx`

```typescript
// Features:
- Horizontal FlatList
- Video thumbnails from YouTube API
- Video title, duration, view count
- Tap video → navigate to detail screen
- "Show more" button → navigate to search with pre-filled category
```

### 3.3 Data Fetching

**Hook**: `src/hooks/useYouTubeVideos.ts`

```typescript
// Using @tanstack/react-query:
- Fetch videos for each category on mount
- Cache results for 30 minutes
- Handle loading/error states
- Pagination support for "Show more"
```

---

## 🔍 Phase 4: Search Implementation

### 4.1 Search Screen

**File**: `app/(tabs)/search.tsx`

```typescript
// Features:
- Search input with debounce (500ms)
- Search results grid/list
- Empty state when no results
- Loading skeleton during search
- Pull-to-refresh
- Infinite scroll for pagination
```

### 4.2 Search Logic

**File**: `src/services/youtube/queries.ts`

```typescript
// Implement:
- searchVideos(query: string, pageToken?: string)
- Debounced search to avoid excessive API calls
- Result caching with react-query
```

---

## 📺 Phase 5: Video Detail Screen

### 5.1 Detail Screen Layout

**File**: `app/video/[id].tsx`

```typescript
// Layout structure:
- Video player (top section)
- Tab navigation: [Overview, Notes]
- Overview tab: title, description, stats, channel info
- Notes tab: notes list + add note form
```

### 5.2 Video Player

**File**: `src/components/video/VideoPlayer.tsx`

```typescript
// Using react-native-video:
- Fullscreen mode (orientation lock)
- Minimized mode (picture-in-picture overlay)
- Custom controls (play/pause, seek, volume, fullscreen)
- Progress bar with current time / duration
- Playback state persistence
```

**Implementation notes:**

- Use `react-native-video` library as required
- Fallback to local video (`assets/video/broadchurch.mp4`) if API video unavailable
- Handle fullscreen with `StatusBar` and orientation changes
- Minimized player: floating overlay that persists across navigation

### 5.3 Player Controls

**File**: `src/components/video/VideoControls.tsx`

```typescript
// Controls include:
- Play/Pause button (assets/icons/play-icon.svg, pause-icon.svg)
- Seek backward/forward (backward-icon.svg, forward-icon.svg)
- Volume control (volume-icon.svg)
- Fullscreen toggle (fullscreen-icon.svg)
- Progress slider
```

---

## 📝 Phase 6: Notes Feature

### 6.1 Notes Storage

**File**: `src/services/storage/notes.ts`

```typescript
// MMKV storage schema (synchronous):
{
  "notes": {
    "[videoId]": [
      {
        id: string,
        videoId: string,
        timestamp: number,  // video timestamp when note was taken
        content: string,
        createdAt: number
      }
    ]
  }
}

// CRUD operations (all synchronous):
- createNote(videoId, timestamp, content)
- getNotesByVideoId(videoId)
- updateNote(noteId, content)
- deleteNote(noteId)
```

### 6.2 Notes UI

**Files**: `src/components/notes/*`

```typescript
// NotesList.tsx:
- Display notes sorted by timestamp
- Tap note → seek video to that timestamp
- Swipe to delete

// NoteEditor.tsx:
- Text input for note content
- Save button
- Capture current video timestamp
- Cancel/dismiss functionality
```

### 6.3 Notes Hook

**File**: `src/hooks/useNotes.ts`

```typescript
// Custom hook:
- Load notes for current video (synchronous with MMKV)
- Add/edit/delete operations (instant, no async)
- Trigger re-renders on note changes
- Persist to MMKV storage
```

---

## 🔔 Phase 7: Push Notifications

### 7.1 Notification Setup

**File**: `src/services/notifications/scheduler.ts`

```typescript
// Using expo-notifications:
- Request permissions on first launch
- Schedule daily notification at user-specified time
- Cancel/reschedule on time change
- Handle notification tap (deep link to app)
```

### 7.2 Settings Screen

**File**: `app/settings.tsx`

```typescript
// Settings UI:
- Toggle: Enable/disable daily notifications
- Time picker: Select notification time
- Notification preview
- Save settings to MMKV storage (synchronous)
```

### 7.3 Notification Content

```typescript
// Daily notification:
{
  title: "📹 Time to learn!",
  body: "Discover new React Native tutorials today",
  data: { screen: "home" }  // Deep link data
}
```

### 7.4 Permissions Handler

**File**: `src/services/notifications/permissions.ts`

```typescript
// Handle:
- Request notification permissions
- Check current permission status
- Guide user to settings if denied
```

---

## 🧪 Phase 8: Testing Strategy

### 8.1 Unit Tests

**Directory**: `__tests__/`

**Test Coverage:**

```typescript
// Services
- YouTube API client (mocked responses)
- Storage operations (MMKV mocks)
- Notification scheduler

// Hooks
- useYouTubeVideos (react-query behavior)
- useNotes (CRUD operations with MMKV)
- useVideoPlayer (state management)

// Utilities
- Formatters (date, duration, view count)
- Validators (input validation)
```

### 8.2 Component Tests

```typescript
// Using @testing-library/react-native:

// CategoryList.tsx
- Renders video cards correctly
- Horizontal scroll works
- "Show more" navigation

// SearchBar.tsx
- Input changes trigger search
- Debouncing works (500ms)
- Navigation on submit

// VideoPlayer.tsx
- Play/pause toggles
- Fullscreen mode activates
- Controls show/hide on tap

// NoteEditor.tsx
- Note creation works
- Timestamp captured correctly
- Input validation
```

### 8.3 Integration Tests

```typescript
// End-to-end flows:
- Main screen → Search → Video detail
- Video detail → Add note → Verify persistence
- Settings → Enable notifications → Verify scheduling
- Video player → Minimize → Navigate → Player persists
```

### 8.4 Test Commands

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

---

## 🎯 Phase 9: Polish & Documentation

### 9.1 UI/UX Polish

- Loading states for all async operations
- Error boundaries for graceful error handling
- Accessibility labels (VoiceOver/TalkBack)
- Haptic feedback on interactions
- Smooth animations (react-native-reanimated)
- Dark mode support (existing theme configuration)

### 9.2 Performance Optimization

- Image lazy loading with `expo-image`
- List optimization (FlatList `getItemLayout`, `removeClippedSubviews`)
- Memoization of expensive components (React.memo)
- Video player resource cleanup

### 9.3 Documentation

- Update README.md with setup instructions
- Document YouTube API key configuration
- Document MMKV storage structure and usage
- Add inline code comments for complex logic
- Create API documentation for services
- Add troubleshooting guide

### 9.4 Environment Setup

**File**: `config/env.ts`

```typescript
// Environment variables:
YOUTUBE_API_KEY = your_api_key_here;

// Create .env.example for developers
```

---

## 📋 Implementation Order Summary

1. ✅ **Project Structure** (Current)
2. **Core Infrastructure** (API client, types, storage)
3. **Main Screen** (home layout, category lists)
4. **Search** (search screen, debounced search)
5. **Video Detail** (player, controls, fullscreen/minimized modes)
6. **Notes** (notes UI, persistence, timestamp linking)
7. **Notifications** (scheduling, settings, permissions)
8. **Testing** (unit, component, integration tests)
9. **Polish** (UI/UX, performance, documentation)

---

## 🚀 Next Steps

**Immediate actions:**

1. Install required dependencies
2. Create folder structure
3. Set up YouTube API credentials
4. Implement type definitions
5. Build API client with error handling

**Key Technical Decisions:**

- **State Management**: React Query for server state + React Context/local state for client state
- **Storage**: MMKV for fast, synchronous storage (notes and settings)
- **Navigation**: Expo Router (file-based routing)
- **Styling**: StyleSheet with theme constants (could add styled-components if preferred)
- **Testing**: Jest + React Native Testing Library

---

## 📌 Requirements Checklist

### Main Screen

- [ ] Four horizontal scrolling category lists (React Native, React, TypeScript, JavaScript)
- [ ] Search bar that redirects to search screen
- [ ] "Show more" buttons for each category
- [ ] Functional search engine for videos by phrase

### Video Detail Screen

- [ ] Video player using react-native-video
- [ ] Minimized player mode
- [ ] Fullscreen player mode
- [ ] Content from YouTube API
- [ ] Fallback to local video file (assets/video/broadchurch.mp4)

### Notes Feature

- [ ] Notes tab on video detail screen
- [ ] List of notes for current video
- [ ] Add/edit/delete notes functionality
- [ ] Persistent storage (AsyncStorage)
- [ ] Notes linked to video timestamps

### Notifications

- [ ] Daily push notification at configurable time
- [ ] Enable/disable toggle in settings
- [ ] Time picker for notification scheduling
- [ ] Custom notification content

### Technical Requirements

- [ ] YouTube Data API v3 integration
- [ ] Code quality and maintainability
- [ ] Proper project structure
- [ ] Comprehensive documentation
- [ ] Testing coverage
