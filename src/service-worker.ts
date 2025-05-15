
// Main service worker entry point that imports and orchestrates all modules
// This file serves as the entry point for the service worker

// Explicitly declare self as ServiceWorkerGlobalScope
declare var self: ServiceWorkerGlobalScope;

// Import core functionality
import './service-worker/core/service-worker-types';
import './service-worker/core/config';
import './service-worker/core/install';
import './service-worker/core/activate';
import './service-worker/core/fetch';
import './service-worker/core/message';
import './service-worker/core/periodic-sync';

// Log service worker initialization
console.log('[Service Worker] Initializing service worker v1.8.0');

// Export empty object to satisfy TypeScript module requirements
export {};
