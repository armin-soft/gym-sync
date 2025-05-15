
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

console.log('[Service Worker] Fetch handler module loaded');
