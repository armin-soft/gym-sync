
/**
 * Offline detection and notification functionality
 */

import { showToast } from './helpers';

/**
 * Setup offline detection and notification
 */
export const setupOfflineDetection = (): void => {
  window.addEventListener('online', () => {
    console.log('Application is online');
    document.body.classList.remove('offline-mode');
    showToast({
      title: 'اتصال برقرار شد',
      description: 'شما مجدداً به اینترنت متصل شدید.',
      variant: 'success',
      duration: 3000
    });
  });
  
  window.addEventListener('offline', () => {
    console.log('Application is offline');
    document.body.classList.add('offline-mode');
    showToast({
      title: 'حالت آفلاین',
      description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
      variant: 'warning',
      duration: 5000
    });
  });
};
