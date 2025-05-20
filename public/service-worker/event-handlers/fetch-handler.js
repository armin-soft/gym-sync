// Service Worker Fetch Handler

// Handle the fetch event
export function registerFetchHandler() {
  self.addEventListener('fetch', (event) => {
    // Don't attempt to cache API requests or external resources
    if (event.request.method !== 'GET' || 
        !event.request.url.startsWith(self.location.origin) ||
        event.request.url.includes('/api/') || 
        event.request.url.includes('chrome-extension')) {
      return;
    }
    
    // Handle navigation requests separately for faster page transitions
    if (event.request.mode === 'navigate') {
      event.respondWith(
        (async () => {
          try {
            // Try to use navigation preload response if available
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            }
            
            // Otherwise use network with cache fallback
            const networkResponse = await fetch(event.request, { cache: 'no-store' });
            return networkResponse;
          } catch (err) {
            // If network fails, use cached index.html
            console.error('[Service Worker] Navigation fetch failed:', err);
            const cachedIndex = await caches.match('./index.html');
            return cachedIndex || self.createOfflineResponse(true);
          }
        })()
      );
      return;
    }

    // Create a clean request with fixed paths if needed
    const cleanRequest = self.createCleanRequest(event.request);

    event.respondWith(
      self.fetchWithCacheFallback(cleanRequest)
        .catch(err => handleFetchError(err, cleanRequest))
    );
  });
}

// Handle fetch errors with appropriate fallbacks
async function handleFetchError(error, request) {
  console.error('[Service Worker] Fetch failed:', error);
  
  // Return placeholder for images
  if (request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    const imagePlaceholder = await caches.match('./Assets/Image/Place-Holder.svg');
    if (imagePlaceholder) return imagePlaceholder;
  }
  
  // For other resources, return a simple offline response
  return self.createOfflineResponse(false);
}

console.log('[Service Worker] Fetch handler module loaded');
