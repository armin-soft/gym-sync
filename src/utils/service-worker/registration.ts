
/**
 * سرویس ورکر ساده‌شده - فقط پشتیبانی آفلاین و بروزرسانی
 */
export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      // ثبت سرویس ورکر با یک تایم‌استمپ برای اطمینان از بروزبودن
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
            
            // نمایش اعلان بروزرسانی
            if (window.confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه بروزرسانی شود؟')) {
              window.location.reload();
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

    } catch (error) {
      console.error('خطا در ثبت سرویس ورکر:', error);
    }
  }
};
