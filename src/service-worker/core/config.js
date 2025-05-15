
// Configuration values for the service worker

// Dynamically determine the base path where the app is running
export const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Cache name with version - update this to force cache refresh
export const CACHE_NAME = 'gym-sync-v16';

// Files to cache - use relative paths that will work in any environment
export const STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './Assets/Script/index.js',
  './Assets/Style/Menu.css',
  './assets/index.css',
  './assets/index.js'
];

// Make configuration available in the global scope
// @ts-ignore
self.CACHE_NAME = CACHE_NAME;
// @ts-ignore
self.STATIC_ASSETS = STATIC_ASSETS;
// @ts-ignore
self.BASE_PATH = BASE_PATH;
