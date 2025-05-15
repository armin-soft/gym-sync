
/**
 * Helper functions for service worker registration
 */

import { ToastOptions } from './types';
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
 * Show notification about available updates
 */
export function showUpdateNotification(): void {
  const version = manifestData.version || '1.8.0';
  
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
}
