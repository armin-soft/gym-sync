// Service worker fetch event handling

import { CACHE_NAME } from './config.js';

// Handle fetch events
self.addEventListener('fetch', (event) => {
  // Don't attempt to cache API requests or external resources
  if (event.request.url.includes('/api/') || 
      !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Create a clean request with fixed paths if needed
  const cleanRequest = createCleanRequest(event.request);

  event.respondWith(
    fetchWithCacheFallback(cleanRequest)
      .catch(err => handleFetchError(err, cleanRequest))
  );
});

// Create a clean request object if needed
function createCleanRequest(originalRequest) {
  const requestUrl = originalRequest.url;
  // Fix duplicate Assets paths
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
      caches.open(CACHE_NAME)
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
    caches.open(CACHE_NAME)
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
