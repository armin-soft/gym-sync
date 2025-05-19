
/**
 * تشخیص وضعیت آفلاین و مدیریت آن
 */

import { useToast } from "@/hooks/use-toast";

// متغیر نگهداری وضعیت آنلاین/آفلاین
let isOnline = navigator.onLine;

// تنظیم رویدادهای وضعیت اتصال
export function setupOfflineDetection(): void {
  const handleOnlineStatus = () => {
    const wasOffline = !isOnline;
    isOnline = true;
    
    if (wasOffline) {
      console.log('اتصال به اینترنت برقرار شد');
      showOnlineToast();
    }
  };
  
  const handleOfflineStatus = () => {
    isOnline = false;
    console.log('اتصال به اینترنت قطع شد');
    showOfflineToast();
  };
  
  window.addEventListener('online', handleOnlineStatus);
  window.addEventListener('offline', handleOfflineStatus);
  
  // بررسی وضعیت اولیه
  if (!navigator.onLine) {
    handleOfflineStatus();
  }
}

// نمایش پیام آفلاین
function showOfflineToast(): void {
  try {
    if (typeof document !== 'undefined') {
      const { toast } = require("@/hooks/use-toast");
      toast({
        title: "شما آفلاین هستید",
        description: "اتصال به اینترنت قطع شده است. برخی از قابلیت‌ها ممکن است در دسترس نباشند.",
        variant: "destructive",
        duration: 5000,
      });
    }
  } catch (e) {
    console.error('خطا در نمایش اعلان آفلاین:', e);
  }
}

// نمایش پیام آنلاین
function showOnlineToast(): void {
  try {
    if (typeof document !== 'undefined') {
      const { toast } = require("@/hooks/use-toast");
      toast({
        title: "شما آنلاین هستید",
        description: "اتصال به اینترنت برقرار شد. همه قابلیت‌ها در دسترس هستند.",
        duration: 3000,
      });
    }
  } catch (e) {
    console.error('خطا در نمایش اعلان آنلاین:', e);
  }
}

// تابع بررسی وضعیت آنلاین/آفلاین
export function checkOnlineStatus(): boolean {
  return isOnline;
}
