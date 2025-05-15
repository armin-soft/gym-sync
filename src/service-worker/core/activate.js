
// Service worker activation handling

import { CACHE_NAME } from './config.js';

// Activate the service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated v1.7.8');
  
  // Clean up old caches
  event.waitUntil(
    cleanupOldCaches()
      .then(() => {
        // Claim clients so the SW controls open pages
        return self.clients.claim();
      })
  );
});

// Clean up old caches
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        console.log('[Service Worker] Clearing Old Cache:', cacheName);
        return caches.delete(cacheName);
      }
      return Promise.resolve();
    })
  );
}

// Make function available in the global scope
// @ts-ignore
self.cleanupOldCaches = cleanupOldCaches;
