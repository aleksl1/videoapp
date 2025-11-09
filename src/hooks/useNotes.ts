// Custom hook for notes CRUD operations
// TODO: Load notes for current video (synchronous with MMKV)
// TODO: Add/edit/delete operations (instant, no async)
// TODO: Trigger re-renders on note changes
// TODO: Persist to MMKV storage

export function useNotes(videoId: string) {
  // TODO: Implement notes management hook
  return {
    notes: [],
    addNote: (timestamp: number, content: string) => {},
    updateNote: (noteId: string, content: string) => {},
    deleteNote: (noteId: string) => {},
  };
}
