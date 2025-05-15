// Cache management functions for service worker

// Function to cache initial assets
self.cacheStaticAssets = async function() {
  try {
    const cache = await caches.open(self.CACHE_NAME);
    console.log('[Service Worker] Caching Files');
    
    return cache.addAll(self.STATIC_ASSETS)
      .catch(bulkError => {
        console.error('[Service Worker] Bulk caching failed:', bulkError);
        
        // Fall back to individual caching if bulk fails
        return Promise.all(self.STATIC_ASSETS.map(url => 
          fetch(url, { cache: 'reload' })
            .then(response => {
              if (response.ok) return cache.put(url, response);
            })
            .catch(err => console.log('[SW] Failed to cache:', url, err))
        ));
      });
  } catch (err) {
    console.error('[Service Worker] Cache error during installation', err);
    return Promise.resolve(); // Continue installation even if caching fails
  }
};

// Clean up old caches
self.cleanupOldCaches = async function() {
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName !== self.CACHE_NAME) {
        console.log('[Service Worker] Clearing Old Cache:', cacheName);
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

// Create a simple offline response
self.createOfflineResponse = function(isNavigationRequest) {
  if (isNavigationRequest) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>حالت آفلاین - GymSync</title>
        <style>
          body {
            font-family: 'Vazirmatn', system-ui, sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 1rem;
            text-align: center;
          }
          .container {
            max-width: 28rem;
            padding: 2rem;
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          h1 {
            color: #7c3aed;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          p {
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }
          .button {
            background-color: #7c3aed;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .button:hover {
            background-color: #6d28d9;
          }
          .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #7c3aed;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">⚡️</div>
          <h1>حالت آفلاین</h1>
          <p>شما در حال حاضر به اینترنت متصل نیستید، اما نگران نباشید! تمام امکانات برنامه در حالت آفلاین نیز در دسترس هستند.</p>
          <p>پس از اتصال مجدد به اینترنت، تغییرات به صورت خودکار همگام‌سازی خواهند شد.</p>
          <button class="button" onclick="window.location.href='./'">بازگشت به برنامه</button>
        </div>
        <script>
          window.addEventListener('online', function() {
            window.location.reload();
          });
        </script>
      </body>
      </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      }
    );
  }
  
  // For non-navigation requests
  return new Response('آفلاین - داده در دسترس نیست', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
  });
};
