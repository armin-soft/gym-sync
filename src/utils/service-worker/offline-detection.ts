
/**
 * تشخیص و اعلان وضعیت آفلاین
 */

/**
 * راه‌اندازی تشخیص وضعیت آفلاین و آنلاین
 */
export const setupOfflineDetection = (): void => {
  window.addEventListener('online', () => {
    console.log('اتصال به اینترنت برقرار شد');
    document.body.classList.remove('offline-mode');
    // نمایش پیام اتصال مجدد
    if (typeof window.alert === 'function') {
      window.alert('شما مجدداً به اینترنت متصل شدید.');
    }
  });
  
  window.addEventListener('offline', () => {
    console.log('اتصال به اینترنت قطع شد');
    document.body.classList.add('offline-mode');
    // نمایش پیام قطع اتصال
    if (typeof window.alert === 'function') {
      window.alert('شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.');
    }
  });
};
