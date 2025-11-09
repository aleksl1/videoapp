import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CategoryCard from "./CategoryCard";
import ShowMoreButton from "./ShowMoreButton";

interface CategoryListProps {
  category: string;
  videos: any[];
}

export default function CategoryList({ category, videos }: CategoryListProps) {
  const handleShowMore = () => {
    // TODO: Navigate to category details
    console.log(`Show more for ${category}`);
  };

  const renderCategoryCard = ({ item }: { item: any }) => (
    <CategoryCard video={item} onPress={() => console.log(`Play ${item.id}`)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{category}</Text>
        <ShowMoreButton category={category} onPress={handleShowMore} />
      </View>
      <FlatList
        horizontal
        data={videos}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        nestedScrollEnabled={true}
      />
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
});
