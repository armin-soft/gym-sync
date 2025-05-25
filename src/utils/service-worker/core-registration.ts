
import { showUpdateNotification } from './notifications';

// Manages the 'refreshing' state for controller change to prevent multiple reloads
let refreshing = false;

/**
 * Sets up a listener for the 'controllerchange' event on navigator.serviceWorker.
 * This event fires when the service worker controlling the page changes.
 * It reloads the page to apply the new service worker's updates.
 */
export function setupControllerChangeListener(): void {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    console.log('سرویس ورکر بروز شد، بارگذاری مجدد صفحه...');
    window.location.reload();
  });
}

/**
 * Checks if a new service worker is already waiting (registration.waiting)
 * and shows an update notification if an update hasn't already been flagged.
 * @param registration - The ServiceWorkerRegistration object.
 * @param updateAvailableRef - A reference object to track if an update notification has been shown.
 */
export function handleImmediateUpdate(registration: ServiceWorkerRegistration, updateAvailableRef: { value: boolean }): void {
  if (registration.waiting) {
    if (!updateAvailableRef.value) {
      updateAvailableRef.value = true;
      showUpdateNotification();
    }
  }
}

/**
 * Sets up an 'updatefound' event listener on the ServiceWorkerRegistration.
 * This event fires when a new version of the service worker is found and installing.
 * It then listens for the new worker's 'statechange' to 'installed'.
 * @param registration - The ServiceWorkerRegistration object.
 * @param updateAvailableRef - A reference object to track if an update notification has been shown.
 */
export function setupUpdateFoundListener(registration: ServiceWorkerRegistration, updateAvailableRef: { value: boolean }): void {
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        if (!updateAvailableRef.value) {
          updateAvailableRef.value = true;
          showUpdateNotification();
        }
      }
    });
  });
}

/**
 * Attempts to register the service worker as a fallback if the primary registration fails.
 * Uses a simple timestamp for cache busting.
 * @returns A Promise resolving to the ServiceWorkerRegistration or null if it fails.
 */
export async function performFallbackRegistration(): Promise<ServiceWorkerRegistration | null> {
  try {
    const timestamp = new Date().getTime();
    // Fallback uses 'Service-Worker.js' without './' and scope './' as per original logic
    const fallbackSwUrl = `Service-Worker.js?t=${timestamp}`; 
    const registration = await navigator.serviceWorker.register(fallbackSwUrl, {
      scope: './',
      updateViaCache: 'none',
    });
    console.log('سرویس ورکر با مسیر نسبی ثبت شد (fallback)');
    return registration;
  } catch (fallbackError) {
    console.error('خطای نهایی در ثبت سرویس ورکر (fallback):', fallbackError);
    return null;
  }
}

/**
 * Registers the main service worker with versioning and timestamp.
 * @param appVersion - The application version string, or null.
 * @param swFileName - The name of the service worker file (default: 'Service-Worker.js').
 * @returns A Promise resolving to the ServiceWorkerRegistration.
 */
export async function registerMainServiceWorker(appVersion: string | null, swFileName: string = 'Service-Worker.js'): Promise<ServiceWorkerRegistration> {
  const timestamp = new Date().getTime();
  const versionQueryParam = appVersion ? `v=${appVersion}&` : '';
  const swUrl = `./${swFileName}?${versionQueryParam}t=${timestamp}`;

  return navigator.serviceWorker.register(swUrl, {
    scope: '/',
    updateViaCache: 'none',
    type: 'classic',
  });
}
