# Video App

React Native video application built with Expo for displaying YouTube content.

## Quick Start for New Developers

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add YouTube API key**

   Create a `.env` file in the project root:
   ```
   YOUTUBE_API_KEY=your_api_key_here
   ```

   **Two options:**
   - Use the API key provided in your onboarding email, OR
   - [Set up your own key](https://developers.google.com/youtube/v3/getting-started) at Google Cloud Console

3. **Run the app**
   ```bash
   npx expo start
   ```
   Then press `a` for Android or `i` for iOS to build and run on emulator/simulator

## Tech Stack

- React Native 0.81.5 with Expo ~54.0
- TypeScript
- Expo Router (file-based routing in `app/` directory)
- react-native-video
- YouTube Data API v3
