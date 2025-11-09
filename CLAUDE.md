# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native video application built with Expo, designed to display YouTube content with custom features including video playback, notes, and push notifications.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start
# or for specific platforms
npm run android
npm run ios
npm run web

# Lint code
npm run lint

# Reset project (moves starter code to app-example/)
npm run reset-project
```

## Tech Stack

- **Framework**: React Native 0.81.5 with Expo ~54.0
- **Navigation**: Expo Router 6.0 (file-based routing)
- **Language**: TypeScript with strict mode
- **React**: 19.1.0
- **Video Player**: react-native-video (as specified in requirements)
- **External API**: YouTube Data API v3

## Project Structure

- **app/**: File-based routing directory (Expo Router)
  - `_layout.tsx`: Root layout component
  - `index.tsx`: Home screen entry point
- **assets/**: Static resources
  - `video/broadchurch.mp4`: Sample video file for testing
  - `icons/`: SVG icons for UI elements (player controls, navigation, etc.)
  - `images/`: App icons and branding
- **src/**: Application source code (currently empty, planned for future components/utilities)

## Architecture Notes

### Routing

Uses Expo Router (file-based routing) with typed routes enabled (`experiments.typedRoutes: true`). Routes are defined by file structure in the `app/` directory.

### Path Aliases

TypeScript configured with `@/*` alias pointing to project root for clean imports.

## Requirements Implementation

**Main Screen Features:**

- Four horizontal scrolling lists: "React Native", "React", "TypeScript", "JavaScript"
- "Show more" button per category → redirects to search screen
- Search bar → redirects to search screen
- Search functionality for videos by phrase

**Detail Screen Features:**

- Video player (react-native-video) with minimized and fullscreen modes
- Video source: API-based OR local file (`assets/video/broadchurch.mp4`)
- "Notes" tab for video-specific notes with persistent storage

**Notifications:**

- Daily push notifications at user-configured time
- Toggle on/off capability
- Time modification setting

## YouTube Data API Integration

**API Documentation:**

- Reference: https://developers.google.com/youtube/v3/docs
- Console: https://console.cloud.google.com/welcome
- Auth credentials: https://developers.google.com/youtube/registering_an_application

**Implementation Notes:**

- API key required for YouTube Data API v3
- Search endpoint: `/search` for video queries
- Videos endpoint: `/videos` for detailed video information
- Store API key securely (use environment variables, not committed to git)

## Code Quality Expectations

- Maintain clean project structure and organization
- Follow React Native and TypeScript best practices
- Ensure proper ESLint configuration compliance
- Document complex logic and API integrations
- Handle errors gracefully with user-friendly messages
