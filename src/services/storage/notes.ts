// Notes persistence service using MMKV
// TODO: Implement MMKV wrapper for notes (synchronous, fast)
// TODO: CRUD operations for notes
// TODO: Type-safe storage access

export interface Note {
  id: string;
  videoId: string;
  timestamp: number; // video timestamp when note was taken
  content: string;
  createdAt: number;
}

export function createNote(videoId: string, timestamp: number, content: string): Note {
  // TODO: Implement note creation
  return {
    id: '',
    videoId,
    timestamp,
    content,
    createdAt: Date.now(),
  };
}

export function getNotesByVideoId(videoId: string): Note[] {
  // TODO: Implement notes retrieval
  return [];
}

export function updateNote(noteId: string, content: string): void {
  // TODO: Implement note update
}

export function deleteNote(noteId: string): void {
  // TODO: Implement note deletion
}
