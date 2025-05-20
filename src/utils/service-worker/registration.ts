
/**
 * ثبت و پیکربندی سرویس ورکر
 */

import { isServiceWorkerSupported, showUpdateNotification } from "./helpers";

// ثبت سرویس ورکر با کانفیگ بهینه‌شده
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isServiceWorkerSupported()) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return null;
  }
  
  try {
    // ثبت با حداکثر اولویت
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      updateViaCache: 'none' // همیشه شبکه را برای به‌روزرسانی‌ها بررسی کند
    });
    
    // بررسی وضعیت سرویس ورکر
    if (registration.installing) {
      console.log('سرویس ورکر در حال نصب است');
    } else if (registration.waiting) {
      console.log('سرویس ورکر در انتظار فعال‌سازی است');
      // اعمال فوری سرویس ورکر جدید
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } else if (registration.active) {
      console.log('سرویس ورکر فعال است');
      // اعمال فوری کنترل
      if (navigator.serviceWorker.controller === null) {
        // اولین بار است که سرویس ورکر نصب می‌شود
        // صفحه را بارگذاری مجدد کن تا سرویس ورکر کنترل را بدست بگیرد
        window.location.reload();
      }
    }
    
    // تنظیم رفتار بروزرسانی
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('نسخه جدید برنامه در دسترس است');
          showUpdateNotification();
        }
      });
    });
    
    // این کد کمک می‌کند نویگیشن فوری بین صفحات حفظ شود
    if (registration.navigationPreload) {
      await registration.navigationPreload.enable();
      console.log('پیش‌بارگذاری نویگیشن فعال شد');
    }
    
    return registration;
  } catch (error) {
    console.error('خطا در ثبت سرویس ورکر:', error);
    return null;
  }
}

// لغو ثبت سرویس ورکر (در صورت نیاز)
export async function unregisterServiceWorker(): Promise<boolean> {
  if (!isServiceWorkerSupported()) return false;
  
  try {
    const registration = await navigator.serviceWorker.ready;
    const result = await registration.unregister();
    console.log('لغو ثبت سرویس ورکر:', result);
    return result;
  } catch (error) {
    console.error('خطا در لغو ثبت سرویس ورکر:', error);
    return false;
  }
}
