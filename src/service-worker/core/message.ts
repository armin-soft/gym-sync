
// Service worker message event handling

import { CACHE_NAME, getUrlsToCache } from './config';

// Handle messages from clients
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  console.log('[Service Worker] Received message', event.data);
  
  if (!event.data) return;
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      console.log('[Service Worker] Skipping waiting');
      self.skipWaiting();
      break;
      
    case 'CHECK_FOR_UPDATES':
      console.log('[Service Worker] Checking for updates');
      self.registration.update();
      break;

    case 'REFRESH_CACHE':
      console.log('[Service Worker] Refreshing cache');
      event.waitUntil(refreshCache());
      break;
      
    default:
      console.log('[Service Worker] Unhandled message type:', event.data.type);
      break;
  }
});

// Refresh cache with latest assets
async function refreshCache(): Promise<void> {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(getUrlsToCache());
  console.log('[Service Worker] Cache refreshed');
}
