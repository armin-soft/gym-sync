
// Notification utilities for service worker

// Show update notification with version
export function showUpdateNotification(version) {
  // Simple notification implementation
  if (typeof window.showToast === 'function') {
    window.showToast({
      title: 'بروزرسانی جدید',
      description: `نسخه ${version} برنامه در دسترس است. برای اعمال تغییرات، صفحه را بروزرسانی کنید.`,
      variant: 'warning',
      action: {
        label: 'بروزرسانی',
        onClick: () => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SKIP_WAITING'
            });
          }
        }
      }
    });
  } else {
    if (confirm(`نسخه ${version} برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟`)) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SKIP_WAITING'
        });
      }
    }
  }
}
