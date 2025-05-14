
// Main service worker entry point that imports and orchestrates all modules
// This file serves as the entry point for the service worker

// Import service worker modules
import './service-worker/core/service-worker-types';
import './service-worker/core/install';
import './service-worker/core/activate';
import './service-worker/core/fetch';
import './service-worker/core/message';
import './service-worker/core/periodic-sync';

// Export empty object to satisfy TypeScript module requirements
export {};
