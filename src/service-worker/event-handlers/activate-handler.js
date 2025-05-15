
// Service worker activation handler
import * as logger from '../utils/logger.js';
import { cleanupOldCaches } from '../cache/cache-core.js';

// Handle the activate event
export function registerActivateHandler() {
  self.addEventListener('activate', (event) => {
    logger.info('Activating service worker');
    
    event.waitUntil(
      cleanupOldCaches(self.CACHE_NAME)
        .then(() => {
          return self.clients.claim();
        })
    );
  });
}
