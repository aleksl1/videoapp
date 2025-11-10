import ChannelInfo from "@/src/components/common/ChannelInfo";
import Chip from "@/src/components/common/Chip";
import ChannelNameIcon from "@/src/components/icons/ChannelNameIcon";
import LikesIcon from "@/src/components/icons/LikesIcon";
import ViewsIcon from "@/src/components/icons/ViewsIcon";
import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Video from "react-native-video";

// Mock video data - in a real app, this would come from an API
const mockVideoData: Record<
  string,
  { title: string; subtitle: string; videoUri: string }
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
        icon={<ViewsIcon width={24} height={24} stroke={COLORS.white} />}
        label="Views"
        value="13123131231"
        backgroundColor={COLORS.primary}
        textColor={COLORS.white}
      />
      <Chip
        icon={<LikesIcon width={24} height={24} stroke={COLORS.white} />}
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
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "details", title: "Details" },
    { key: "notes", title: "Notes" },
  ]);

  const videoId = Array.isArray(id) ? id[0] : id;
  const videoData = videoId ? mockVideoData[videoId] : null;

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor={COLORS.primary}
      inactiveColor={COLORS.outline}
    />
  );

  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Video not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerSection}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoData.videoUri }}
            style={styles.video}
            controls
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{videoData.title}</Text>
          <ChannelInfo
            icon={
              <ChannelNameIcon width={20} height={20} fill={COLORS.white} />
            }
            channelName={videoData.subtitle}
          />
        </View>
      </View>

      {/* TabView Component - Takes up remaining space */}
      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSection: {
    // flex: 0,
  },
  tabViewContainer: {
    flex: 2,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.black,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: SPACING.xl,
  },
  title: {
    ...fontConfig.md,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  errorText: {
    ...fontConfig.md,
    color: COLORS.outline,
    textAlign: "center",
  },
  tabBar: {
    backgroundColor: COLORS.white,
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
    padding: SPACING.xl,
  },
  sectionTitle: {
    ...fontConfig.xxl,
    color: COLORS.black,
    fontWeight: "600",
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  description: {
    ...fontConfig.md,
    color: COLORS.black,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  placeholder: {
    ...fontConfig.md,
    color: COLORS.outline,
    fontStyle: "italic",
  },
  statisticsContainer: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
});
