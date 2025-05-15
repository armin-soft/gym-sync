
import { clearCaches } from './cache-utils.js';
import { handleServiceWorkerUpdate } from './update-handler.js';
import { showToast } from './notification.js';

// Main function to register the service worker
export function registerServiceWorker(manifestData) {
  const currentVersion = manifestData.version || '1.8.0';
  const lastKnownVersion = localStorage.getItem('last_sw_version') || currentVersion;
  
  // Add timestamp to force new service worker
  const timestamp = new Date().getTime();
  // Always use relative path for service worker with cache busting
  const scriptPath = './Service-Worker.js?v=' + timestamp;
  
  // Clear caches before registering to ensure fresh version
  clearCaches();
  
  // Register the service worker with improved error handling
  navigator.serviceWorker.register(scriptPath)
    .then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // Handle service worker updates
      handleServiceWorkerUpdate(registration, currentVersion, lastKnownVersion);
      
      // Save registration to make it available throughout the app
      window.swRegistration = registration;
      
      // Dispatch event to notify React app that service worker is ready
      window.dispatchEvent(new CustomEvent('swRegistered', { detail: registration }));
    })
    .catch(function(err) {
      // Registration failed
      console.error('ServiceWorker registration failed: ', err);
      
      // Try again once after a short delay
      setTimeout(() => {
        navigator.serviceWorker.register(scriptPath)
          .then(reg => {
            console.log('ServiceWorker registration successful on retry');
            window.swRegistration = reg;
            window.dispatchEvent(new CustomEvent('swRegistered', { detail: reg }));
          })
          .catch(err => console.error('ServiceWorker registration failed on retry:', err));
      }, 3000);
    });
    
  // Listen for controller change events
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    console.log('Controller changed, refreshing page...');
    window.location.reload();
  });
}
