
// Service Worker with proper caching strategy
const CACHE_NAME = 'gym-sync-cache-v1';
const RUNTIME = 'runtime';

// Get the base path for the app - important for subdirectory deployments
self.addEventListener('install', event => {
  // Determine base path from service worker scope
  const basePath = new URL(self.registration.scope).pathname;

  // Assets to pre-cache, adjusted for the base path
  const PRECACHE_ASSETS = [
    './',
    './index.html',
    './Assets/Manifest.json',
    './Assets/Styles/index.css',
    './Assets/Scripts/Main.js',
    './Assets/Scripts/React.js',
    './Assets/Scripts/Animation.js',
    './Assets/Scripts/Charts.js',
    './Assets/Scripts/PDF.js',
    './Assets/Scripts/UI.js'
  ];

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(PRECACHE_ASSETS.map(url => {
          return new URL(url, self.registration.scope).href;
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
