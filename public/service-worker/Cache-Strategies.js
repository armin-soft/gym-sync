// Service Worker Cache Strategies
// Contains functions for caching and retrieval strategies

// Function to cache initial assets
self.cacheInitialAssets = async function() {
  try {
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
  } catch (err) {
    console.error('[Service Worker] Cache error during installation', err);
    return Promise.resolve(); // Continue installation even if caching fails
  }
};

// Clean up old caches
self.cleanupOldCaches = async function() {
  const cacheNames = await caches.keys();
  
  await Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName !== self.CACHE_NAME) {
        console.log('[Service Worker] Deleting old cache', cacheName);
        return caches.delete(cacheName);
      }
      return Promise.resolve();
    })
  );
};

// Enhanced strategy: Try cache first, then network with background cache update
self.fetchWithCacheFallback = async function(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Return cached response if available
    if (cachedResponse) {
      // In background, update the cache if online
      self.updateCacheInBackground(request);
      return cachedResponse;
    }
  
    // Otherwise fetch from network
    return await self.fetchAndCache(request);
  }
  catch (error) {
    console.error('[Service Worker] Error in fetchWithCacheFallback:', error);
    throw error; // Re-throw for the error handler
  }
};

// Update cache in background without blocking response
self.updateCacheInBackground = function(request) {
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
};

// Enhanced fetch from network and cache response
self.fetchAndCache = async function(request) {
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
};

console.log('[Service Worker] Cache strategies module loaded');
