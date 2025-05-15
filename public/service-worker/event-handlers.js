
// Service Worker Event Handlers
// Contains event listeners for service worker lifecycle events

// Service worker installation handler
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    self.cacheInitialAssets()
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        // Continue installation even if caching fails
        return Promise.resolve();
      })
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    self.cleanupOldCaches()
      .then(() => {
        // Immediately claim clients so updated SW controls open pages
        return self.clients.claim();
      })
  );
});

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
    self.fetchWithCacheFallback(cleanRequest)
      .catch(err => handleFetchError(err, cleanRequest))
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
      self.cacheInitialAssets();
      break;
    default:
      console.log(`[Service Worker] Unhandled message type: ${event.data.type}`);
  }
});

console.log('[Service Worker] Event handlers module loaded');
