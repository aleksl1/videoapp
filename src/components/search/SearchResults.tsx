import { View, FlatList, StyleSheet } from 'react-native';
import type { VideoCardData } from '@/src/utils/youtube';

interface SearchResultsProps {
  results: VideoCardData[];
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
