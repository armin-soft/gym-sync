
// Configuration values for the service worker

// App version from manifest - will be set dynamically
self.APP_VERSION = 'gym-sync'; // Base name, version will be appended

// Define global scope for the service worker
self.CACHE_NAME = `${self.APP_VERSION}-v267`;
self.BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Files to cache - use relative paths that will work in any environment
self.STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

// Get version from manifest when possible
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version;
    self.APP_VERSION = `gym-sync-${version}`;
    console.log(`[Service Worker] Config initialized with version ${version}`);
  })
  .catch(err => {
    console.log('[Service Worker] Config initialization (version fetch failed)');
  });

// Helper functions for URL handling
self.cleanRequestUrl = function(url) {
  return url.replace(/Assets\/Assets\//g, 'Assets/');
};

self.createCleanRequest = function(originalRequest) {
  const requestUrl = originalRequest.url;
  const cleanUrl = self.cleanRequestUrl(requestUrl);
  
  if (cleanUrl !== requestUrl) {
    console.log('[Service Worker] Fixed duplicate path:', cleanUrl);
    return new Request(cleanUrl, {
      method: originalRequest.method,
      headers: originalRequest.headers,
      mode: originalRequest.mode,
      credentials: originalRequest.credentials
    });
  }
  
  return originalRequest;
};
