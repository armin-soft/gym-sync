
// Type definitions for Service Worker API
// This file defines proper types for service worker context

// Extend Window interface for service worker registration
declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
  }
}

// Define ServiceWorkerGlobalScope for use in service worker files
declare var self: ServiceWorkerGlobalScope;
export {};
