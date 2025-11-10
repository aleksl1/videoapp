import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface CategoryCardVerticalProps {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelTitle: string;
    publishedAt: string;
  };
  onPress: () => void;
  style?: ViewStyle;
}

export default function CategoryCardVertical({
  video,
  onPress,
  style,
}: CategoryCardVerticalProps) {
  const [imageError, setImageError] = React.useState(false);

  const formattedDate = new Date(video.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={styles.imageContainer}>
        {imageError ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>📹</Text>
          </View>
        ) : (
          <Image
            source={{ uri: video.thumbnailUrl }}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {video.channelTitle}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: COLORS.background,
    marginBottom: SPACING.sm,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 40,
  },
  textContainer: {
    paddingHorizontal: SPACING.sm,
  },
  title: {
    ...fontConfig.md,
    marginBottom: 4,
  },
  subtitle: {
    ...fontConfig.sm,
    color: COLORS.outline,
    marginBottom: 2,
  },
  date: {
    ...fontConfig.sm,
    color: COLORS.outline,
    textAlign: "right",
  },
});
