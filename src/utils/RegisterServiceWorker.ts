
/**
 * Service Worker Registration Utility
 * Handles the registration, updates, and messaging for service workers
 */

import { isServiceWorkerSupported } from './service-worker/helpers';
import { registerServiceWorker } from './service-worker/registration';
import { setupOfflineDetection } from './service-worker/offline-detection';
import { ToastOptions } from './service-worker/types';

// Re-export for backward compatibility
export { isServiceWorkerSupported };
export type { ToastOptions };

/**
 * Initialize service worker and offline detection
 * Best called from the main entry point of the app (e.g., main.tsx)
 */
export const initializeServiceWorker = async (): Promise<void> => {
  await registerServiceWorker();
  setupOfflineDetection();
};
