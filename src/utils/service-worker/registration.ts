/**
 * بهینه‌سازی شده - سرویس ورکر با تمرکز بر عملکرد و سرعت با بهبود تحمل خطا
 */

// پرچم وجود بروزرسانی
let updateAvailable = false;

// دریافت نسخه از فایل Manifest.json با کش کردن نتیجه
const getAppVersionFromManifest = async () => {
  try {
    // ابتدا از localStorage بخوان اگر موجود است
    const cachedVersion = localStorage.getItem('app_version');
    
    // تلاش برای دریافت از سرور
    try {
      const response = await fetch('./Manifest.json');
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const manifest = await response.json();
      // ذخیره نسخه تازه در localStorage
      if (manifest.version) {
        localStorage.setItem('app_version', manifest.version);
      }
      return manifest.version;
    } catch (error) {
      console.warn('خطا در بارگیری نسخه از منیفست، استفاده از نسخه کش شده:', error);
      // اگر نسخه کش شده داریم، از آن استفاده کن
      if (cachedVersion) return cachedVersion;
      
      // تلاش مجدد با درخواست تازه
      try {
        const retryResponse = await fetch('./Manifest.json', { 
          cache: 'reload',
          mode: 'no-cors' // اضافه کردن no-cors برای تحمل خطای بیشتر
        });
        if (retryResponse.type === 'opaque') {
          // درخواست no-cors نمی‌تواند محتوا را بخواند، پس از نسخه پیش‌فرض استفاده می‌کنیم
          return cachedVersion || '2.3.0'; // استفاده از نسخه پیش‌فرض اگر کش نداشتیم - Updated to 2.3.0
        }
        const retryData = await retryResponse.json();
        return retryData.version;
      } catch (retryError) {
        console.error('خطای دوم در بارگیری نسخه:', retryError);
        // استفاده از نسخه پیش‌فرض یا کش شده
        return cachedVersion || '2.3.0'; // Updated to 2.3.0
      }
    }
  } catch (finalError) {
    console.error('خطای نهایی در بارگیری نسخه:', finalError);
    return '2.3.0'; // همیشه یک مقدار برگشت بده - Updated to 2.3.0
  }
};

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

// نمایش اطلاعیه بروزرسانی
export function showUpdateNotification(): void {
  try {
    // استفاده از toast سیستم یکپارچه
    if (window.showToast) {
      window.showToast({
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
    } else {
      // اگر سیستم toast در دسترس نبود، از confirm استفاده میکنیم
      if (confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟')) {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SKIP_WAITING'
          });
        }
      }
    }
  } catch (error) {
    console.error('خطا در نمایش اعلان بروزرسانی:', error);
  }
}

// تشخیص آفلاین بودن - بهینه شده
export function setupOfflineDetection(): void {
  const offlineClassName = 'offline-mode';
  
  function handleOnline() {
    document.documentElement.classList.remove(offlineClassName);
    
    // استفاده از toast سیستم یکپارچه
    try {
      if (window.showToast) {
        window.showToast({
          title: 'اتصال برقرار شد',
          description: 'شما مجدداً به اینترنت متصل شدید.',
          variant: 'success',
          duration: 3000
        });
      } else {
        console.log('اتصال به اینترنت برقرار شد');
      }
    } catch (error) {
      console.log('اتصال به اینترنت برقرار شد');
    }
  }
  
  function handleOffline() {
    document.documentElement.classList.add(offlineClassName);
    
    // استفاده از toast سیستم یکپارچه
    try {
      if (window.showToast) {
        window.showToast({
          title: 'حالت آفلاین',
          description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
          variant: 'warning',
          duration: 5000
        });
      } else {
        console.log('اتصال به اینترنت قطع شد');
      }
    } catch (error) {
      console.log('اتصال به اینترنت قطع شد');
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
