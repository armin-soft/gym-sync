
/**
 * Service Worker registration module
 */

import { isServiceWorkerSupported, showUpdateNotification } from './helpers';
import manifestData from '@/Manifest.json';

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
    const currentVersion = manifestData.version || '1.8.0';
    
    // Get the last known version from localStorage (if any)
    const lastKnownVersion = localStorage.getItem('last_sw_version') || '';
    
    // Store the current version in localStorage for future comparisons
    localStorage.setItem('app_version', currentVersion);
    
    // Use the Service-Worker.js file from the root directory with a timestamp to prevent caching
    const timestamp = new Date().getTime();
    const scriptPath = `./Service-Worker.js?v=${timestamp}`;
    
    // Check if a service worker is already active
    const existingRegistration = await navigator.serviceWorker.getRegistration();
    
    // Only register a new service worker if one doesn't exist or the version has changed
    if (!existingRegistration || lastKnownVersion !== currentVersion) {
      // Register the service worker
      const registration = await navigator.serviceWorker.register(scriptPath, {
        scope: './',
        updateViaCache: 'none'
      });
      
      console.log('ServiceWorker registration successful with scope:', registration.scope);
      
      // Set up update handling with version check
      setupServiceWorkerUpdates(registration, currentVersion, lastKnownVersion);
      
      // Save registration to make it available throughout the app
      window.swRegistration = registration;
      
      // Notify React app that service worker is ready
      window.dispatchEvent(new CustomEvent('swRegistered', { detail: registration }));
      
      return registration;
    } else {
      console.log('Using existing service worker registration');
      window.swRegistration = existingRegistration;
      return existingRegistration;
    }
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
    
    // Try once more with a simpler approach (absolute path)
    try {
      // Force clear any existing registrations first
      const existingRegistrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(existingRegistrations.map(reg => reg.unregister()));
      
      // Try to register with absolute path
      const retryRegistration = await navigator.serviceWorker.register('/Service-Worker.js');
      console.log('ServiceWorker registration successful on retry');
      window.swRegistration = retryRegistration;
      return retryRegistration;
    } catch (retryError) {
      console.error('ServiceWorker registration failed on retry:', retryError);
      
      // One final attempt with a different path
      try {
        const finalRegistration = await navigator.serviceWorker.register('./Assets/Script/ServiceWorker.js');
        console.log('ServiceWorker registration successful with alternate path');
        window.swRegistration = finalRegistration;
        return finalRegistration;
      } catch (finalError) {
        console.error('All ServiceWorker registration attempts failed');
        return null;
      }
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
  // Only refresh if we have an actual version update
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    
    // Only refresh the page if the version has actually changed
    if (lastKnownVersion !== currentVersion) {
      refreshing = true;
      console.log('Controller changed, refreshing page...');
      window.location.reload();
    } else {
      console.log('Controller changed but version is the same, not refreshing');
    }
  });
}
