
/**
 * سیستم ثبت سرویس ورکر ساده شده برای Lovable
 */
import { toast } from '@/hooks/use-toast';

// تابع ساده راه‌اندازی سرویس ورکر
export function initializeServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  // اگر قبلا راه‌اندازی شده، عملیات را انجام نده
  if (window.__serviceWorkerInitialized) {
    return Promise.resolve(null);
  }
  
  window.__serviceWorkerInitialized = true;
  
  // بررسی پشتیبانی از سرویس ورکر
  if (!('serviceWorker' in navigator)) {
    console.log('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return Promise.resolve(null);
  }
  
  return new Promise(async (resolve) => {
    try {
      console.log('شروع ثبت سرویس ورکر ساده...');
      
      const registration = await navigator.serviceWorker.register('./Service-Worker.js', {
        scope: './',
        updateViaCache: 'none'
      });
      
      console.log('سرویس ورکر با موفقیت ثبت شد');
      resolve(registration);
    } catch (error) {
      console.log('سرویس ورکر ثبت نشد:', error);
      // خطاها را فرو بخور تا برنامه اصلی ادامه یابد
      resolve(null);
    }
  });
}

// تعریف متغیر سراسری
declare global {
  interface Window {
    __serviceWorkerInitialized?: boolean;
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
