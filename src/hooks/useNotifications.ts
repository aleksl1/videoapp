import { useState, useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { notificationStorage } from '../utils/storage';

// Configure notification behavior when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface NotificationSettings {
  isEnabled: boolean;
  notificationTime: string;
}

export interface UseNotificationsReturn {
  isEnabled: boolean;
  notificationTime: string;
  permissionStatus: Notifications.PermissionStatus | null;
  requestPermissions: () => Promise<boolean>;
  scheduleNotification: (time: string) => Promise<boolean>;
  cancelNotification: () => Promise<void>;
  updateSettings: (settings: Partial<NotificationSettings>) => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [notificationTime, setNotificationTime] = useState<string>('09:00');
  const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus | null>(null);

  // Load initial settings from storage
  useEffect(() => {
    const loadSettings = () => {
      const enabled = notificationStorage.getIsEnabled();
      const time = notificationStorage.getNotificationTime();
      setIsEnabled(enabled);
      setNotificationTime(time);
    };

    loadSettings();
    checkPermissions();
  }, []);

  // Check current notification permissions
  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
    return status;
  };

  // Request notification permissions from the user
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('daily-reminders', {
          name: 'Daily Reminders',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#E6F4FE',
        });
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setPermissionStatus(finalStatus);
      return finalStatus === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }, []);

  // Cancel all scheduled notifications
  const cancelNotification = useCallback(async (): Promise<void> => {
    try {
      const notificationId = notificationStorage.getNotificationId();

      if (notificationId) {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
        notificationStorage.clearNotificationId();
      }

      // Also cancel all scheduled notifications as a fallback
      await Notifications.cancelAllScheduledNotificationsAsync();

      notificationStorage.setIsEnabled(false);
      setIsEnabled(false);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }, []);

  // Schedule a daily notification at the specified time
  const scheduleNotification = useCallback(async (time: string): Promise<boolean> => {
    try {
      // Cancel existing notification first
      await cancelNotification();

      // Parse time string (format: "HH:MM")
      const [hours, minutes] = time.split(':').map(Number);

      // Calculate trigger date
      const now = new Date();
      const triggerDate = new Date();
      triggerDate.setHours(hours, minutes, 0, 0);

      // If the time has already passed today, schedule for tomorrow
      if (triggerDate <= now) {
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      // Schedule the notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '📺 Video App Reminder',
          body: 'Check out today\'s video recommendations!',
          data: { type: 'daily-reminder' },
          sound: true,
        },
        trigger: {
          channelId: Platform.OS === 'android' ? 'daily-reminders' : undefined,
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      });

      // Store the notification ID and settings
      notificationStorage.setNotificationId(notificationId);
      notificationStorage.setNotificationTime(time);
      notificationStorage.setIsEnabled(true);

      setNotificationTime(time);
      setIsEnabled(true);

      return true;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return false;
    }
  }, [cancelNotification]);

  // Update notification settings
  const updateSettings = useCallback(
    async (settings: Partial<NotificationSettings>): Promise<void> => {
      try {
        // Update enabled state
        if (settings.isEnabled !== undefined) {
          if (settings.isEnabled) {
            // Enable notifications - schedule with current or new time
            const timeToUse = settings.notificationTime || notificationTime;
            const permissionGranted = await requestPermissions();

            if (permissionGranted) {
              await scheduleNotification(timeToUse);
            } else {
              throw new Error('Notification permissions not granted');
            }
          } else {
            // Disable notifications
            await cancelNotification();
          }
        }

        // Update time (if notifications are enabled)
        if (settings.notificationTime && isEnabled) {
          await scheduleNotification(settings.notificationTime);
        }
      } catch (error) {
        console.error('Error updating notification settings:', error);
        throw error;
      }
    },
    [isEnabled, notificationTime, requestPermissions, scheduleNotification, cancelNotification]
  );

  return {
    isEnabled,
    notificationTime,
    permissionStatus,
    requestPermissions,
    scheduleNotification,
    cancelNotification,
    updateSettings,
  };
}
