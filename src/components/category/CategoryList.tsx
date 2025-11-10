import { COLORS } from "@/src/constants/theme";
import { useYouTubeSearch } from "@/src/hooks/useYouTubeSearch";
import { transformYouTubeVideos } from "@/src/utils/youtube";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryCard from "./CategoryCard";
import ShowMoreButton from "./ShowMoreButton";

interface CategoryListProps {
  category: string;
}

export default function CategoryList({ category }: CategoryListProps) {
  const { data, isLoading, isError } = useYouTubeSearch({
    query: category,
    maxResults: 10,
    order: "relevance",
  });

  const videos = React.useMemo(() => {
    if (!data?.pages) return [];
    const firstPage = data.pages[0];
    return transformYouTubeVideos(firstPage.items);
  }, [data]);

  const handleShowMore = () => {
    router.push(`/search?category=${category}`);
  };

  const handleVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  const renderCategoryCard = ({ item }: { item: any }) => (
    <CategoryCard video={item} onPress={() => handleVideoPress(item.id)} />
  );

  if (isError) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{category}</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load videos</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{category}</Text>
        <ShowMoreButton category={category} onPress={handleShowMore} />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          horizontal
          data={videos}
          renderItem={renderCategoryCard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          nestedScrollEnabled={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingRight: 16,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});
