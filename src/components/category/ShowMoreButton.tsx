import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ShowMoreButtonProps {
  category: string;
  onPress: () => void;
}

export default function ShowMoreButton({ category, onPress }: ShowMoreButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Show more</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    alignItems: 'center',
  },
  text: {
    color: '#007AFF',
    fontSize: 16,
  },
});
