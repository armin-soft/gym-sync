
// Cache configuration for the service worker
export const CACHE_NAME = 'gym-sync-v12'; // Increment version to force cache refresh

// Assets to cache - using relative paths for better compatibility
export const STATIC_ASSETS = [
  './',
  './index.html',
  './Manifest.json',
  './Assets/Image/Logo.png',
  './Assets/Script/App.js',
  './Assets/Style/Menu.css',
  // Add critical app assets
  './assets/index.css',
  './assets/index.js'
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
  
  // Additional logic to determine what should be cached for offline use
  if (url.includes('assets/') || 
      url.includes('Assets/') || 
      url.includes('.js') || 
      url.includes('.css') || 
      url.includes('.png') || 
      url.includes('.jpg') || 
      url.includes('.svg') || 
      url.includes('.html')) {
    return true;
  }
  
  return false;
}

// Make variables available in the global scope for Service-Worker.js
// @ts-ignore
self.CACHE_NAME = CACHE_NAME;
// @ts-ignore
self.STATIC_ASSETS = STATIC_ASSETS;
// @ts-ignore
self.shouldCache = shouldCache;
// @ts-ignore
self.normalizeUrl = normalizeUrl;
