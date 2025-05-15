
// Service worker event handlers for install, activate, fetch and message events

// Install the service worker
self.addEventListener('install', (event) => {
  // Get version dynamically
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      const version = manifest.version || '1.0.0';
      console.log(`[Service Worker] Installing v${version}`);
    })
    .catch(err => {
      console.log('[Service Worker] Installing (version fetch failed)');
    });
  
  self.skipWaiting(); // Force activation
  
  event.waitUntil(
    self.cacheStaticAssets()
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        return Promise.resolve();
      })
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  // Get version dynamically
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      const version = manifest.version || '1.0.0';
      console.log(`[Service Worker] Activated v${version}`);
    })
    .catch(err => {
      console.log('[Service Worker] Activated (version fetch failed)');
    });
  
  event.waitUntil(
    self.cleanupOldCaches()
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Handle fetch events
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || 
      !event.request.url.startsWith(self.location.origin) ||
      event.request.url.includes('/api/') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  // Create a clean request with fixed paths if needed
  const cleanRequest = self.createCleanRequest(event.request);

  event.respondWith(
    self.fetchWithCacheFallback(cleanRequest)
      .catch(error => handleFetchError(error, cleanRequest))
  );
});

// Handle fetch errors with appropriate fallbacks
async function handleFetchError(error, request) {
  console.error('[Service Worker] Fetch failed:', error);
  
  // For navigation requests, return the offline page
  if (request.mode === 'navigate') {
    const indexResponse = await caches.match('./index.html');
    if (indexResponse) return indexResponse;
    
    // If index.html is not in cache, create a simple offline page
    return self.createOfflineResponse(true);
  }
  
  // For other resources
  return self.createOfflineResponse(false);
}

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (!event.data) return;
  
  // Get version dynamically for logs
  let appVersion = '1.0.0';
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      appVersion = manifest.version || '1.0.0';
    })
    .catch(() => {});
    
  switch (event.data.type) {
    case 'SKIP_WAITING':
      console.log(`[Service Worker] Skip waiting command received (v${appVersion})`);
      self.skipWaiting();
      break;
    case 'CHECK_FOR_UPDATES':
      if (self.registration) {
        self.registration.update();
      }
      break;
    case 'REFRESH_CACHE':
      caches.open(self.CACHE_NAME)
        .then(cache => {
          return cache.addAll(self.STATIC_ASSETS);
        })
        .then(() => console.log(`[Service Worker] Cache refreshed (v${appVersion})`));
      break;
    default:
      console.log(`[Service Worker] Unhandled message type: ${event.data.type}`);
  }
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-update') {
    // Get version dynamically for logs
    fetch('./Manifest.json')
      .then(response => response.json())
      .then(manifest => {
        const version = manifest.version || '1.0.0';
        console.log(`[Service Worker] Periodic cache update (v${version})`);
      })
      .catch(() => {
        console.log('[Service Worker] Periodic cache update');
      });
      
    event.waitUntil(
      caches.open(self.CACHE_NAME)
        .then(cache => {
          return cache.addAll(self.STATIC_ASSETS);
        })
    );
  }
});
