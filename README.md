# Video App

React Native video application built with Expo for displaying YouTube content.

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/aleksl1/videoapp.git
```

2. **Navigate to the project directory**

```bash
cd videoapp
```

3. **Install dependencies**

```bash
npm install
```

4. **Create environment file**

```bash
touch .env
```

5. **Add YouTube API key**

Copy API key to `.env` as shown in `.env.example`

6. **Prebuild the app**

```bash
npx expo prebuild
```

7. **Run the app**

```bash
npm run ios
```

or

```bash
npm run android
```

## Tech Stack

- React Native 0.81.5 with Expo ~54.0
- TypeScript
- Expo Router (file-based routing in `app/` directory)
- react-native-video
- YouTube Data API v3
