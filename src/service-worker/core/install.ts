
// Service worker installation handling

import { CACHE_NAME, getUrlsToCache } from './config';

// Install the service worker
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[Service Worker] Installing...');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    cacheInitialAssets()
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        // Continue installation even if caching fails
        return Promise.resolve();
      })
  );
});

// Function to cache initial assets
async function cacheInitialAssets(): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  const urlsToCache = getUrlsToCache();
  console.log('[Service Worker] Caching files', urlsToCache);
  
  // Cache assets one by one to avoid a single failure breaking everything
  const cachePromises = urlsToCache.map((url: string) => {
    // Fix any duplicate Assets paths
    const cleanUrl = url.replace(/Assets\/Assets\//g, 'Assets/');
    
    // Try to fetch each resource and cache it
    return fetch(new Request(cleanUrl, { cache: 'reload' }))
      .then(response => {
        if (!response || response.status !== 200) {
          console.log(`[Service Worker] Failed to cache: ${cleanUrl} - Status: ${response ? response.status : 'unknown'}`);
          return;
        }
        return cache.put(cleanUrl, response);
      })
      .catch(err => {
        console.log(`[Service Worker] Error caching ${cleanUrl}: ${err}`);
        // Continue despite errors
        return Promise.resolve();
      });
  });
  
  await Promise.all(cachePromises);
}
