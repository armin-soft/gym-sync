
/**
 * مدیریت نمایش اعلان‌های مربوط به سرویس ورکر
 */

// نمایش اطلاعیه بروزرسانی
export function showUpdateNotification(): void {
  try {
    // استفاده از toast سیستم یکپارچه
    if (window.showToast) {
      window.showToast({
        title: 'بروزرسانی جدید',
        description: 'نسخه جدید برنامه در دسترس است.',
        variant: 'warning',
        action: {
          onClick: () => {
            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.controller.postMessage({
                type: 'SKIP_WAITING'
              });
            }
          },
          label: 'بروزرسانی'
        }
      });
    } else {
      // اگر سیستم toast در دسترس نبود، از confirm استفاده میکنیم
      if (confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟')) {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SKIP_WAITING'
          });
        }
      }
    }
  } catch (error) {
    console.error('خطا در نمایش اعلان بروزرسانی:', error);
  }
}
