
// Service Worker Installation Handler

// Handle the install event
export function registerInstallHandler() {
  self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    // Force activation
    self.skipWaiting();
    
    event.waitUntil(
      self.cacheInitialAssets()
        .catch(error => {
          console.error('[Service Worker] Cache failed', error);
          // Continue installation even if caching fails
          return Promise.resolve();
        })
    );
  });
}

console.log('[Service Worker] Install handler module loaded');
