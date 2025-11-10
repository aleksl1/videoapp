import ChannelInfo from "@/src/components/common/ChannelInfo";
import Chip from "@/src/components/common/Chip";
import LikesIcon from "@/src/components/icons/LikesIcon";
import PersonIcon from "@/src/components/icons/PersonIcon";
import ViewsIcon from "@/src/components/icons/ViewsIcon";
import VideoControls from "@/src/components/video/VideoControls";
import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import { useLocalSearchParams } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Video, { VideoRef } from "react-native-video";

// Mock video data - in a real app, this would come from an API
const mockVideoData: Record<
  string,
  { title: string; subtitle: string; videoUri: number }
> = {
  "1": {
    title: "React Native Tutorial for Beginners",
    subtitle: "Programming with Mosh",
    videoUri: require("@/assets/video/broadchurch.mp4"),
  },
  "2": {
    title: "Advanced React Patterns",
    subtitle: "Academind",
    videoUri: require("@/assets/video/broadchurch.mp4"),
  },
  "3": {
    title: "TypeScript Best Practices",
    subtitle: "Traversy Media",
    videoUri: require("@/assets/video/broadchurch.mp4"),
  },
  "4": {
    title: "JavaScript ES6 Features",
    subtitle: "freeCodeCamp.org",
    videoUri: require("@/assets/video/broadchurch.mp4"),
  },
  "5": {
    title: "Building Mobile Apps with React Native",
    subtitle: "Net Ninja",
    videoUri: require("@/assets/video/broadchurch.mp4"),
  },
};

// Details Tab Component
const DetailsRoute = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Description</Text>
    <Text style={styles.description}>
      This is a detailed description of the video. In a real application, this
      would contain information about the video content, the instructor,
      learning objectives, and other relevant details.
    </Text>
    <Text style={styles.sectionTitle}>Statistics</Text>
    <View style={styles.statisticsContainer}>
      <Chip
        icon={
          <ViewsIcon
            width={20}
            height={20}
            stroke={COLORS.white}
            strokeWidth={3}
          />
        }
        label="Views"
        value="13123131231"
        backgroundColor={COLORS.primary}
        textColor={COLORS.white}
      />
      <Chip
        icon={
          <LikesIcon
            width={20}
            height={20}
            stroke={COLORS.white}
            strokeWidth={3}
          />
        }
        label="Likes"
        value="32156"
        backgroundColor={COLORS.primary}
        textColor={COLORS.white}
      />
    </View>
  </ScrollView>
);

// Notes Tab Component
const NotesRoute = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>My Notes</Text>
    <Text style={styles.placeholder}>
      No notes yet. Notes functionality will be implemented here.
    </Text>
  </ScrollView>
);

const renderScene = SceneMap({
  details: DetailsRoute,
  notes: NotesRoute,
});

export default function VideoDetailScreen() {
  const { id, title, channelTitle, publishedAt, description } = useLocalSearchParams<{
    id: string;
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    description?: string;
  }>();
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "details", title: "Details" },
    { key: "notes", title: "Notes" },
  ]);

  // Video player state
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // const videoId = Array.isArray(id) ? id[0] : id;
  const videoId = "1";
  const videoData = videoId ? mockVideoData[videoId] : null;

  // Use params if available, fallback to mock data
  const displayTitle = title || videoData?.title;
  const displayChannelTitle = channelTitle || videoData?.subtitle;
  const displayPublishedAt = publishedAt;
  const displayDescription = description;

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor={COLORS.primary}
      inactiveColor={COLORS.primary}
      inactiveTintColor={COLORS.primary}
    />
  );

  // Video control handlers
  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleSeek = (time: number) => {
    videoRef.current?.seek(time);
  };

  const handleSeekStart = () => {
    // Optional: pause video while seeking
  };

  const handleSeekEnd = (time: number) => {
    videoRef.current?.seek(time);
    setCurrentTime(time);
  };

  const handleBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    videoRef.current?.seek(newTime);
  };

  const handleForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    videoRef.current?.seek(newTime);
  };

  const handleFullscreen = async () => {
    const newFullscreenState = !isFullscreen;
    setIsFullscreen(newFullscreenState);

    try {
      if (newFullscreenState) {
        // Enter fullscreen - rotate to landscape
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else {
        // Exit fullscreen - rotate back to portrait
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      }
    } catch (error) {
      console.error("Error changing screen orientation:", error);
    }
  };

  const handleProgress = (data: { currentTime: number }) => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = (data: { duration: number }) => {
    setDuration(data.duration);
  };

  const handleAirplay = () => {
    console.log("Airplay");
  };

  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Video not found</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        isFullscreen ? styles.fullscreenContainer : { paddingTop: insets.top },
      ]}
    >
      {isFullscreen && <StatusBar hidden={true} />}
      <View
        style={[
          styles.headerSection,
          isFullscreen && styles.fullscreenVideoSection,
        ]}
      >
        <View
          style={[
            styles.videoContainer,
            isFullscreen && styles.fullscreenVideoContainer,
          ]}
        >
          <Video
            ref={videoRef}
            source={videoData.videoUri as any}
            style={styles.video}
            paused={paused}
            muted={muted}
            resizeMode="contain"
            onProgress={handleProgress}
            onLoad={handleLoad}
            progressUpdateInterval={250}
          />

          {/* TODO: full screen controls */}
          <VideoControls
            paused={paused}
            muted={muted}
            currentTime={currentTime}
            duration={duration}
            isFullscreen={isFullscreen}
            onPlayPause={handlePlayPause}
            onMute={handleMute}
            onSeek={handleSeek}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
            onBackward={handleBackward}
            onForward={handleForward}
            onFullscreen={handleFullscreen}
            onAirplay={handleAirplay}
          />
        </View>

        {!isFullscreen && (
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {displayTitle}
            </Text>
            <ChannelInfo
              icon={<PersonIcon width={20} height={20} fill={COLORS.white} />}
              channelName={displayChannelTitle || ""}
              style={styles.channelInfo}
            />
          </View>
        )}
      </View>

      {/* TabView Component - Takes up remaining space */}
      {!isFullscreen && (
        <View style={styles.tabViewContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerSection: {
    // flex: 0,
  },
  fullscreenVideoSection: {
    flex: 1,
  },
  tabViewContainer: {
    flex: 1,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.black,
  },
  fullscreenVideoContainer: {
    width: "100%",
    height: "100%",
    aspectRatio: undefined,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: SPACING.md,
    paddingBottom: 0,
  },
  title: {
    ...fontConfig.lg,
    lineHeight: 12,
    color: COLORS.black,
    marginBottom: SPACING.sm,
    paddingTop: SPACING.md,
  },
  errorText: {
    ...fontConfig.md,
    color: COLORS.outline,
    textAlign: "center",
  },
  tabBar: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.md,
  },
  indicator: {
    backgroundColor: COLORS.primary,
    height: 3,
  },
  tabLabel: {
    ...fontConfig.md,
    fontWeight: "600",
    textTransform: "none",
  },
  tabContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  sectionTitle: {
    ...fontConfig.xxs_semi_bold,
    lineHeight: 12,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textAlign: "left",
  },
  description: {
    ...fontConfig.xs,
    lineHeight: 12,
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  placeholder: {
    ...fontConfig.md,
    color: COLORS.outline,
    fontStyle: "italic",
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
    marginTop: SPACING.xs,
  },
  channelInfo: {
    margin: SPACING.md,
  },
});
