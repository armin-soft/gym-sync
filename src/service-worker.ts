
// Service worker implementation
// This is the main service worker file that will be compiled during build

// Dynamically determine the base path where the app is running
const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');
const CACHE_NAME = 'app-cache-v7';

// Files to cache - use relative paths that will work in any environment
const getUrlsToCache = () => {
  return [
    `${BASE_PATH}`,
    `${BASE_PATH}index.html`,
    `${BASE_PATH}Assets/Image/Logo.png`,
    `${BASE_PATH}Manifest.json`,
    `${BASE_PATH}Assets/Script/index.js`,
    `${BASE_PATH}Assets/Style/Menu.css`,
  ];
};

// Install a service worker
self.addEventListener('install', (event: any) => {
  console.log('[Service Worker] Installing...', BASE_PATH);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
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
        
        return Promise.all(cachePromises);
      })
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        // Continue installation even if caching fails
        return Promise.resolve();
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

  // Fix duplicate paths in URLs
  let requestUrl = event.request.url;
  const duplicatePattern = /Assets\/Assets\//g;
  
  if (duplicatePattern.test(requestUrl)) {
    // Replace duplicate segments
    requestUrl = requestUrl.replace(duplicatePattern, 'Assets/');
    console.log('[Service Worker] Fixed duplicate path:', requestUrl);
  }
  
  // Create a new request with the fixed URL if needed
  const cleanRequest = requestUrl !== event.request.url ? 
    new Request(requestUrl, { 
      method: event.request.method,
      headers: event.request.headers,
      mode: event.request.mode,
      credentials: event.request.credentials
    }) : event.request;

  event.respondWith(
    caches.match(cleanRequest)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request - request can only be used once
        const fetchRequest = cleanRequest.clone();
        
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
                cache.put(cleanRequest, responseToCache);
              })
              .catch(err => {
                console.error('[Service Worker] Failed to cache response:', err);
              });

            return response;
          })
          .catch(err => {
            console.log('[Service Worker] Fetch failed', err);
            // You might want to return a custom offline page here
            if (cleanRequest.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('خطا در اتصال به شبکه', {
              status: 408,
              headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
            });
          });
      })
  );
});

// Update a service worker
self.addEventListener('activate', (event: any) => {
  console.log('[Service Worker] Activating...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deleting old cache', cacheName);
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
  console.log('[Service Worker] Received message', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting');
    (self as any).skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    console.log('[Service Worker] Checking for updates');
    (self as any).registration.update();
  }
});

export {};
