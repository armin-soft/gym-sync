
// Configuration values for the service worker

// Dynamically determine the base path where the app is running
export const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Function to fetch manifest and get version
async function getAppVersion() {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version;
  } catch (error) {
    console.error('[Service Worker] Error fetching manifest:', error);
    return '';
  }
}

// Cache name with version - will be dynamically updated when possible
export const CACHE_NAME = 'gym-sync-v256';

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

// Initialize with version from manifest when possible
getAppVersion().then(version => {
  console.log(`[Service Worker] Configuration initialized with version ${version}`);
});
