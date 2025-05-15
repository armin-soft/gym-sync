
// Configuration values for the service worker

// Dynamically determine the base path where the app is running
export const BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Cache name with version - update this to force cache refresh
export const CACHE_NAME = 'gym-sync-v16';

// Files to cache - use relative paths that will work in any environment
export const getUrlsToCache = (): string[] => {
  return [
    `${BASE_PATH}`,
    `${BASE_PATH}index.html`,
    `${BASE_PATH}Assets/Image/Logo.png`,
    `${BASE_PATH}Manifest.json`,
    `${BASE_PATH}Assets/Script/index.js`,
    `${BASE_PATH}Assets/Style/Menu.css`,
    // Additional critical assets for offline functionality
    `${BASE_PATH}assets/index.css`,
    `${BASE_PATH}assets/index.js`,
    // Offline fallback page
    `${BASE_PATH}offline.html`
  ];
};
