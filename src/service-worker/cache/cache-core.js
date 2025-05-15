
// Core caching functionality for service worker

import * as logger from '../utils/logger.js';

// Function to cache initial assets
export async function cacheInitialAssets(cacheName, staticAssets) {
  try {
    const cache = await caches.open(cacheName);
    logger.info('Caching initial assets');
    
    return cache.addAll(staticAssets)
      .catch(bulkError => {
        logger.error('Bulk caching failed:', bulkError);
        
        // Fall back to individual caching if bulk fails
        return Promise.all(staticAssets.map(url => 
          fetch(url, { cache: 'reload' })
            .then(response => {
              if (!response || response.status !== 200) {
                logger.warn(`Failed to cache: ${url} - Status: ${response ? response.status : 'unknown'}`);
                return;
              }
              return cache.put(url, response);
            })
            .catch(err => {
              logger.warn(`Error caching ${url}:`, err);
              // Continue despite errors
              return Promise.resolve();
            })
        ));
      });
  } catch (err) {
    logger.error('Cache error during installation', err);
    return Promise.resolve(); // Continue installation even if caching fails
  }
}

// Clean up old caches
export async function cleanupOldCaches(currentCacheName) {
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map((cacheName) => {
      if (cacheName !== currentCacheName) {
        logger.info(`Clearing old cache: ${cacheName}`);
        return caches.delete(cacheName);
      }
      return Promise.resolve();
    })
  );
}

// Refresh cache with latest assets
export async function refreshCache(cacheName, urlsToCache) {
  const cache = await caches.open(cacheName);
  logger.info('Refreshing cache');
  
  try {
    await cache.addAll(urlsToCache);
    logger.info('Cache refreshed successfully');
  } catch (error) {
    logger.error('Failed to refresh cache:', error);
  }
}
