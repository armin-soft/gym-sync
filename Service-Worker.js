
// Main service worker entry point that orchestrates all modules
// This file now imports functionality from modular files

// Import core modules
importScripts('./src/service-worker/service-worker-config.js');
importScripts('./src/service-worker/cache-handlers.js');
importScripts('./src/service-worker/event-handlers.js');

// Log initialization
console.log(`[Service Worker] Starting Service Worker v${self.APP_VERSION || '1.0.0'}`);
