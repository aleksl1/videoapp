import CategoryCardVertical from "@/src/components/category/CategoryCardVertical";
import SearchBar from "@/src/components/search/SearchBar";
import { COLORS, SPACING, fontConfig } from "@/src/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mockVideos = [
  {
    id: "1",
    title: "React Native Tutorial for Beginners",
    thumbnailUrl: "https://via.placeholder.com/300x200?text=React+Native",
    channelTitle: "Programming with Mosh",
    publishedAt: "2023-10-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    thumbnailUrl: "https://via.placeholder.com/300x200?text=React",
    channelTitle: "Academind",
    publishedAt: "2023-09-15T00:00:00Z",
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    thumbnailUrl: "https://via.placeholder.com/300x200?text=TypeScript",
    channelTitle: "Traversy Media",
    publishedAt: "2023-11-01T00:00:00Z",
  },
  {
    id: "4",
    title: "JavaScript ES6 Features",
    thumbnailUrl: "https://via.placeholder.com/300x200?text=JavaScript",
    channelTitle: "freeCodeCamp.org",
    publishedAt: "2023-08-20T00:00:00Z",
  },
  {
    id: "5",
    title: "Building Mobile Apps with React Native",
    thumbnailUrl: "https://via.placeholder.com/300x200?text=Mobile+Apps",
    channelTitle: "Net Ninja",
    publishedAt: "2023-10-15T00:00:00Z",
  },
];

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(mockVideos);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setFilteredVideos(mockVideos);
      return;
    }

    const lowerText = text.toLowerCase();
    const filtered = mockVideos.filter(
      (video) =>
        video.title.toLowerCase().includes(lowerText) ||
        video.channelTitle.toLowerCase().includes(lowerText)
    );
    setFilteredVideos(filtered);
  };

  const handleSearchSubmit = () => {
    // Optionally, perform additional search logic here
    handleSearchChange(searchQuery);
  };

  const renderVideoCard = ({ item }: { item: Video }) => (
    <CategoryCardVertical
      video={item}
      onPress={() => {
        router.push(`/video/${item.id}`);
      }}
      style={styles.categoryCard}
    />
  );

  const headerComponent = () => (
    <View
      style={[
        styles.headerWrapper,
        { paddingTop: insets.top, paddingHorizontal: SPACING.xl },
      ]}
    >
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        onSubmit={handleSearchSubmit}
        editable={true}
      />
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {searchQuery
            ? `${filteredVideos.length} results found for ${searchQuery}`
            : "Enter a search term to find videos"}
        </Text>
        <Text style={styles.sortText}>Sort by: Most popular</Text>
      </View>
    </View>
  );

  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No results found for {searchQuery}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredVideos}
        renderItem={renderVideoCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={headerComponent}
        ListEmptyComponent={searchQuery ? emptyComponent : undefined}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    paddingBottom: SPACING.sm,
  },
  resultsHeader: {
    paddingVertical: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultsText: {
    ...fontConfig.md_light_weight,
    color: COLORS.black,
    flex: 1,
  },
  sortText: {
    ...fontConfig.sm,
    color: COLORS.outline,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
    minHeight: 200,
  },
  emptyText: {
    ...fontConfig.md,
    color: COLORS.outline,
    textAlign: "center",
  },
  categoryCard: {
    paddingHorizontal: SPACING.xl,
  },
});
