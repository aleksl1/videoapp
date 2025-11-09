import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const videoId = Array.isArray(id) ? id[0] : id;
  const videoData = videoId ? mockVideoData[videoId] : null;

  if (!videoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Video not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top }}
    >
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
        <Text style={styles.subtitle}>{videoData.subtitle}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  subtitle: {
    ...fontConfig.md,
    color: COLORS.outline,
  },
  errorText: {
    ...fontConfig.md,
    color: COLORS.outline,
    textAlign: "center",
  },
});
