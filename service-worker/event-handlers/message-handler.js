
// Service worker message event handler
import * as logger from '../utils/logger.js';
import { refreshCache } from '../cache/cache-core.js';

// Handle the message event
export function registerMessageHandler() {
  self.addEventListener('message', (event) => {
    if (!event.data) return;
    
    // Get version dynamically for logs
    let appVersion = '';
    fetch('./Manifest.json')
      .then(response => response.json())
      .then(manifest => {
        appVersion = manifest.version;
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
}
