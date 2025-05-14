
// Service worker implementation with enhanced offline capabilities
// This is the main service worker file that will be compiled during build

// Type declaration for ServiceWorkerGlobalScope
declare const self: ServiceWorkerGlobalScope;

// Dynamically determine the base path where the app is running
const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');
const CACHE_NAME = 'gym-sync-v12'; // Increased version to force cache refresh

// Files to cache - use relative paths that will work in any environment
const getUrlsToCache = () => {
  return [
    `${BASE_PATH}`,
    `${BASE_PATH}index.html`,
    `${BASE_PATH}Assets/Image/Logo.png`,
    `${BASE_PATH}Manifest.json`,
    `${BASE_PATH}Assets/Script/index.js`,
    `${BASE_PATH}Assets/Style/Menu.css`,
    // Add additional critical assets for offline functionality
    `${BASE_PATH}assets/index.css`,
    `${BASE_PATH}assets/index.js`,
    // Add offline fallback page
    `${BASE_PATH}offline.html`
  ];
};

// Install a service worker
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[Service Worker] Installing...', BASE_PATH);
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
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

// Enhanced cache and return requests with better offline handling
self.addEventListener('fetch', (event: FetchEvent) => {
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
          console.log('[Service Worker] Serving from cache:', cleanRequest.url);
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
                console.log('[Service Worker] Caching new resource:', cleanRequest.url);
                cache.put(cleanRequest, responseToCache);
              })
              .catch(err => {
                console.error('[Service Worker] Failed to cache response:', err);
              });

            return response;
          })
          .catch(err => {
            console.log('[Service Worker] Fetch failed', err);
            // Return offline page for navigation requests
            if (cleanRequest.mode === 'navigate') {
              return caches.match('/index.html')
                .then(indexResponse => {
                  if (indexResponse) {
                    console.log('[Service Worker] Serving offline fallback page');
                    return indexResponse;
                  }
                  // If we can't even find index.html in cache, create a simple response
                  return new Response(
                    '<html><body dir="rtl">' +
                    '<h1>برنامه در حالت آفلاین</h1>' +
                    '<p>لطفا اتصال اینترنت خود را بررسی کنید.</p>' +
                    '</body></html>', 
                    {
                      status: 200,
                      headers: { 'Content-Type': 'text/html; charset=UTF-8' }
                    }
                  );
                });
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
self.addEventListener('activate', (event: ExtendableEvent) => {
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
    }).then(() => {
      // Immediately claim clients so updated SW controls open pages
      return self.clients.claim();
    })
  );
});

// Improved message handling with periodic cache updates
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  console.log('[Service Worker] Received message', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    console.log('[Service Worker] Checking for updates');
    self.registration.update();
  }

  // Handle cache refresh requests
  if (event.data && event.data.type === 'REFRESH_CACHE') {
    console.log('[Service Worker] Refreshing cache');
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(getUrlsToCache());
      })
    );
  }
});

// Periodic background cache updates to ensure users have latest data
self.addEventListener('periodicsync', (event: any) => {
  if (event.tag === 'cache-update') {
    console.log('[Service Worker] Periodic cache update');
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(getUrlsToCache());
      })
    );
  }
});

export {};
