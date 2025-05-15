
// Service Worker registration script

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

// Main function to register the service worker
function registerServiceWorker(manifestData) {
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

// Clear caches to ensure fresh version
function clearCaches() {
  if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        if (cacheName.includes('gym-sync')) {
          console.log('Clearing cache:', cacheName);
          caches.delete(cacheName);
        }
      });
    }).catch(err => console.error('Error clearing caches:', err));
  }
}

// Handle service worker updates
function handleServiceWorkerUpdate(registration, currentVersion, lastKnownVersion) {
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

// Show update notification with version
function showUpdateNotification(version) {
  // Simple notification implementation
  if (typeof window.showToast === 'function') {
    window.showToast({
      title: 'بروزرسانی جدید',
      description: `نسخه ${version} برنامه در دسترس است. برای اعمال تغییرات، صفحه را بروزرسانی کنید.`,
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
    if (confirm(`نسخه ${version} برنامه در دسترس است. می‌خواهید صفحه را بروزرسانی کنید؟`)) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SKIP_WAITING'
        });
      }
    }
  }
}

// Set up offline detection
setupOfflineDetection();

// Add offline detection and notification
function setupOfflineDetection() {
  window.addEventListener('online', () => {
    console.log('Application is online');
    document.body.classList.remove('offline-mode');
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
    console.log('Application is offline');
    document.body.classList.add('offline-mode');
    if (typeof window.showToast === 'function') {
      window.showToast({
        title: 'حالت آفلاین',
        description: 'شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.',
        variant: 'warning',
        duration: 5000
      });
    }
  });
}
