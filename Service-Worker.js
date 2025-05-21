
// Simple service worker for Progressive Web App functionality

// Cache name with version - will be dynamically determined
let CACHE_NAME = 'gym-sync-cache-v1';

// Essential files to cache for offline functionality
const STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

// Get version from manifest and set cache name
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version || '1.0.0';
    CACHE_NAME = `gym-sync-v${version.replace(/\./g, '')}`;
    console.log(`[Service Worker] Using version ${version} (Cache: ${CACHE_NAME})`);
  })
  .catch(err => {
    console.log('[Service Worker] Failed to fetch version from manifest');
  });

// Install service worker - cache essential files
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing');
  
  // Force waiting service worker to become active
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching essential files');
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Activate service worker - clean old caches and take control
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating');
  
  event.waitUntil(
    Promise.all([
      // Remove old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('gym-sync-')) {
              console.log('[Service Worker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});

// Simple network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Don't attempt to handle API requests or external resources
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.url.includes('/api/')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response to store in cache
        const responseToCache = response.clone();
        
        // Only cache valid responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        
        return response;
      })
      .catch(async () => {
        // When network fails, use cache
        const cachedResponse = await caches.match(event.request);
        
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // For navigation requests (HTML pages), return index.html as fallback
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        
        // For images, return a placeholder
        if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          return caches.match('./Assets/Image/Place-Holder.svg');
        }
        
        // Return simple offline response for other resources
        return new Response('Offline - Resource not available', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});

// Handle update messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
