// Utility functions for formatting data
// TODO: Date, number formatters

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatNumber(num: number | string, suffix: string = ''): string {
  const count = typeof num === 'string' ? parseInt(num, 10) : num;
  
  if (isNaN(count)) return `0${suffix}`;
  
  if (count >= 1000000000) {
    return `${(count / 1000000000).toFixed(1)}B${suffix}`;
  }
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M${suffix}`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K${suffix}`;
  }
  return `${count}${suffix}`;
}

export function formatViewCount(count: number): string {
  return formatNumber(count, ' views');
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}
