
/**
 * توابع کمکی برای سرویس ورکر
 */

// بررسی پشتیبانی مرورگر از سرویس ورکر
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// نمایش اعلان به کاربر
export const showToast = (): void => {
  // پیاده‌سازی نمایش اعلان - بعداً با سیستم toast جایگزین خواهد شد
  console.log('نمایش پیام به کاربر');
};

// دریافت نسخه برنامه
export const getAppVersion = (): string => '1.0.0';

// نمایش اعلان بروزرسانی
export function showUpdateNotification(): void {
  if (window.confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه بروزرسانی شود؟')) {
    window.location.reload();
  }
}
