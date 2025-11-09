import { View, Text, StyleSheet } from 'react-native';

interface NoteItemProps {
  note: any;
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
