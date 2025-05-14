
// Main service worker file that combines all modules

// Define self for TypeScript
// @ts-ignore
const sw = self;

// Fix imports with correct paths that will work in the built version
sw.importScripts('./Assets/Script/Cache-Config.js');
sw.importScripts('./Assets/Script/Cache-Strategies.js');
sw.importScripts('./Assets/Script/Fetch-Handler.js');
sw.importScripts('./Assets/Script/Message-Handler.js');

// Cache configuration
const CACHE_NAME = 'gym-sync-v9'; // Increment cache version
const STATIC_ASSETS = [
  './',
  './index.html',
  './Assets/Image/Logo.png',
  './Manifest.json',
  './Assets/Script/index.js',
  './Assets/Style/Menu.css'
];

// Install event
sw.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing');
  
  // Skip waiting to activate immediately
  sw.skipWaiting();
  
  // Cache static assets
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching Files');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event
sw.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim clients so the SW controls open pages
      return sw.clients.claim();
    })
  );
});

// Fetch event - use imported handler
sw.addEventListener('fetch', (event) => {
  // Use the fetch handler from the imported module
  if (typeof handleFetch === 'function') {
    handleFetch(event);
  } else {
    console.error('[Service Worker] Missing handleFetch function');
  }
});

// Message event - use imported handler
sw.addEventListener('message', (event) => {
  // Use the message handler from the imported module
  if (typeof handleMessage === 'function') {
    handleMessage(event);
  } else {
    console.error('[Service Worker] Missing handleMessage function');
    
    // Fallback message handler
    if (!event.data) return;
    
    if (event.data.type === 'SKIP_WAITING') {
      console.log('[Service Worker] Skip waiting command received');
      sw.skipWaiting();
    }
  }
});
