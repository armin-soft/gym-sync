
/**
 * سیستم ثبت سرویس ورکر بهینه شده برای سرعت بارگذاری و تحمل خطا
 */
import { registerServiceWorker } from './service-worker/registration';
import { setupOfflineDetection } from './service-worker/offline'; // Updated import path
import { toast } from '@/hooks/use-toast';

// تابع راه‌اندازی سرویس ورکر که از main.tsx فراخوانی می‌شود
export function initializeServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // اگر قبلا راه‌اندازی شده، عملیات را انجام نده
  if (window.__serviceWorkerInitialized) {
    return Promise.resolve(null);
  }
  
  window.__serviceWorkerInitialized = true;
  
  // راه‌اندازی سیستم نوتیفیکیشن
  if (typeof window !== 'undefined' && !window.showToast) {
    window.showToast = toast;
  }
  
  // بررسی پشتیبانی از سرویس ورکر
  if (!('serviceWorker' in navigator)) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return Promise.resolve(null);
  }
  
  return new Promise(async (resolve) => {
    try {
      // تلاش با فواصل زمانی مختلف برای ثبت سرویس ورکر
      const maxRetries = 3;
      let registration = null;
      
      for (let i = 0; i < maxRetries; i++) {
        try {
          registration = await registerServiceWorker();
          if (registration) break;
          
          // تأخیر بین تلاش‌ها با افزایش زمان
          if (i < maxRetries - 1) {
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
            console.log(`تلاش مجدد برای ثبت سرویس ورکر (${i+2}/${maxRetries})...`);
          }
        } catch (retryError) {
          console.warn(`خطا در تلاش ${i+1}:`, retryError);
        }
      }
      
      setupOfflineDetection(); // This function is now imported from offline.ts
      resolve(registration);
    } catch (error) {
      console.error('خطا در راه‌اندازی سرویس ورکر:', error);
      // خطاها را فرو بخور تا برنامه اصلی ادامه یابد
      resolve(null);
    }
  });
}

// بروزرسانی خودکار سرویس ورکر در فواصل طولانی‌تر (8 ساعت)
let updateInterval: number | null = null;

export function startServiceWorkerUpdateCheck() {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  
  // بررسی فقط یکبار در هر 8 ساعت برای کاهش بار شبکه
  updateInterval = window.setInterval(() => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.update().catch(() => {
          // خطا را نادیده بگیر
        });
      });
    }
  }, 8 * 60 * 60 * 1000); // 8 ساعت
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
    showToast?: (options: {
      title: string;
      description: string;
      variant?: 'default' | 'success' | 'warning' | 'destructive';
      duration?: number;
      action?: {
        label: string;
        onClick: () => void;
      };
    }) => void;
  }
}
