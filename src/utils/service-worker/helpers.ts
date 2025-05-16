
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
  // برای جلوگیری از نمایش مکرر اعلان در زمان بارگیری
  const lastPromptTime = parseInt(sessionStorage.getItem('update_prompt_time') || '0');
  const currentTime = new Date().getTime();
  
  // فقط اگر 10 دقیقه از آخرین نمایش گذشته باشد مجدداً نمایش دهد
  if (currentTime - lastPromptTime > 10 * 60 * 1000) {
    if (window.confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه بروزرسانی شود؟')) {
      window.location.reload();
    }
    // ثبت زمان نمایش اعلان
    sessionStorage.setItem('update_prompt_time', currentTime.toString());
  }
}
