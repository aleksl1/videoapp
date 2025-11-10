import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface CategoryCardProps {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelTitle: string;
    publishedAt: string;
  };
  onPress: () => void;
  variant?: "horizontal" | "vertical"; // horizontal for home carousel, vertical for search list
  style?: ViewStyle;
}

export default function CategoryCard({
  video,
  onPress,
  variant = "horizontal",
  style,
}: CategoryCardProps) {
  const [imageError, setImageError] = React.useState(false);

  const formattedDate = new Date(video.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const isVertical = variant === "vertical";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isVertical ? styles.containerVertical : styles.containerHorizontal,
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          isVertical ? styles.imageVertical : styles.imageHorizontal,
        ]}
      >
        {imageError ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>📹</Text>
          </View>
        ) : (
          <Image
            source={{ uri: video.thumbnailUrl }}
            style={[
              styles.image,
              isVertical ? styles.imageVertical : styles.imageHorizontal,
            ]}
            onError={() => setImageError(true)}
          />
        )}
      </View>
      <View
        style={[
          styles.textContainer,
          isVertical && styles.textContainerVertical,
        ]}
      >
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {video.channelTitle}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  containerHorizontal: {
    width: screenWidth / 2 + 20,
    marginRight: SPACING.md,
  },
  containerVertical: {
    width: "100%",
    flexDirection: "column",
    marginBottom: SPACING.lg,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: COLORS.background,
  },
  image: {
    borderRadius: 8,
  },
  imageHorizontal: {
    width: "100%",
    height: 200,
  },
  imageVertical: {
    width: "100%",
    height: 200,
    marginBottom: SPACING.sm,
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
    padding: SPACING.sm,
  },
  textContainerVertical: {
    padding: 0,
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
