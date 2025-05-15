
// Main entry point for service worker registration
import { registerServiceWorker } from './register-worker.js';
import { setupOfflineDetection } from './offline-detection.js';

// Register the service worker when the page loads
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Get app version from manifest
    fetch('./Manifest.json')
      .then(response => response.json())
      .then(manifestData => {
        registerServiceWorker(manifestData);
      })
      .catch(error => {
        console.error('Failed to fetch manifest:', error);
        // Register anyway with default values
        registerServiceWorker({ version: '1.0.0' });
      });
  });
  
  // Check for updates more frequently (every 5 minutes)
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CHECK_FOR_UPDATES'
      });
    }
  }, 5 * 60 * 1000); // 5 minutes
  
  // Add refresh cache capability every 30 minutes to ensure fresh data
  setInterval(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'REFRESH_CACHE'
      });
    }
  }, 30 * 60 * 1000); // 30 minutes
}

// Set up offline detection
setupOfflineDetection();
