import { View, StyleSheet } from 'react-native';

interface MinimizedPlayerProps {
  videoId: string;
  onClose: () => void;
  onExpand: () => void;
}

export default function MinimizedPlayer({
  videoId,
  onClose,
  onExpand,
}: MinimizedPlayerProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement minimized player overlay */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: 16,
    width: 150,
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
