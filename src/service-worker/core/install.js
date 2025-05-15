
// Service worker installation handling

import { CACHE_NAME, STATIC_ASSETS } from './config.js';

// Install the service worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing v1.7.8');
  
  // Force activation for immediate control
  self.skipWaiting();
  
  event.waitUntil(
    cacheStaticAssets()
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        // Continue installation even if caching fails
        return Promise.resolve();
      })
  );
});

// Function to cache initial assets
async function cacheStaticAssets() {
  const cache = await caches.open(CACHE_NAME);
  console.log('[Service Worker] Caching Files');
  
  // Try bulk caching
  return cache.addAll(STATIC_ASSETS)
    .catch(bulkError => {
      console.error('[Service Worker] Bulk caching failed:', bulkError);
      
      // Fall back to individual caching if bulk fails
      return Promise.all(STATIC_ASSETS.map(url => 
        fetch(url, { cache: 'reload' })
          .then(response => {
            if (response.ok) return cache.put(url, response);
          })
          .catch(err => console.log('[SW] Failed to cache:', url, err))
      ));
    });
}

// Make function available in the global scope
// @ts-ignore
self.cacheStaticAssets = cacheStaticAssets;
