// Service worker cache strategies implementation

import * as logger from '../utils/logger.js';

// Enhanced strategy: Try cache first, then network with background cache update
export async function fetchWithCacheFallback(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Return cached response if available
    if (cachedResponse) {
      // In background, update the cache if online
      updateCacheInBackground(request, cacheName);
      return cachedResponse;
    }
  
    // Otherwise fetch from network
    return await fetchAndCache(request, cacheName);
  }
  catch (error) {
    logger.error('Error in fetchWithCacheFallback:', error);
    throw error; // Re-throw for the error handler
  }
}

// Update cache in background without blocking response
export function updateCacheInBackground(request, cacheName) {
  fetch(request)
    .then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return;
      }
      
      const responseToCache = response.clone();
      caches.open(cacheName)
        .then(cache => {
          cache.put(request, responseToCache);
        })
        .catch(err => {
          logger.warn(`Failed to update cache for: ${request.url}`, err);
        });
    })
    .catch(() => {
      // Network error, but we already have a cached version, so it's fine
      logger.debug('Failed to fetch for cache update (offline mode)');
    });
}

// Enhanced fetch from network and cache response
export async function fetchAndCache(request, cacheName) {
  try {
    const response = await fetch(request);
    
    // Don't cache if response is not valid
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    // Clone the response
    const responseToCache = response.clone();

    // Add to cache
    caches.open(cacheName)
      .then(cache => {
        cache.put(request, responseToCache);
      })
      .catch(err => {
        logger.error('Failed to cache response:', err);
      });

    return response;
  } catch (error) {
    logger.error(`Fetch failed for: ${request.url}`, error);
    throw error;
  }
}
