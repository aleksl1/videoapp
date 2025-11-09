// Environment variables configuration
// TODO: Add proper environment variable handling

export const ENV = {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
  // Add other environment variables here
} as const;

// Validation function to ensure required env vars are set
export function validateEnv() {
  const missingVars: string[] = [];

  if (!ENV.YOUTUBE_API_KEY) {
    missingVars.push('YOUTUBE_API_KEY');
  }

  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
  }

  return missingVars.length === 0;
}
