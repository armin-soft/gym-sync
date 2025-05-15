
// Service worker periodic sync event handler
import * as logger from '../utils/logger.js';
import { refreshCache } from '../cache/cache-core.js';

// Handle the periodicsync event
export function registerSyncHandler() {
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-update') {
      // Get version dynamically for logs
      fetch('./Manifest.json')
        .then(response => response.json())
        .then(manifest => {
          const version = manifest.version;
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
}
