
/**
 * راه‌اندازی سرویس ورکر ساده‌شده
 */
import { registerServiceWorker } from './service-worker/registration';
import { setupOfflineDetection } from './service-worker/offline-detection';

// جلوگیری از راه‌اندازی مجدد
let serviceWorkerInitialized = false;

export const initializeServiceWorker = async (): Promise<void> => {
  if (serviceWorkerInitialized) {
    console.log('سرویس ورکر قبلاً راه‌اندازی شده است');
    return;
  }
  
  try {
    // علامت‌گذاری راه‌اندازی
    serviceWorkerInitialized = true;
    
    // ثبت سرویس ورکر برای پشتیبانی آفلاین و بروزرسانی
    await registerServiceWorker();
    
    // راه‌اندازی تشخیص وضعیت آفلاین
    setupOfflineDetection();
    
    console.log('سرویس ورکر با موفقیت راه‌اندازی شد');
  } catch (error) {
    console.error('خطا در راه‌اندازی سرویس ورکر:', error);
    // بازنشانی علامت در صورت خطا
    serviceWorkerInitialized = false;
  }
};
