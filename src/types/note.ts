// Note type definitions
export interface Note {
  id: string;
  videoId: string;
  timestamp: number; // video timestamp in seconds
  content: string;
  createdAt: number; // Unix timestamp
  updatedAt?: number; // Unix timestamp
}

export interface CreateNoteParams {
  videoId: string;
  timestamp: number;
  content: string;
}

export interface UpdateNoteParams {
  noteId: string;
  content: string;
}
