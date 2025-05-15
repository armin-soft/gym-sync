
// Offline detection module for service worker

// Add offline detection and notification
export function setupOfflineDetection() {
  window.addEventListener('online', () => {
    console.log('Application is online');
    document.body.classList.remove('offline-mode');
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'اتصال برقرار شد',
        description: 'شما مجدداً به اینترنت متصل شدید.',
        variant: 'success',
        duration: 3000
      });
    }
  });
  
  window.addEventListener('offline', () => {
    console.log('Application is offline');
    document.body.classList.add('offline-mode');
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'حالت آفلاین',
        description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
        variant: 'warning',
        duration: 5000
      });
    }
  });
}
