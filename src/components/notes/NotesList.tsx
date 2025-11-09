import { View, FlatList, StyleSheet } from 'react-native';

interface NotesListProps {
  notes: any[];
  onNotePress: (timestamp: number) => void;
  onNoteDelete: (noteId: string) => void;
}

export default function NotesList({ notes, onNotePress, onNoteDelete }: NotesListProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement notes list with swipe to delete */}
      <FlatList
        data={notes}
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
