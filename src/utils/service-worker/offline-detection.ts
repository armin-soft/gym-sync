
/**
 * سیستم تشخیص وضعیت آفلاین و مدیریت آن
 */

import { useToast } from "@/hooks/use-toast";

// تنظیم مانیتورینگ وضعیت آنلاین/آفلاین
export const setupOfflineDetection = (): void => {
  let toastShown = false;
  let offlineEventQueued = false;
  
  // تابع نمایش اعلان آفلاین
  const showOfflineToast = () => {
    if (toastShown) return;
    
    // نمایش اعلان فقط یک بار
    try {
      const { toast } = useToast();
      
      if (toast) {
        toast({
          variant: "warning",
          title: "اتصال قطع شد",
          description: "شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.",
          duration: 5000
        });
        
        toastShown = true;
      }
    } catch (error) {
      // اگر هنوز hook آماده نیست، با تاخیر دوباره تلاش کن
      if (!offlineEventQueued) {
        offlineEventQueued = true;
        setTimeout(showOfflineToast, 2000);
      }
      console.log('اعلان آفلاین با تاخیر نمایش داده خواهد شد');
    }
  };
  
  // تابع نمایش اعلان آنلاین
  const showOnlineToast = () => {
    toastShown = false;
    offlineEventQueued = false;
    
    try {
      const { toast } = useToast();
      
      if (toast) {
        toast({
          title: "اتصال برقرار شد",
          description: "شما مجدداً به اینترنت متصل شدید.",
          duration: 3000
        });
      }
    } catch (error) {
      console.log('اعلان آنلاین نمایش داده نشد');
    }
  };

  // ثبت event listener ها
  window.addEventListener('offline', () => {
    showOfflineToast();
    document.documentElement.classList.add('offline-mode');
  });
  
  window.addEventListener('online', () => {
    showOnlineToast();
    document.documentElement.classList.remove('offline-mode');
    
    // در صورت برقراری اتصال، یک درخواست برای بررسی آپدیت ارسال کن
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.update();
      });
    }
  });
  
  // وضعیت اولیه را بررسی کن
  if (!navigator.onLine) {
    document.documentElement.classList.add('offline-mode');
    showOfflineToast();
  }
};

// فانکشن برای بررسی دسترسی به یک URL خاص
export const checkConnectivity = async (url: string = 'https://www.google.com/favicon.ico'): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.log('تست اتصال ناموفق بود:', error);
    return false;
  }
};
