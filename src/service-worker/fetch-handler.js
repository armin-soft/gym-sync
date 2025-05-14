
import { CACHE_NAME } from './cache-config.js';
import { createCleanRequest } from './cache-strategies.js';

// Handle fetch events for the service worker
export function handleFetch(event) {
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
  console.log('[Service Worker] Fetching', cleanRequest.url);
  
  event.respondWith(
    fetchWithCacheFallback(cleanRequest)
      .catch(error => {
        console.error('[Service Worker] Error in fetch handler:', error);
        return new Response('خطای سرویس ورکر', {
          status: 500,
          headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
        });
      })
  );
}

// Strategy: Try cache first, then network with background cache update
async function fetchWithCacheFallback(request) {
  const cachedResponse = await caches.match(request);
  
  // Return cached response if available
  if (cachedResponse) {
    // In background, update the cache
    updateCacheInBackground(request);
    return cachedResponse;
  }

  // Otherwise fetch from network
  return fetchAndCache(request);
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
    });
}

// Fetch from network and cache response
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
    // For navigation requests, return the offline page
    if (request.mode === 'navigate') {
      return caches.match('./');
    }
    
    // Otherwise return error response
    return new Response('خطا در اتصال به شبکه. برنامه در حالت آفلاین است.', {
      status: 408,
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
    });
  }
}

// Make sure function is available in the global scope for Service-Worker.js
// @ts-ignore
self.handleFetch = handleFetch;
