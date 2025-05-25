
/**
 * مدیریت تشخیص و نمایش وضعیت آفلاین
 */

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
