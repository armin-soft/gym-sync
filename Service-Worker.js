// This is the service worker for the application
// It handles caching and offline functionality

const CACHE_NAME = 'gym-sync-v3';

// Assets to cache - use relative paths instead of absolute
const STATIC_ASSETS = [
  './',
  './index.html',
  './Manifest.json',
  './Assets/Image/Logo.png',
  './Assets/Script/index.js',
  './Assets/Style/Menu.css'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  // Use a more resilient caching strategy
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching Files');
        return cache.addAll(STATIC_ASSETS).catch(err => {
          console.error('[Service Worker] Failed to cache all resources:', err);
          
          // If bulk caching fails, try individual items
          return Promise.all(
            STATIC_ASSETS.map(url => 
              fetch(new Request(url, { cache: 'reload' }))
                .then(response => {
                  if (!response || response.status !== 200) {
                    console.log(`[Service Worker] Failed to cache: ${url} - Status: ${response ? response.status : 'unknown'}`);
                    return;
                  }
                  return cache.put(url, response);
                })
                .catch(err => {
                  console.log(`[Service Worker] Error caching ${url}: ${err}`);
                  // Continue despite errors
                  return Promise.resolve();
                })
            )
          );
        });
      })
      .catch(err => {
        console.error('[Service Worker] Cache error during installation', err);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache');
            return caches.delete(cache);
          }
          return Promise.resolve();
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and requests to external resources
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip analytics, API calls, etc.
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('analytics') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  console.log('[Service Worker] Fetching', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
          // In background, update the cache
          fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return;
              }
              
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                })
                .catch(err => {
                  console.log('[Service Worker] Failed to update cache for:', event.request.url, err);
                });
            })
            .catch(() => {
              // Network error, but we already have a cached version, so it's fine
            });
            
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache if response is not valid
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => {
                console.error('[Service Worker] Failed to cache response:', err);
              });

            return response;
          })
          .catch(() => {
            // For navigation requests, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('./');
            }
            
            // Otherwise return error response
            return new Response('خطا در اتصال به شبکه. برنامه در حالت آفلاین است.', {
              status: 408,
              headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
            });
          });
      })
      .catch(error => {
        console.error('[Service Worker] Error in fetch handler:', error);
        return new Response('خطای سرویس ورکر', {
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
        });
      })
  );
});

// Listen for messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    console.log('[Service Worker] Checking for updates...');
    self.registration.update();
  }
});
