import { View, StyleSheet } from 'react-native';

interface FullscreenPlayerProps {
  videoId: string;
  onClose: () => void;
}

export default function FullscreenPlayer({ videoId, onClose }: FullscreenPlayerProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement fullscreen player */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
