
/**
 * سیستم ثبت سرویس ورکر بهینه شده
 */
import { registerServiceWorker, setupOfflineDetection } from './service-worker/registration';

// تابع راه‌اندازی سرویس ورکر که از main.tsx فراخوانی می‌شود
export function initializeServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // اگر قبلا راه‌اندازی شده، عملیات را انجام نده
  if (window.__serviceWorkerInitialized) {
    return Promise.resolve(null);
  }
  
  window.__serviceWorkerInitialized = true;
  
  // بررسی پشتیبانی از سرویس ورکر
  if (!('serviceWorker' in navigator)) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return Promise.resolve(null);
  }
  
  return new Promise(async (resolve, reject) => {
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

// بروزرسانی خودکار سرویس ورکر در فواصل طولانی‌تر (4 ساعت)
let updateInterval: number | null = null;

export function startServiceWorkerUpdateCheck() {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  
  // بررسی فقط یکبار در هر 4 ساعت برای کاهش بار شبکه
  updateInterval = window.setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.update().catch(() => {
          // خطا را نادیده بگیر
        });
      });
    }
  }, 4 * 60 * 60 * 1000); // 4 ساعت
}

// امکان توقف بررسی بروزرسانی
export function stopServiceWorkerUpdateCheck() {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

// تعریف متغیر سراسری
declare global {
  interface Window {
    __serviceWorkerInitialized?: boolean;
  }
}
