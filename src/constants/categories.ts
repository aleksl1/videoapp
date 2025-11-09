// Video categories configuration
export const VIDEO_CATEGORIES = [
  'React Native',
  'React',
  'TypeScript',
  'JavaScript',
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];
