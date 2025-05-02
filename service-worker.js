// This is the service worker for the application
// It handles caching and offline functionality

const CACHE_NAME = 'gym-sync-v1';

// Assets to cache - use relative paths instead of absolute
const STATIC_ASSETS = [
  './',
  './index.html',
  './Assets/Script/Main.js',
  './Assets/Style/Menu.css',
  './Assets/Image/Logo.png',
  './Manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing');
  
  // Use a more resilient caching strategy
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        // Cache assets one by one to avoid a single failure breaking everything
        const cachePromises = STATIC_ASSETS.map(url => {
          // Try to fetch each resource and cache it
          return fetch(url)
            .then(response => {
              if (!response || response.status !== 200) {
                console.log(`Failed to cache: ${url} - Status: ${response ? response.status : 'unknown'}`);
                return;
              }
              return cache.put(url, response);
            })
            .catch(err => {
              console.log(`Error caching ${url}: ${err}`);
              // Continue despite errors
              return Promise.resolve();
            });
        });
        
        return Promise.all(cachePromises);
      })
      .then(() => self.skipWaiting())
      .catch(err => {
        console.error('Service Worker: Cache error during installation', err);
        // Continue installation even if caching fails
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
  return self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and requests to external resources
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  console.log('Service Worker: Fetching', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
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
                console.error('Failed to cache response:', err);
              });

            return response;
          })
          .catch(() => {
            // For navigation requests, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('./');
            }
            
            // Otherwise return whatever we have
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
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
    console.log('Checking for updates...');
    self.registration.update();
  }
});
