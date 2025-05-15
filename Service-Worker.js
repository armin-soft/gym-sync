
// Main service worker entry point that imports and orchestrates all modules
// This file serves as the entry point for the service worker

// Import core modules
import './src/service-worker/core/config.js';
import './src/service-worker/core/install.js';
import './src/service-worker/core/activate.js';
import './src/service-worker/core/fetch.js';
import './src/service-worker/core/message.js';
import './src/service-worker/core/periodic-sync.js';

// Log service worker initialization
console.log('[Service Worker] Starting Service Worker v1.8.0');
