// Settings persistence service using MMKV
// TODO: Implement MMKV wrapper for settings
// TODO: Settings persistence (notification time, enabled/disabled)
// TODO: Type-safe storage access

export interface AppSettings {
  notificationsEnabled: boolean;
  notificationTime: string; // ISO time string
}

export function getSettings(): AppSettings {
  // TODO: Implement settings retrieval
  return {
    notificationsEnabled: false,
    notificationTime: '09:00',
  };
}

export function saveSettings(settings: AppSettings): void {
  // TODO: Implement settings persistence
}
