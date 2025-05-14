
// Cache configuration for the service worker
export const CACHE_NAME = 'gym-sync-v10';

// Assets to cache - using relative paths for better compatibility
export const STATIC_ASSETS = [
  './',
  './index.html',
  './Manifest.json',
  './Assets/Image/Logo.png',
  './Assets/Script/App.js',
  './Assets/Style/Menu.css'
];

// Helper function to normalize URLs in the cache
export function normalizeUrl(url) {
  // Remove query parameters and hash fragments
  return url.split('?')[0].split('#')[0];
}

// Helper function to determine if a URL should be cached
export function shouldCache(url) {
  // Don't cache API requests or other dynamic content
  if (url.includes('/api/') || url.includes('chrome-extension://')) {
    return false;
  }
  return true;
}

// Make variables available in the global scope for Service-Worker.js
// @ts-ignore
self.CACHE_NAME = CACHE_NAME;
// @ts-ignore
self.STATIC_ASSETS = STATIC_ASSETS;
