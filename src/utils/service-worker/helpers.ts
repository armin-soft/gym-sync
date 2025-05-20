
/**
 * Check if the browser supports Service Workers
 */
export function isServiceWorkerSupported(): boolean {
  return 'serviceWorker' in navigator;
}

/**
 * Run a function when the browser is idle
 */
export function runWhenIdle(callback: () => void, timeout = 1000): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
}

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      // Force update by adding timestamp to prevent excessive caching
      const timestamp = new Date().getTime();
      const registration = await navigator.serviceWorker.register(`/sw.js?v=${timestamp}`, {
        scope: '/',
        updateViaCache: 'none' // Always check the network for updates
      });
      
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed; waiting for activation");
        // Force activation of the waiting service worker
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      } else if (registration.active) {
        console.log("Service worker active");
      }

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New content is available, prompt the user to update
              showUpdateNotification();
            } else {
              // Content is cached for offline use
              console.log("Content is cached for offline use.");
            }
          }
        };
      };
      
      // Listen for controller change events to refresh the page
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        refreshing = true;
        console.log("Controller changed, refreshing page...");
        window.location.reload();
      });
      
      return registration;
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
      return null;
    }
  } else {
    console.log("Service workers are not supported.");
    return null;
  }
};

export const showUpdateNotification = () => {
  const updatePrompt = confirm(
    "نسخه جدیدی از برنامه در دسترس است. آیا میخواهید نسخه را به‌روزرسانی کنید؟"
  );

  if (updatePrompt) {
    window.location.reload();
  }
};

export const unregisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log("Service worker unregistered.");
        // Force page refresh to ensure clean state
        window.location.reload();
      }
    } catch (error) {
      console.error(`Service worker unregistration failed: ${error}`);
    }
  }
};

// Clear all service worker caches
export const clearServiceWorkerCaches = async (): Promise<boolean> => {
  if ('caches' in window) {
    try {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map(cacheKey => caches.delete(cacheKey))
      );
      console.log("All service worker caches cleared.");
      return true;
    } catch (error) {
      console.error("Failed to clear caches:", error);
      return false;
    }
  }
  return false;
};

// Reset service worker completely (unregister + clear caches)
export const resetServiceWorker = async (): Promise<boolean> => {
  try {
    await unregisterServiceWorker();
    await clearServiceWorkerCaches();
    console.log("Service worker has been completely reset");
    return true;
  } catch (error) {
    console.error("Failed to reset service worker:", error);
    return false;
  }
};
