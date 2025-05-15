
import { showUpdateNotification } from './notification.js';

// Handle service worker updates
export function handleServiceWorkerUpdate(registration, currentVersion, lastKnownVersion) {
  function checkForUpdates() {
    // Check for updates when the page loads
    navigator.serviceWorker.ready.then(registration => {
      registration.update().catch(err => {
        console.error('Service worker update failed:', err);
      });
    });
    
    // When a new service worker is waiting to be activated
    if (registration.waiting) {
      console.log('New version available! Ready to update.');
      
      // Only show notification if versions are different
      if (lastKnownVersion !== currentVersion) {
        showUpdateNotification(currentVersion);
        localStorage.setItem('last_sw_version', currentVersion);
      }
    }
    
    // When a new service worker is detected
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New version installed! Ready to update.');
          
          // Only show notification if versions are different
          if (lastKnownVersion !== currentVersion) {
            showUpdateNotification(currentVersion);
            localStorage.setItem('last_sw_version', currentVersion);
          }
        }
      });
    });
  }
  
  checkForUpdates();
}
