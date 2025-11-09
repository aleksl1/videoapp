// Input validation utility functions

export function isValidVideoId(videoId: string): boolean {
  // YouTube video IDs are 11 characters long
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId);
}

export function isValidSearchQuery(query: string): boolean {
  return query.trim().length > 0 && query.trim().length <= 100;
}

export function isValidNoteContent(content: string): boolean {
  return content.trim().length > 0 && content.trim().length <= 1000;
}

export function isValidTime(time: string): boolean {
  // Validates HH:MM format
  return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
}
