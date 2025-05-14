
// Periodic background sync for service worker

import { CACHE_NAME, getUrlsToCache } from './config';

// Periodic background cache updates to ensure users have latest data
self.addEventListener('periodicsync', (event: any) => {
  if (event.tag === 'cache-update') {
    console.log('[Service Worker] Periodic cache update');
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(getUrlsToCache());
      })
    );
  }
});
