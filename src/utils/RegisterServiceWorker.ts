
/**
 * Service Worker Registration Utility
 * Handles the registration, updates, and messaging for service workers
 */

import { isServiceWorkerSupported } from './service-worker/helpers';
import { registerServiceWorker } from './service-worker/registration';
import { setupOfflineDetection } from './service-worker/offline-detection';
import { ToastOptions } from './service-worker/types';
import { showToast } from './service-worker/helpers';

// Re-export for backward compatibility
export { isServiceWorkerSupported };
export type { ToastOptions };

// Flag to prevent multiple initializations
let serviceWorkerInitialized = false;

/**
 * Initialize service worker and offline detection
 * Best called from the main entry point of the app (e.g., main.tsx)
 */
export const initializeServiceWorker = async (): Promise<void> => {
  // Prevent multiple initializations
  if (serviceWorkerInitialized) {
    console.log('Service worker already initialized, skipping');
    return;
  }
  
  serviceWorkerInitialized = true;
  
  try {
    if (!isServiceWorkerSupported()) {
      console.log('Service workers are not supported in this browser');
      return;
    }
    
    const registration = await registerServiceWorker();
    
    if (registration) {
      setupOfflineDetection();
      console.log('Service worker registered successfully');
    } else {
      console.log('App will work without offline capabilities');
    }
  } catch (error) {
    console.error('Failed to initialize service worker:', error);
    
    // Show a toast notification to user about offline functionality
    showToast({
      title: "اطلاعیه",
      description: "امکان کارکرد برنامه در حالت آفلاین فعال نشد. برنامه همچنان در حالت آنلاین کار خواهد کرد.",
      variant: "warning",
      duration: 5000
    });
  }
};
