
// This is a simplified service worker
const CACHE_NAME = 'app-cache-v1';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/public/Assets/Image/Logo.png',
  '/public/Assets/Manifest.json',
  '/public/Assets/Script/Main.js',
  '/public/Assets/Style/Menu.css',
];

// Install a service worker
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

// Handle messages from clients
self.addEventListener('message', (event: any) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
  }
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    (self as any).registration.update();
  }
});

export {};
