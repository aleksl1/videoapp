import { View, StyleSheet } from 'react-native';

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (seconds: number) => void;
  onFullscreen: () => void;
}

export default function VideoControls({
  isPlaying,
  onPlayPause,
  onSeek,
  onFullscreen,
}: VideoControlsProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement video controls */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
