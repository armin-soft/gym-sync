
// Main service worker entry point that orchestrates all modules
// This file now imports functionality from modular files

// Import core configuration module
importScripts('./src/service-worker/service-worker-config.js');

// Import utility modules
importScripts('./src/service-worker/utils/logger.js');

// Import cache modules
importScripts('./src/service-worker/cache/cache-core.js');
importScripts('./src/service-worker/cache/cache-strategies.js');
importScripts('./src/service-worker/offline/offline-response.js');

// Import event handlers (this now imports all the individual handler modules)
importScripts('./src/service-worker/event-handlers/install-handler.js');
importScripts('./src/service-worker/event-handlers/activate-handler.js');
importScripts('./src/service-worker/event-handlers/fetch-handler.js');
importScripts('./src/service-worker/event-handlers/message-handler.js');
importScripts('./src/service-worker/event-handlers/sync-handler.js');
importScripts('./src/service-worker/event-handlers.js');

// Log initialization
console.log(`[Service Worker] Starting Service Worker v${self.APP_VERSION || '1.0.0'}`);
