
// Service worker event handlers for install, activate, fetch and message events
import * as logger from './utils/logger.js';
import { cacheInitialAssets, cleanupOldCaches, refreshCache } from './cache/cache-core.js';
import { fetchWithCacheFallback } from './cache/cache-strategies.js';
import { createOfflineResponse } from './offline/offline-response.js';

// Install the service worker
self.addEventListener('install', (event) => {
  // Get version dynamically
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      const version = manifest.version || '1.0.0';
      logger.initLogger(version);
      logger.info(`Installing v${version}`);
    })
    .catch(err => {
      logger.info('Installing (version fetch failed)');
    });
  
  self.skipWaiting(); // Force activation
  
  event.waitUntil(
    cacheInitialAssets(self.CACHE_NAME, self.STATIC_ASSETS)
      .catch(error => {
        logger.error('Cache failed', error);
        return Promise.resolve();
      })
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  logger.info('Activating service worker');
  
  event.waitUntil(
    cleanupOldCaches(self.CACHE_NAME)
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
    fetchWithCacheFallback(cleanRequest, self.CACHE_NAME)
      .catch(error => handleFetchError(error, cleanRequest))
  );
});

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
      logger.info(`Skip waiting command received (v${appVersion})`);
      self.skipWaiting();
      break;
    case 'CHECK_FOR_UPDATES':
      if (self.registration) {
        self.registration.update();
      }
      break;
    case 'REFRESH_CACHE':
      refreshCache(self.CACHE_NAME, self.STATIC_ASSETS)
        .then(() => logger.info(`Cache refreshed (v${appVersion})`));
      break;
    default:
      logger.info(`Unhandled message type: ${event.data.type}`);
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
        logger.info(`Periodic cache update (v${version})`);
      })
      .catch(() => {
        logger.info('Periodic cache update');
      });
      
    event.waitUntil(
      refreshCache(self.CACHE_NAME, self.STATIC_ASSETS)
    );
  }
});
