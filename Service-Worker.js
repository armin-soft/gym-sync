
// Main service worker file with enhanced offline functionality

// Log service worker initialization
console.log('[Service Worker] Starting Service Worker');

// Cache configuration - updated version to force refresh
const CACHE_NAME = 'gym-sync-v14';

// Define base path for assets
const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Update the static assets list with critical files
const STATIC_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './Assets/Script/index.js',
  './Assets/Style/Menu.css',
  './assets/index.css',
  './assets/index.js'
];

// Install event with improved error handling
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing');
  
  // Force activation for immediate control
  self.skipWaiting();
  
  // Cache static assets with better error handling
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching Files');
      
      // Try bulk caching
      return cache.addAll(STATIC_ASSETS)
        .catch(bulkError => {
          console.error('[Service Worker] Bulk caching failed:', bulkError);
          
          // Fall back to individual caching if bulk fails
          return Promise.all(STATIC_ASSETS.map(url => 
            fetch(url, { cache: 'reload' })
              .then(response => {
                if (response.ok) return cache.put(url, response);
              })
              .catch(err => console.log('[SW] Failed to cache:', url, err))
          ));
        });
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim clients so the SW controls open pages
      return self.clients.claim();
    })
  );
});

// Function to create a clean request object if needed
function createCleanRequest(originalRequest) {
  const requestUrl = originalRequest.url;
  const cleanUrl = requestUrl.replace(/Assets\/Assets\//g, 'Assets/');
  
  if (cleanUrl !== requestUrl) {
    console.log('[Service Worker] Fixed duplicate path:', cleanUrl);
    return new Request(cleanUrl, {
      method: originalRequest.method,
      headers: originalRequest.headers,
      mode: originalRequest.mode,
      credentials: originalRequest.credentials
    });
  }
  
  return originalRequest;
}

// Enhanced fetch event with better offline fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
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

  // Create a clean request with fixed paths if needed
  const cleanRequest = createCleanRequest(event.request);
  
  event.respondWith(
    caches.match(cleanRequest).then((cachedResponse) => {
      if (cachedResponse) {
        // Update cache in background
        fetch(cleanRequest).then(response => {
          if (!response || response.status !== 200) return;
          
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(cleanRequest, responseToCache);
          });
        }).catch(() => {});
        
        return cachedResponse;
      }
      
      // If not in cache, fetch from network
      return fetch(cleanRequest)
        .then(response => {
          // Don't cache if response is not valid
          if (!response || response.status !== 200) {
            return response;
          }
          
          const responseToCache = response.clone();
          
          // Add to cache
          caches.open(CACHE_NAME).then(cache => {
            cache.put(cleanRequest, responseToCache);
          });
          
          return response;
        })
        .catch((error) => {
          console.error('[Service Worker] Fetch failed:', error);
          
          // For navigation requests, return the offline page
          if (cleanRequest.mode === 'navigate') {
            return caches.match('./offline.html')
              .then(response => {
                if (response) return response;
                
                // If offline.html is not in cache, create a simple offline page
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
          
          // For other resources
          return new Response('آفلاین - داده در دسترس نیست', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
          });
        });
    })
  );
});

// Enhanced message event handling
self.addEventListener('message', (event) => {
  if (!event.data) return;
  
  if (event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skip waiting command received');
    self.skipWaiting();
  }
  
  if (event.data.type === 'REFRESH_CACHE') {
    console.log('[Service Worker] Refreshing cache');
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    });
  }
});

// Periodic sync event (supports background sync when browser is closed)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[Service Worker] Performing periodic sync');
    event.waitUntil(syncData());
  }
});

// Function to sync data when online
async function syncData() {
  console.log('[Service Worker] Syncing data');
  
  // Here we would normally sync pending changes with the server
  // For now we just refresh the cached assets
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(STATIC_ASSETS.map(url => 
    fetch(url, { cache: 'reload' })
      .then(response => {
        if (response.ok) return cache.put(url, response);
      })
      .catch(err => console.log('[SW] Failed to refresh cache during sync:', url, err))
  ));
}
