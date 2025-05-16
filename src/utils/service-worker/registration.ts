
/**
 * سرویس ورکر ساده‌شده - فقط پشتیبانی آفلاین و بروزرسانی
 */
import { showUpdateNotification } from './helpers';

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      // دریافت نسخه کنونی از مانیفست
      const manifestResponse = await fetch('./Manifest.json');
      const manifestData = await manifestResponse.json();
      const currentVersion = manifestData.version || '1.0.0';
      
      // آخرین نسخه شناخته شده از localStorage
      const lastKnownVersion = localStorage.getItem('app_version') || '';
      
      // ثبت سرویس ورکر با تایم‌استمپ برای اطمینان از بروزرسانی
      const timestamp = new Date().getTime();
      const registration = await navigator.serviceWorker.register('./Service-Worker.js?v=' + timestamp);
      console.log('سرویس ورکر با موفقیت ثبت شد:', registration.scope);

      // بررسی بروزرسانی‌ها
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('نسخه جدید نصب شد و آماده استفاده است!');
            
            // فقط اگر نسخه‌ها متفاوت باشند اعلان نمایش داده شود
            if (lastKnownVersion !== currentVersion) {
              // نمایش اعلان بروزرسانی
              showUpdateNotification();
              // ذخیره نسخه جدید
              localStorage.setItem('app_version', currentVersion);
            }
          }
        });
      });

      // بررسی مجدد بروزرسانی‌ها هر 30 دقیقه
      setInterval(() => {
        registration.update().catch(err => {
          console.error('خطا در بروزرسانی سرویس ورکر:', err);
        });
      }, 30 * 60 * 1000);

      // گوش دادن به تغییر کنترل‌کننده
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        console.log('کنترل‌کننده تغییر کرد، در حال بروزرسانی صفحه...');
        window.location.reload();
      });

      // ذخیره نسخه فعلی اگر تازه نصب شده است
      if (!lastKnownVersion) {
        localStorage.setItem('app_version', currentVersion);
      }

    } catch (error) {
      console.error('خطا در ثبت سرویس ورکر:', error);
    }
  }
};
