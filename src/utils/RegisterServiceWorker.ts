/**
 * Main service worker registration entry point
 */
import { registerServiceWorker, setupOfflineDetection } from './service-worker/registration';

// Initialize service worker function that will be called from main.tsx
export function initializeServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  return new Promise(async (resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
      console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
      resolve(null);
      return;
    }
    
    try {
      const registration = await registerServiceWorker();
      setupOfflineDetection();
      resolve(registration);
    } catch (error) {
      console.error('خطا در راه‌اندازی سرویس ورکر:', error);
      reject(error);
    }
  });
}

// Initialize service worker when the app starts (also keep as an auto-init option)
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
