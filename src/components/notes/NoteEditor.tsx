import { View, TextInput, StyleSheet } from 'react-native';

interface NoteEditorProps {
  content: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function NoteEditor({
  content,
  onChangeText,
  onSave,
  onCancel,
}: NoteEditorProps) {
  return (
    <View style={styles.container}>
      {/* TODO: Implement note editor with save/cancel */}
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={onChangeText}
        placeholder="Add a note..."
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
  },
});
