
/**
 * راه‌اندازی سرویس ورکر بهینه‌شده
 */
import { registerServiceWorker } from './service-worker/registration';
import { setupOfflineDetection } from './service-worker/offline-detection';
import { runWhenIdle } from './service-worker/helpers';

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
    
    // ثبت سرویس ورکر را به زمان خالی مرورگر موکول کنیم تا بارگذاری اولیه سریع‌تر باشد
    runWhenIdle(async () => {
      try {
        // ثبت سرویس ورکر برای پشتیبانی آفلاین و بروزرسانی
        await registerServiceWorker();
        
        // راه‌اندازی تشخیص وضعیت آفلاین
        setupOfflineDetection();
        
        console.log('سرویس ورکر با موفقیت راه‌اندازی شد');
      } catch (error) {
        console.error('خطا در راه‌اندازی سرویس ورکر:', error);
      }
    }, 2000); // تاخیر 2 ثانیه‌ای برای اجازه دادن به بارگذاری اولیه صفحه
    
  } catch (error) {
    console.error('خطا در راه‌اندازی سرویس ورکر:', error);
    // بازنشانی علامت در صورت خطا
    serviceWorkerInitialized = false;
  }
};

// تابع برای پیش‌بارگذاری مسیرهای اصلی برنامه
export const preloadRoutes = (): void => {
  // لیست مسیرهای اصلی برنامه
  const mainRoutes = [
    '/',
    '/Students',
    '/Exercise-Movements',
    '/Diet-Plan',
    '/Supplements-Vitamins'
  ];
  
  // در زمان خالی مرورگر، مسیرها را پیش‌بارگذاری کن
  runWhenIdle(() => {
    mainRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
    console.log('مسیرهای اصلی برنامه پیش‌بارگذاری شدند');
  }, 5000); // تاخیر 5 ثانیه‌ای بعد از بارگذاری صفحه
};
