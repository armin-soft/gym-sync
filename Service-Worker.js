
// Main service worker entry point
// This file serves as the orchestrator for all service worker functionality

// Define global scope for the service worker
self.APP_VERSION = 'gym-sync';
self.CACHE_NAME = 'gym-sync-v249';
self.BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Import core modules
importScripts(
  './service-worker/config.js',
  './service-worker/utils.js',
  './service-worker/cache-strategies.js',
  './service-worker/event-handlers.js'
);

// Log initialization
console.log('[Service Worker] Initialized');

// Initialize with version from manifest when possible
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version;
    self.APP_VERSION = `gym-sync-${version}`;
    self.CACHE_NAME = `gym-sync-v${version.replace(/\./g, '')}`;
    console.log(`[Service Worker] Configuration updated with version ${version}`);
  })
  .catch(err => {
    console.log('[Service Worker] Using default version configuration');
  });
