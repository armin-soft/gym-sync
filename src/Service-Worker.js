
// Service Worker with proper caching strategy
const CACHE_NAME = 'gym-sync-cache-v1';
const RUNTIME = 'runtime';

// Install event - precache assets with dynamic base path detection
self.addEventListener('install', event => {
  const PRECACHE_ASSETS = [
    './',
    './index.html',
    './Manifest.json',
    './Assets/Image/Pattern.svg',
    './Assets/Image/Place-Holder.svg',
    './Assets/Image/C-32.png',
    './Assets/Image/Logo.png'
  ];

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Get the scope - this handles any deployment path
        const baseUrl = self.registration.scope;
        // Add all assets with the correct base path
        return cache.addAll(PRECACHE_ASSETS.map(url => {
          // Ensure we don't double up on slashes
          return new URL(url.replace(/^\.\//, ''), baseUrl).href;
        }));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first strategy
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
