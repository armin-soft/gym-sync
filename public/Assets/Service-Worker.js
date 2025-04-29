
// Service Worker with automatic update strategy
const CACHE_NAME = 'gym-sync-cache-v1.0.5';
const RUNTIME = 'runtime';

// Check for updates every hour (in milliseconds)
const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour

// Get the base path for the app - important for subdirectory deployments
self.addEventListener('install', event => {
  // Assets to pre-cache, adjusted for any base path
  const PRECACHE_ASSETS = [
    './',
    './index.html',
    './Assets/Manifest.json',
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
        // Get the scope - this handles any deployment path
        const baseUrl = self.registration.scope;
        return cache.addAll(PRECACHE_ASSETS.map(url => {
          // Ensure we don't double up on slashes
          return new URL(url.replace(/^\.\//, ''), baseUrl).href;
        }));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches and take control immediately
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        console.log('Deleting old cache:', cacheToDelete);
        return caches.delete(cacheToDelete);
      }));
    }).then(() => {
      console.log('Service Worker activated and controlling the page');
      return self.clients.claim();
    })
  );
});

// Fetch event - network first with fallback to cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If we got a valid response, clone it and update the cache
          if (response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(RUNTIME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fetch fails, try to serve from cache
          return caches.match(event.request);
        })
    );
  }
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    console.log('Checking for application updates...');
    self.registration.update();
  } else if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Set up periodic update checks
setInterval(() => {
  self.registration.update()
    .then(() => {
      console.log('Update check completed');
    })
    .catch(error => {
      console.error('Update check failed:', error);
    });
}, UPDATE_CHECK_INTERVAL);
