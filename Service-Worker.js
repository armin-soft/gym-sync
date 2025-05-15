
// Main service worker entry point that orchestrates all modules
// This file now uses simpler imports to avoid evaluation issues

// Define configuration variables
self.APP_VERSION = 'gym-sync';
self.CACHE_NAME = 'gym-sync-v17';
self.BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Files to cache - use relative paths that will work in any environment
self.STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

// Helper functions for URL handling
self.cleanRequestUrl = function(url) {
  return url.replace(/Assets\/Assets\//g, 'Assets/');
};

self.createCleanRequest = function(originalRequest) {
  const requestUrl = originalRequest.url;
  const cleanUrl = self.cleanRequestUrl(requestUrl);
  
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
};

// Service worker installation handler
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  // Skip waiting to activate immediately - only on initial install
  // self.skipWaiting(); - Removing automatic skipWaiting to prevent refreshes
  
  event.waitUntil(
    cacheInitialAssets()
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        // Continue installation even if caching fails
        return Promise.resolve();
      })
  );
});

// Function to cache initial assets
async function cacheInitialAssets() {
  const cache = await caches.open(self.CACHE_NAME);
  console.log('[Service Worker] Caching files', self.STATIC_ASSETS);
  
  // Cache assets one by one to avoid a single failure breaking everything
  const cachePromises = self.STATIC_ASSETS.map((url) => {
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
  
  await Promise.all(cachePromises);
}

// Activate the service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    cleanupOldCaches()
      .then(() => {
        // Immediately claim clients so updated SW controls open pages
        return self.clients.claim();
      })
  );
});

// Clean up old caches
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  
  await Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName !== self.CACHE_NAME) {
        console.log('[Service Worker] Deleting old cache', cacheName);
        return caches.delete(cacheName);
      }
      return Promise.resolve();
    })
  );
}

// Handle fetch events
self.addEventListener('fetch', (event) => {
  // Don't attempt to cache API requests or external resources
  if (event.request.method !== 'GET' || 
      !event.request.url.startsWith(self.location.origin) ||
      event.request.url.includes('/api/') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  // Create a clean request with fixed paths if needed
  const cleanRequest = self.createCleanRequest(event.request);

  event.respondWith(
    fetchWithCacheFallback(cleanRequest)
      .catch(err => handleFetchError(err, cleanRequest))
  );
});

// Enhanced strategy: Try cache first, then network with background cache update
async function fetchWithCacheFallback(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Return cached response if available
    if (cachedResponse) {
      // In background, update the cache if online
      updateCacheInBackground(request);
      return cachedResponse;
    }
  
    // Otherwise fetch from network
    return await fetchAndCache(request);
  }
  catch (error) {
    console.error('[Service Worker] Error in fetchWithCacheFallback:', error);
    throw error; // Re-throw for the error handler
  }
}

// Update cache in background without blocking response
function updateCacheInBackground(request) {
  fetch(request)
    .then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return;
      }
      
      const responseToCache = response.clone();
      caches.open(self.CACHE_NAME)
        .then(cache => {
          cache.put(request, responseToCache);
        })
        .catch(err => {
          console.log('[Service Worker] Failed to update cache for:', request.url, err);
        });
    })
    .catch(() => {
      // Network error, but we already have a cached version, so it's fine
      console.log('[Service Worker] Failed to fetch for cache update (offline mode)');
    });
}

// Enhanced fetch from network and cache response
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    
    // Don't cache if response is not valid
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    // Clone the response
    const responseToCache = response.clone();

    // Add to cache
    caches.open(self.CACHE_NAME)
      .then(cache => {
        cache.put(request, responseToCache);
      })
      .catch(err => {
        console.error('[Service Worker] Failed to cache response:', err);
      });

    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed for:', request.url, error);
    throw error;
  }
}

// Handle fetch errors with appropriate fallbacks
async function handleFetchError(error, request) {
  console.error('[Service Worker] Fetch failed:', error);
  
  // For navigation requests, return the offline page
  if (request.mode === 'navigate') {
    const indexResponse = await caches.match('./index.html');
    if (indexResponse) return indexResponse;
    
    // If index.html is not in cache, create a simple offline page
    return new Response(
      '<html><head><title>Offline</title></head><body><h1>Offline</h1><p>The app is currently offline.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
  
  // For other resources
  return new Response('Offline content not available');
}

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (!event.data) return;
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      console.log('[Service Worker] Skip waiting command received');
      self.skipWaiting();
      break;
    case 'CHECK_FOR_UPDATES':
      if (self.registration) {
        self.registration.update();
      }
      break;
    case 'REFRESH_CACHE':
      console.log('[Service Worker] Refreshing cache on request');
      cacheInitialAssets();
      break;
    default:
      console.log(`[Service Worker] Unhandled message type: ${event.data.type}`);
  }
});

// Initialize with version from manifest when possible
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version || '1.0.0';
    self.APP_VERSION = `gym-sync-${version}`;
    self.CACHE_NAME = `gym-sync-v${version.replace(/\./g, '')}`;
    console.log(`[Service Worker] Initialized with version ${version}`);
  })
  .catch(err => {
    console.log('[Service Worker] Initialization continuing with default version');
  });
