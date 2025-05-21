
// Service worker installation handler
import * as logger from '../utils/logger.js';
import { cacheInitialAssets } from '../cache/cache-core.js';

// Handle the install event
export function registerInstallHandler() {
  self.addEventListener('install', (event) => {
    // Get version dynamically
    fetch('./Manifest.json')
      .then(response => response.json())
      .then(manifest => {
        const version = manifest.version || '3.0.0';
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
}
