
/**
 * راه‌اندازی سرویس ورکر ساده‌شده
 */
import { registerServiceWorker } from './service-worker/registration';
import { setupOfflineDetection } from './service-worker/offline-detection';

export const initializeServiceWorker = async (): Promise<void> => {
  try {
    // ثبت سرویس ورکر برای پشتیبانی آفلاین و بروزرسانی
    await registerServiceWorker();
    
    // راه‌اندازی تشخیص وضعیت آفلاین
    setupOfflineDetection();
    
    console.log('سرویس ورکر با موفقیت راه‌اندازی شد');
  } catch (error) {
    console.error('خطا در راه‌اندازی سرویس ورکر:', error);
  }
};
