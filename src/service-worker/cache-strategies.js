
import { CACHE_NAME } from './cache-config.js';

// Function to cache all static assets during installation
export async function cacheStaticAssets(assets) {
  try {
    const cache = await caches.open(CACHE_NAME);
    console.log('[Service Worker] Caching Files');
    
    // Try bulk caching first
    try {
      return await cache.addAll(assets);
    } catch (bulkError) {
      console.error('[Service Worker] Failed to cache all resources:', bulkError);
      
      // If bulk caching fails, try individual items
      return Promise.all(
        assets.map(url => 
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
    }
  } catch (err) {
    console.error('[Service Worker] Cache error during installation', err);
    return Promise.resolve(); // Continue installation even if caching fails
  }
}

// Function to clean up old caches
export async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        console.log('[Service Worker] Clearing Old Cache:', cacheName);
        return caches.delete(cacheName);
      }
      return Promise.resolve();
    })
  );
}

// Utility function to fix URL paths with duplicates (Assets/Assets)
export function cleanRequestUrl(url) {
  const duplicatePattern = /Assets\/Assets\//g;
  
  if (duplicatePattern.test(url)) {
    // Replace duplicate segments
    return url.replace(duplicatePattern, 'Assets/');
  }
  
  return url;
}

// Create a clean request object if needed
export function createCleanRequest(originalRequest) {
  const requestUrl = originalRequest.url;
  const cleanUrl = cleanRequestUrl(requestUrl);
  
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
