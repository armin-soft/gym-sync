
// Service worker message event handling

import { CACHE_NAME, STATIC_ASSETS } from './config.js';

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (!event.data) return;
  
  console.log('[Service Worker] Received message', event.data);
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      console.log('[Service Worker] Skip waiting command received');
      self.skipWaiting();
      break;
      
    case 'CHECK_FOR_UPDATES':
      console.log('[Service Worker] Checking for updates');
      if (self.registration) {
        self.registration.update();
      }
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
async function refreshCache() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(STATIC_ASSETS);
  console.log('[Service Worker] Cache refreshed');
}

