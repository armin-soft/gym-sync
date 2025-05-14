
// Service worker activation handling

import { CACHE_NAME } from './config';

// Activate the service worker
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    cleanupOldCaches()
      .then(() => {
        // Immediately claim clients so updated SW controls open pages
        return self.clients.claim();
      })
  );
});

// Clean up old caches
async function cleanupOldCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  
  await Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        console.log('[Service Worker] Deleting old cache', cacheName);
        return caches.delete(cacheName);
      }
      return Promise.resolve();
    })
  );
}
