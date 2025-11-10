import { MMKV } from 'react-native-mmkv';

// Initialize MMKV storage
const storage = new MMKV();

// Storage keys
const STORAGE_KEYS = {
  NOTIFICATION_ENABLED: 'notification_enabled',
  NOTIFICATION_TIME: 'notification_time',
  NOTIFICATION_ID: 'notification_id',
} as const;

export const notificationStorage = {
  getIsEnabled: (): boolean => {
    return storage.getBoolean(STORAGE_KEYS.NOTIFICATION_ENABLED) ?? false;
  },

  setIsEnabled: (enabled: boolean): void => {
    storage.set(STORAGE_KEYS.NOTIFICATION_ENABLED, enabled);
  },

  getNotificationTime: (): string => {
    return storage.getString(STORAGE_KEYS.NOTIFICATION_TIME) ?? '09:00';
  },

  setNotificationTime: (time: string): void => {
    storage.set(STORAGE_KEYS.NOTIFICATION_TIME, time);
  },

  getNotificationId: (): string | undefined => {
    return storage.getString(STORAGE_KEYS.NOTIFICATION_ID);
  },

  setNotificationId: (id: string): void => {
    storage.set(STORAGE_KEYS.NOTIFICATION_ID, id);
  },

  clearNotificationId: (): void => {
    storage.delete(STORAGE_KEYS.NOTIFICATION_ID);
  },
};
