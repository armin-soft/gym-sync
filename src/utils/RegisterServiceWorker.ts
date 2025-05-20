
/**
 * Main service worker registration entry point
 */
import { registerServiceWorker, setupOfflineDetection } from './service-worker/registration';

// Initialize service worker when the app starts
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await registerServiceWorker();
      
      // Set up offline detection
      setupOfflineDetection();
    } catch (error) {
      console.error('خطا در راه‌اندازی سرویس ورکر:', error);
    }
  });
}

// Auto check for updates every 30 minutes
setInterval(() => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update().catch(err => {
        console.error('خطا در بروزرسانی سرویس ورکر:', err);
      });
    });
  }
}, 30 * 60 * 1000);
