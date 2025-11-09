import { View, FlatList, StyleSheet } from 'react-native';

interface SearchResultsProps {
  results: any[];
  onVideoPress: (videoId: string) => void;
}

export default function SearchResults({ results, onVideoPress }: SearchResultsProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement search results list */}
      <FlatList
        data={results}
        renderItem={() => null}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
