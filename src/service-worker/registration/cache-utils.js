
// Cache utilities for service worker

// Clear caches to ensure fresh version
export function clearCaches() {
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
