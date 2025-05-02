
// Service worker implementation
// This is the main service worker file that will be compiled during build

// Dynamically determine the base path where the app is running
const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');
const CACHE_NAME = 'app-cache-v2';

// Files to cache - use relative paths that will work in any environment
const getUrlsToCache = () => {
  const basePath = BASE_PATH;
  return [
    `${basePath}`,
    `${basePath}index.html`,
    `${basePath}Assets/Image/Logo.png`,
    `${basePath}Manifest.json`, // Single Manifest.json at root
    `${basePath}Assets/Script/Main.js`,
    `${basePath}Assets/Style/Menu.css`,
  ];
};

// Install a service worker
self.addEventListener('install', (event: any) => {
  console.log('Service Worker: Installing...', BASE_PATH);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        const urlsToCache = getUrlsToCache();
        console.log('Service Worker: Caching files', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', (event: any) => {
  // Don't attempt to cache API requests or external resources
  if (event.request.url.includes('/api/') || 
      !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request - request can only be used once
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response - response can only be used once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(err => {
            console.log('Service Worker: Fetch failed', err);
            // You might want to return a custom offline page here
          });
      })
  );
});

// Update a service worker
self.addEventListener('activate', (event: any) => {
  console.log('Service Worker: Activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  // Immediately claim clients so updated SW controls open pages
  event.waitUntil((self as any).clients.claim());
});

// Handle messages from clients
self.addEventListener('message', (event: any) => {
  console.log('Service Worker: Received message', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service Worker: Skipping waiting');
    (self as any).skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    console.log('Service Worker: Checking for updates');
    (self as any).registration.update();
  }
});

export {};
