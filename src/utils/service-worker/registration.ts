
/**
 * بهینه‌سازی شده - سرویس ورکر با تمرکز بر عملکرد و سرعت با بهبود تحمل خطا
 */
import { getAppVersionFromManifest } from './version';
import { showUpdateNotification } from './notifications';

// پرچم وجود بروزرسانی
let updateAvailable = false;

// ثبت سرویس ورکر با کارایی بهبود یافته و تحمل خطای بالا
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return null;
  }
  
  try {
    // دریافت نسخه از فایل manifest با مدیریت خطای بهتر
    const appVersion = await getAppVersionFromManifest();
    
    // ذخیره نسخه در localStorage برای استفاده در مواقع آفلاین
    if (appVersion) {
      localStorage.setItem('app_version', appVersion);
    }
    
    // بررسی وجود سرویس ورکر فعلی
    const existingRegistration = await navigator.serviceWorker.getRegistration();
    
    // اضافه کردن پارامترهای اضافی برای جلوگیری از کش
    const timestamp = new Date().getTime();
    const swUrl = `./Service-Worker.js?v=${appVersion}&t=${timestamp}`;
    
    // ثبت با مسیر کامل و نسخه - اشاره به فایل در ریشه dist
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: '/',
      updateViaCache: 'none', // همیشه برای بروزرسانی‌ها بررسی شود
      type: 'classic' // نوع کلاسیک برای سازگاری بیشتر
    });
    
    console.log(`سرویس ورکر با موفقیت راه‌اندازی شد (نسخه ${appVersion})`);
    
    // فقط زمانی بروزرسانی نمایش داده شود که واقعاً تغییر کرده باشد
    if (registration.waiting) {
      updateAvailable = true;
      showUpdateNotification();
    }
    
    // مدیریت بروزرسانی‌های سرویس ورکر
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        // فقط زمانی که سرویس ورکر در حالت نصب است و یک کنترلر فعال وجود دارد
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          if (!updateAvailable) {
            updateAvailable = true;
            showUpdateNotification();
          }
        }
      });
    });
    
    // بارگذاری مجدد صفحه فقط یک بار انجام شود
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      console.log('سرویس ورکر بروز شد، بارگذاری مجدد صفحه...');
      window.location.reload();
    });
    
    return registration;
  } catch (error) {
    console.error('خطا در ثبت سرویس ورکر:', error);
    // در صورت خطا، تلاش کنیم با مسیر نسبی ثبت کنیم
    try {
      const timestamp = new Date().getTime();
      const fallbackRegistration = await navigator.serviceWorker.register(`Service-Worker.js?t=${timestamp}`, {
        scope: './',
        updateViaCache: 'none'
      });
      console.log('سرویس ورکر با مسیر نسبی ثبت شد');
      return fallbackRegistration;
    } catch (fallbackError) {
      console.error('خطای نهایی در ثبت سرویس ورکر:', fallbackError);
      // بازگشت null بدون شکست برنامه
      return null;
    }
  }
}
