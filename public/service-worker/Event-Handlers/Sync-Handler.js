
// Service Worker Sync Handler

// Handle periodic sync events
export function registerSyncHandler() {
  // Set up periodic sync if supported
  if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', (event) => {
      if (event.tag === 'cache-update') {
        console.log('[Service Worker] Periodic cache update');
        event.waitUntil(self.cacheInitialAssets());
      }
    });
  }
}

console.log('[Service Worker] Sync handler module loaded');
