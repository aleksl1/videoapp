import { View, FlatList, StyleSheet } from 'react-native';

interface CategoryListProps {
  category: string;
  videos: any[];
}

export default function CategoryList({ category, videos }: CategoryListProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement horizontal scrolling video list */}
      <FlatList
        horizontal
        data={videos}
        renderItem={() => null}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
