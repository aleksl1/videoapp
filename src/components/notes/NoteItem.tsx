import { View, Text, StyleSheet } from 'react-native';
import type { Note } from '@/src/types/note';

interface NoteItemProps {
  note: Note;
  onPress: () => void;
}

export default function NoteItem({ note, onPress }: NoteItemProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement note item display */}
      <Text>Note Item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
