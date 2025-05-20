
/**
 * توابع کمکی برای سرویس ورکر
 */

// بررسی پشتیبانی مرورگر از سرویس ورکر
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// نمایش اعلان به کاربر
export const showToast = (message: string): void => {
  // با توجه به اینکه toast در کامپوننت‌های UI موجود است
  // این فقط یک متد جایگزین برای زمانی است که toast در دسترس نیست
  console.log(message);
  
  // اگر می‌خواهیم یک اعلان ساده نمایش دهیم:
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("GymSync", {
      body: message,
      icon: "./Assets/Image/Logo.png"
    });
  }
};

// دریافت نسخه برنامه از manifest
export const getAppVersion = (): Promise<string> => {
  return fetch('./Manifest.json')
    .then(response => response.json())
    .then(data => data.version || '1.0.0')
    .catch(() => '1.0.0');
};

// نمایش اعلان بروزرسانی با پیشگیری از نمایش مکرر
export function showUpdateNotification(): void {
  // برای جلوگیری از نمایش مکرر اعلان در زمان بارگذاری
  const lastPromptTime = parseInt(sessionStorage.getItem('update_prompt_time') || '0');
  const currentTime = new Date().getTime();
  
  // فقط اگر 10 دقیقه از آخرین نمایش گذشته باشد مجدداً نمایش دهد
  if (currentTime - lastPromptTime > 10 * 60 * 1000) {
    const userConfirmed = window.confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه بروزرسانی شود؟');
    
    if (userConfirmed) {
      // پیش از بارگذاری مجدد، همه کش‌ها را پاک کنیم تا مطمئن شویم نسخه جدید بارگذاری می‌شود
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              return caches.delete(cacheName);
            })
          );
        }).then(() => {
          // Explicitly specify that we're accessing the window object
          window.location.reload();
        });
      } else {
        // Explicitly specify that we're accessing the window object
        window.location.reload();
      }
    }
    
    // ثبت زمان نمایش اعلان
    sessionStorage.setItem('update_prompt_time', currentTime.toString());
  }
}

// بررسی وضعیت آنلاین/آفلاین
export function isOnline(): boolean {
  return navigator.onLine;
}

// راه‌اندازی پردازش در زمان خالی مرورگر
export function runWhenIdle(callback: () => void, timeout = 1000): void {
  if ('requestIdleCallback' in window) {
    // استفاده از window در اینجا ایمن‌تر است و خطای TypeScript را برطرف می‌کند
    window.requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, timeout);
  }
}
