
/**
 * Service Worker registration module
 */

import { isServiceWorkerSupported, showUpdateNotification, getAppVersion } from './helpers';

/**
 * Register the service worker
 * @returns {Promise<ServiceWorkerRegistration | null>}
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) {
    console.log('Service workers are not supported in this browser');
    return null;
  }

  try {
    // Save the current app version from manifest
    const currentVersion = getAppVersion();
    
    // Get the last known version from localStorage (if any)
    const lastKnownVersion = localStorage.getItem('last_sw_version') || '';
    
    // Store the current version in localStorage for future comparisons
    localStorage.setItem('app_version', currentVersion);
    
    // Use a simpler approach with better error handling
    const timestamp = new Date().getTime();
    
    // First try to use the service worker at the project root
    try {
      const scriptPath = `/Service-Worker.js?v=${timestamp}`;
      const registration = await navigator.serviceWorker.register(scriptPath, {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('ServiceWorker registration successful with scope:', registration.scope);
      setupServiceWorkerUpdates(registration, currentVersion, lastKnownVersion);
      window.swRegistration = registration;
      window.dispatchEvent(new CustomEvent('swRegistered', { detail: registration }));
      return registration;
    } catch (rootError) {
      console.warn('Could not register service worker at root path:', rootError);
      
      // Try with relative path as fallback
      const scriptPath = `./Service-Worker.js?v=${timestamp}`;
      const registration = await navigator.serviceWorker.register(scriptPath, {
        scope: './',
        updateViaCache: 'none'
      });
      
      console.log('ServiceWorker registration successful with relative path:', registration.scope);
      setupServiceWorkerUpdates(registration, currentVersion, lastKnownVersion);
      window.swRegistration = registration;
      window.dispatchEvent(new CustomEvent('swRegistered', { detail: registration }));
      return registration;
    }
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
    
    // Last resort attempt with minimal configuration
    try {
      // Force clear any existing registrations first
      const existingRegistrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(existingRegistrations.map(reg => reg.unregister()));
      
      // Try with the simplest possible registration
      const retryRegistration = await navigator.serviceWorker.register('./Service-Worker.js', {
        updateViaCache: 'none'
      });
      console.log('ServiceWorker registration successful on final retry');
      window.swRegistration = retryRegistration;
      return retryRegistration;
    } catch (retryError) {
      console.error('ServiceWorker registration failed on all attempts:', retryError);
      return null;
    }
  }
};

/**
 * Set up handlers for service worker updates and messages
 * @param {ServiceWorkerRegistration} registration 
 * @param {string} currentVersion Current app version
 * @param {string} lastKnownVersion Last known app version
 */
function setupServiceWorkerUpdates(registration: ServiceWorkerRegistration, currentVersion: string, lastKnownVersion: string): void {
  // Function to handle updates
  const handleServiceWorkerUpdate = () => {
    // When a new service worker is waiting to be activated
    if (registration.waiting) {
      console.log('New version available! Ready to update.');
      
      // Check if versions are different before showing notification
      if (lastKnownVersion !== currentVersion) {
        showUpdateNotification();
        localStorage.setItem('last_sw_version', currentVersion);
      } else {
        console.log('Service worker updated, but app version unchanged.');
      }
    }
    
    // When a new service worker is detected
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New version installed! Ready to update.');
          
          // Check if versions are different before showing notification
          if (lastKnownVersion !== currentVersion) {
            showUpdateNotification();
            localStorage.setItem('last_sw_version', currentVersion);
          } else {
            console.log('Service worker updated, but app version unchanged.');
          }
        }
      });
    });
  };
  
  handleServiceWorkerUpdate();
  
  // Listen for controller change events - prevent immediate refresh
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    
    // Only refresh if manual update was triggered or version changed
    const manualRefreshTriggered = localStorage.getItem('manual_refresh_triggered') === 'true';
    
    if (manualRefreshTriggered || (lastKnownVersion !== currentVersion)) {
      refreshing = true;
      console.log('Controller changed, refreshing page...');
      // Clear the manual refresh flag
      localStorage.removeItem('manual_refresh_triggered');
      window.location.reload();
    } else {
      console.log('Controller changed but version is the same, not refreshing');
    }
  });
}
