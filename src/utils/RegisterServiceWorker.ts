
/**
 * Service Worker Registration Utility
 * Handles the registration, updates, and messaging for service workers
 */

// Check if service workers are supported in current browser
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// Interface for toast notification options
interface ToastOptions {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Function to show toast notifications if available
const showToast = (options: ToastOptions): void => {
  if (typeof window.showToast === 'function') {
    window.showToast(options);
  } else {
    console.log(`${options.title}: ${options.description}`);
  }
};

/**
 * Register the service worker
 * @param {string} scriptPath - Path to service worker script (default: './Service-Worker.js')
 * @returns {Promise<ServiceWorkerRegistration | null>}
 */
export const registerServiceWorker = async (
  scriptPath: string = './Service-Worker.js'
): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) {
    console.log('Service workers are not supported in this browser');
    return null;
  }

  try {
    // Add timestamp to force new service worker
    const timestamp = new Date().getTime();
    const cacheBustedPath = `${scriptPath}?v=${timestamp}`;
    
    // Clear caches before registering to ensure fresh version
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(cacheName => cacheName.includes('gym-sync'))
            .map(cacheName => {
              console.log('Clearing cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      } catch (err) {
        console.error('Error clearing caches:', err);
      }
    }
    
    // Register the service worker
    const registration = await navigator.serviceWorker.register(cacheBustedPath);
    console.log('ServiceWorker registration successful with scope:', registration.scope);
    
    // Set up update handling
    setupServiceWorkerUpdates(registration);
    
    // Save registration to make it available throughout the app
    window.swRegistration = registration;
    
    // Notify React app that service worker is ready
    window.dispatchEvent(new CustomEvent('swRegistered', { detail: registration }));
    
    return registration;
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
    
    // Try once more after a short delay
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const retryRegistration = await navigator.serviceWorker.register(scriptPath);
      console.log('ServiceWorker registration successful on retry');
      window.swRegistration = retryRegistration;
      window.dispatchEvent(new CustomEvent('swRegistered', { detail: retryRegistration }));
      return retryRegistration;
    } catch (retryError) {
      console.error('ServiceWorker registration failed on retry:', retryError);
      return null;
    }
  }
};

/**
 * Set up handlers for service worker updates and messages
 * @param {ServiceWorkerRegistration} registration 
 */
function setupServiceWorkerUpdates(registration: ServiceWorkerRegistration): void {
  // Function to handle updates
  const handleServiceWorkerUpdate = () => {
    // Check for updates when the page loads
    registration.update().catch(err => {
      console.error('Service worker update failed:', err);
    });
    
    // When a new service worker is waiting to be activated
    if (registration.waiting) {
      console.log('New version available! Ready to update.');
      showUpdateNotification();
    }
    
    // When a new service worker is detected
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New version installed! Ready to update.');
          showUpdateNotification();
        }
      });
    });
  };
  
  handleServiceWorkerUpdate();
  
  // Listen for controller change events
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    console.log('Controller changed, refreshing page...');
    window.location.reload();
  });
  
  // Set up periodic checks for updates
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CHECK_FOR_UPDATES'
      });
    }
  }, 5 * 60 * 1000); // 5 minutes
  
  // Add refresh cache capability every 30 minutes
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'REFRESH_CACHE'
      });
    }
  }, 30 * 60 * 1000); // 30 minutes
}

/**
 * Show notification about available updates
 */
function showUpdateNotification(): void {
  showToast({
    title: 'بروزرسانی جدید',
    description: 'نسخه جدید برنامه در دسترس است. برای اعمال تغییرات، صفحه را بروزرسانی کنید.',
    variant: 'warning',
    duration: 10000,
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
}

/**
 * Setup offline detection and notification
 */
export const setupOfflineDetection = (): void => {
  window.addEventListener('online', () => {
    console.log('Application is online');
    document.body.classList.remove('offline-mode');
    showToast({
      title: 'اتصال برقرار شد',
      description: 'شما مجدداً به اینترنت متصل شدید.',
      variant: 'success',
      duration: 3000
    });
  });
  
  window.addEventListener('offline', () => {
    console.log('Application is offline');
    document.body.classList.add('offline-mode');
    showToast({
      title: 'حالت آفلاین',
      description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
      variant: 'warning',
      duration: 5000
    });
  });
};

/**
 * Initialize service worker and offline detection
 * Best called from the main entry point of the app (e.g., main.tsx)
 */
export const initializeServiceWorker = async (): Promise<void> => {
  await registerServiceWorker();
  setupOfflineDetection();
};
