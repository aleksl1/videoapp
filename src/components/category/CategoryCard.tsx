import { View, Text, StyleSheet } from 'react-native';

interface CategoryCardProps {
  video: any;
  onPress: () => void;
}

export default function CategoryCard({ video, onPress }: CategoryCardProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement video card with thumbnail and metadata */}
      <Text>Video Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    marginRight: 12,
  },
});
