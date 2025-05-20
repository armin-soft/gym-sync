// Main service worker entry point
// This file serves as the orchestrator for all service worker functionality

// Define global scope for the service worker
self.APP_VERSION = 'gym-sync';
self.CACHE_NAME = 'gym-sync-v261';
self.BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Import core modules
importScripts(
  './service-worker/config.js',
  './service-worker/utils.js',
  './service-worker/cache-strategies.js',
  './service-worker/event-handlers.js'
);

// Log initialization
console.log('[Service Worker] Initialized');

// Initialize with version from manifest when possible
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version;
    self.APP_VERSION = `gym-sync-${version}`;
    self.CACHE_NAME = `gym-sync-v${version.replace(/\./g, '')}`;
    console.log(`[Service Worker] Configuration updated with version ${version}`);
  })
  .catch(err => {
    console.log('[Service Worker] Using default version configuration');
  });

// Add navigation preload support for faster page transitions
self.addEventListener('activate', event => {
  event.waitUntil(
    (async function() {
      // Enable navigation preload if supported
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
        console.log('[Service Worker] Navigation preload enabled');
      }
      
      // Take control immediately
      await self.clients.claim();
    })()
  );
});

// Fix for navigation issues - respond faster to navigation requests
self.addEventListener('fetch', event => {
  // Only handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try using navigation preload response if available
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Otherwise use network with a fast timeout
          const networkResponse = await fetch(event.request, { 
            cache: 'no-store'
          });
          return networkResponse;
        } catch (error) {
          // If both fail, use cache
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || caches.match('./index.html');
        }
      })()
    );
  }
});
