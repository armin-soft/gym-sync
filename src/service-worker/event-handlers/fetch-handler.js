
// Service worker fetch event handler
import * as logger from '../utils/logger.js';
import { fetchWithCacheFallback } from '../cache/cache-strategies.js';
import { createOfflineResponse } from '../offline/offline-response.js';

// Handle the fetch event
export function registerFetchHandler() {
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
      fetchWithCacheFallback(cleanRequest, self.CACHE_NAME)
        .catch(error => handleFetchError(error, cleanRequest))
    );
  });
}

// Handle fetch errors with appropriate fallbacks
async function handleFetchError(error, request) {
  logger.error('Fetch failed:', error);
  
  // For navigation requests, return the offline page
  if (request.mode === 'navigate') {
    const indexResponse = await caches.match('./index.html');
    if (indexResponse) return indexResponse;
    
    // If index.html is not in cache, create a simple offline page
    return createOfflineResponse(true);
  }
  
  // For other resources
  return createOfflineResponse(false);
}
