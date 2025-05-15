
// Periodic background sync for service worker

import { CACHE_NAME, STATIC_ASSETS } from './config.js';

// Periodic background cache updates to ensure users have latest data
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[Service Worker] Performing periodic sync');
    event.waitUntil(syncData());
  }
});

// Function to sync data when online
async function syncData() {
  console.log('[Service Worker] Syncing data');
  
  // Here we would normally sync pending changes with the server
  // For now we just refresh the cached assets
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(STATIC_ASSETS.map(url => 
    fetch(url, { cache: 'reload' })
      .then(response => {
        if (response.ok) return cache.put(url, response);
      })
      .catch(err => console.log('[SW] Failed to refresh cache during sync:', url, err))
  ));
}

