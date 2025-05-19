
/**
 * ثبت و پیکربندی سرویس ورکر
 */

import { isServiceWorkerSupported, showUpdateNotification } from "./helpers";

// ثبت سرویس ورکر
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isServiceWorkerSupported()) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return null;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });
    
    // بررسی وضعیت سرویس ورکر
    if (registration.installing) {
      console.log('سرویس ورکر در حال نصب است');
    } else if (registration.waiting) {
      console.log('سرویس ورکر در انتظار فعال‌سازی است');
    } else if (registration.active) {
      console.log('سرویس ورکر فعال است');
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
    
    // پیکربندی برای بروزرسانی خودکار هر 60 دقیقه
    setInterval(() => {
      registration.update();
    }, 60 * 60 * 1000);
    
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
