
/**
 * بهینه‌سازی شده - سرویس ورکر با تمرکز بر عملکرد و سرعت
 */

// پرچم وجود بروزرسانی
let updateAvailable = false;

// دریافت نسخه از فایل Manifest.json با کش کردن نتیجه
const appVersionPromise = fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => manifest.version || '1.9.2')
  .catch(() => '1.9.2');

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
    const registration = await navigator.serviceWorker.register(`/Service-Worker.js?v=${appVersion}`, {
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
  // استفاده از toast سیستم یکپارچه
  import('@/hooks/toast/toast-utils').then(({ toast }) => {
    toast({
      title: 'بروزرسانی جدید',
      description: 'نسخه جدید برنامه در دسترس است.',
      variant: 'warning',
      action: {
        onClick: () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SKIP_WAITING'
            });
          }
        },
        label: 'بروزرسانی'
      }
    });
  }).catch(() => {
    // اگر سیستم toast در دسترس نبود، از confirm استفاده میکنیم
    if (confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟')) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SKIP_WAITING'
        });
      }
    }
  });
}

// تشخیص آفلاین بودن - بهینه شده
export function setupOfflineDetection(): void {
  const offlineClassName = 'offline-mode';
  
  function handleOnline() {
    document.documentElement.classList.remove(offlineClassName);
    
    // استفاده از toast سیستم یکپارچه
    import('@/hooks/toast/toast-utils').then(({ toast }) => {
      toast({
        title: 'اتصال برقرار شد',
        description: 'شما مجدداً به اینترنت متصل شدید.',
        variant: 'success',
        duration: 3000
      });
    }).catch(() => {
      // اگر سیستم toast در دسترس نبود، عملیات خاصی انجام نمیدهیم
      console.log('اتصال به اینترنت برقرار شد');
    });
  }
  
  function handleOffline() {
    document.documentElement.classList.add(offlineClassName);
    
    // استفاده از toast سیستم یکپارچه
    import('@/hooks/toast/toast-utils').then(({ toast }) => {
      toast({
        title: 'حالت آفلاین',
        description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
        variant: 'warning',
        duration: 5000
      });
    }).catch(() => {
      // اگر سیستم toast در دسترس نبود، عملیات خاصی انجام نمیدهیم
      console.log('اتصال به اینترنت قطع شد');
    });
  }
  
  // اضافه کردن شنونده‌ها فقط یک بار
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // بررسی وضعیت اولیه
  if (!navigator.onLine) {
    document.documentElement.classList.add(offlineClassName);
  }
}

// تعریف نوع showToast در window برای سازگاری با قبل
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
