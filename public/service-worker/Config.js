
// Service Worker Configuration
// Contains all configuration values and static assets definitions

// Files to cache - use relative paths that will work in any environment
self.STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './Assets/Style/Menu.css',
  './Assets/Script/index.js'
];

self.CACHE_NAME = 'gym-sync-v345';

console.log('[Service Worker] Configuration module loaded');
