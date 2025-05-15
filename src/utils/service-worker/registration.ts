
/**
 * Service Worker registration module
 */

import { isServiceWorkerSupported, showUpdateNotification } from './helpers';

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
    // Use the Service-Worker.js file from the root directory (simpler approach)
    const scriptPath = './Service-Worker.js';
    
    // Add timestamp to force new service worker
    const timestamp = new Date().getTime();
    const cacheBustedPath = `${scriptPath}?v=${timestamp}`;
    
    // Register the service worker
    const registration = await navigator.serviceWorker.register(cacheBustedPath, {
      scope: './'
    });
    
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
    
    // Try once more after a short delay with a simpler approach
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const retryRegistration = await navigator.serviceWorker.register('./Service-Worker.js');
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
}
