
/**
 * Simplified service worker registration with focus on offline support and updates
 */

// Flag to track if update is available
let updateAvailable = false;

// Fetch version from Manifest.json
async function getAppVersion(): Promise<string> {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version || '3.2.7';
  } catch (error) {
    console.error('خطا در دریافت نسخه برنامه:', error);
    return '3.2.7';
  }
}

// Register the service worker
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return null;
  }
  
  try {
    // Get version from manifest
    const appVersion = await getAppVersion();
    
    // Register with full path and version from manifest
    const registration = await navigator.serviceWorker.register(`/service-worker.js?v=${appVersion}`, {
      scope: '/',
      updateViaCache: 'none' // Always check for updates
    });
    
    console.log(`سرویس ورکر با موفقیت راه‌اندازی شد (نسخه ${appVersion})`);
    
    // فقط زمانی بروزرسانی نمایش داده شود که سرویس ورکر واقعاً تغییر کرده باشد
    if (registration.waiting) {
      updateAvailable = true;
      showUpdateNotification();
    }
    
    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        // فقط زمانی که سرویس ورکر در حالت نصب است و یک کنترلر فعال وجود دارد
        // نشانه‌ای است که این یک بروزرسانی واقعی است نه نصب اولیه
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // اگر قبلاً بروزرسانی نمایش داده نشده
          if (!updateAvailable) {
            updateAvailable = true;
            showUpdateNotification();
          }
        }
      });
    });
    
    // Listen for controller change to refresh page
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      console.log('سرویس ورکر بروز شد، بارگذاری مجدد صفحه...');
      window.location.reload();
    });
    
    return registration;
  } catch (error) {
    console.error('خطا در ثبت سرویس ورکر:', error);
    return null;
  }
}

// Show update notification
export function showUpdateNotification(): void {
  if (typeof window.showToast === 'function') {
    window.showToast({
      title: 'بروزرسانی جدید',
      description: 'نسخه جدید برنامه در دسترس است.',
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
    if (confirm('نسخه جدید برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟')) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SKIP_WAITING'
        });
      }
    }
  }
}

// Offline detection
export function setupOfflineDetection(): void {
  window.addEventListener('online', () => {
    console.log('اتصال به اینترنت برقرار شد');
    document.documentElement.classList.remove('offline-mode');
    
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'اتصال برقرار شد',
        description: 'شما مجدداً به اینترنت متصل شدید.',
        variant: 'success',
        duration: 3000
      });
    }
  });
  
  window.addEventListener('offline', () => {
    console.log('اتصال به اینترنت قطع شد');
    document.documentElement.classList.add('offline-mode');
    
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'حالت آفلاین',
        description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
        variant: 'warning',
        duration: 5000
      });
    }
  });
  
  // Check initial state
  if (!navigator.onLine) {
    document.documentElement.classList.add('offline-mode');
  }
}

// Add window.showToast type definition
declare global {
  interface Window {
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
