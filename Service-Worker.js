
// Import modular components
importScripts('./src/service-worker/cache-config.js');
importScripts('./src/service-worker/cache-strategies.js');
importScripts('./src/service-worker/fetch-handler.js');
importScripts('./src/service-worker/message-handler.js');

// Main service worker file combining all modules
const { CACHE_NAME, STATIC_ASSETS } = self;
const { cacheStaticAssets, cleanupOldCaches } = self;
const { handleFetch } = self;
const { handleMessage } = self;

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  // Cache static assets
  event.waitUntil(cacheStaticAssets(STATIC_ASSETS));
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  
  // Clean up old caches and claim clients
  event.waitUntil(
    Promise.all([
      cleanupOldCaches(),
      self.clients.claim()
    ])
  );
});

// Fetch event
self.addEventListener('fetch', handleFetch);

// Listen for messages from client
self.addEventListener('message', handleMessage);
