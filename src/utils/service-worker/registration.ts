
/**
 * بهینه‌سازی شده - سرویس ورکر با تمرکز بر عملکرد و سرعت
 */

// پرچم وجود بروزرسانی
let updateAvailable = false;

// دریافت نسخه از فایل Manifest.json با کش کردن نتیجه
const appVersionPromise = fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => manifest.version || '1.4.0')
  .catch(() => '1.4.0');

// ثبت سرویس ورکر با کارایی بهبود یافته
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return null;
  }
  
  try {
    // دریافت نسخه از کش یا فایل manifest
    const appVersion = await appVersionPromise;
    
    // ثبت با مسیر کامل و نسخه
    const registration = await navigator.serviceWorker.register(`/service-worker.js?v=${appVersion}`, {
      scope: '/',
      updateViaCache: 'none' // همیشه برای بروزرسانی‌ها بررسی شود
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
    return null;
  }
}

// نمایش اطلاعیه بروزرسانی
export function showUpdateNotification(): void {
  if (typeof window.showToast === 'function') {
    window.showToast({
      title: 'بروزرسانی جدید',
      description: 'نسخه جدید برنامه در دسترس است.',
      variant: 'warning',
      action: {
        label: 'بروزرسانی',
        onClick: () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SKIP_WAITING'
            });
          }
        }
      }
    });
  } else {
    if (confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟')) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SKIP_WAITING'
        });
      }
    }
  }
}

// تشخیص آفلاین بودن - بهینه شده
export function setupOfflineDetection(): void {
  const offlineClassName = 'offline-mode';
  
  function handleOnline() {
    document.documentElement.classList.remove(offlineClassName);
    
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'اتصال برقرار شد',
        description: 'شما مجدداً به اینترنت متصل شدید.',
        variant: 'success',
        duration: 3000
      });
    }
  }
  
  function handleOffline() {
    document.documentElement.classList.add(offlineClassName);
    
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'حالت آفلاین',
        description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
        variant: 'warning',
        duration: 5000
      });
    }
  }
  
  // اضافه کردن شنونده‌ها فقط یک بار
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // بررسی وضعیت اولیه
  if (!navigator.onLine) {
    document.documentElement.classList.add(offlineClassName);
  }
}

// تعریف نوع showToast در window
declare global {
  interface Window {
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
