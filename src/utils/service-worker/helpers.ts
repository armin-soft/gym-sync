
/**
 * Helper functions for service worker registration
 */

import { ToastOptions, ToastVariant } from './types';
import manifestData from '@/Manifest.json';

/**
 * Check if service workers are supported in current browser
 */
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'ServiceWorkerRegistration' in window;
};

/**
 * Function to show toast notifications if available
 */
export const showToast = (options: ToastOptions): void => {
  if (typeof window.showToast === 'function') {
    window.showToast(options);
  } else {
    console.log(`${options.title}: ${options.description}`);
    
    // Fallback to alert for critical messages
    if (options.variant === 'destructive') {
      alert(`${options.title}: ${options.description}`);
    }
  }
};

/**
 * Get current app version from manifest
 */
export const getAppVersion = (): string => {
  return manifestData.version || '1.0.0';
};

/**
 * Show notification about available updates
 */
export function showUpdateNotification(): void {
  const version = getAppVersion();
  const currentVersion = localStorage.getItem('app_version') || version;
  
  // Check if the update notification has been shown recently
  const lastNotificationTime = parseInt(localStorage.getItem('update_notification_time') || '0');
  const currentTime = new Date().getTime();
  
  // Only show notification if 1 hour has passed since the last one
  if (currentTime - lastNotificationTime > 60 * 60 * 1000) {
    showToast({
      title: 'بروزرسانی جدید',
      description: `نسخه ${version} برنامه در دسترس است. برای اعمال تغییرات، صفحه را بروزرسانی کنید.`,
      variant: "warning",
      duration: 10000,
      action: {
        label: 'بروزرسانی',
        onClick: () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SKIP_WAITING'
            });
          }
        }
      }
    });
    
    // Update the last notification time
    localStorage.setItem('update_notification_time', currentTime.toString());
  }
}
