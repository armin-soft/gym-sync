
/**
 * بهینه‌سازی شده - سرویس ورکر با تمرکز بر عملکرد و سرعت با بهبود تحمل خطا
 * Orchestrates service worker registration using helper functions from core-registration.
 */
import { getAppVersionFromManifest } from './version';
import {
  setupControllerChangeListener,
  handleImmediateUpdate,
  setupUpdateFoundListener,
  performFallbackRegistration,
  registerMainServiceWorker
} from './core-registration'; // Updated imports

// This flag tracks if an update notification has been triggered during the current registration attempt.
let localUpdateAvailableFlag = false;

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('مرورگر شما از سرویس ورکر پشتیبانی نمی‌کند');
    return null;
  }

  // Reset flag for current attempt context. Pass as a ref to helpers.
  localUpdateAvailableFlag = false;
  const updateAvailableRef = { value: localUpdateAvailableFlag };

  try {
    const appVersion = await getAppVersionFromManifest();
    
    if (appVersion) {
      localStorage.setItem('app_version', appVersion);
    }
    
    const registration = await registerMainServiceWorker(appVersion);
    console.log(`سرویس ورکر با موفقیت راه‌اندازی شد (نسخه ${appVersion || 'نامشخص'})`);
    
    // Handle updates and listeners for the main registration
    handleImmediateUpdate(registration, updateAvailableRef);
    setupUpdateFoundListener(registration, updateAvailableRef);
    setupControllerChangeListener(); // Sets up a global listener for controller changes
    
    localUpdateAvailableFlag = updateAvailableRef.value; // Sync back the state
    
    return registration;

  } catch (error) {
    console.error('خطا در ثبت سرویس ورکر اصلی:', error);
    
    // Attempt fallback registration
    const fallbackRegistration = await performFallbackRegistration();
    
    if (fallbackRegistration) {
      // If fallback succeeds, set up listeners for it as well
      handleImmediateUpdate(fallbackRegistration, updateAvailableRef);
      setupUpdateFoundListener(fallbackRegistration, updateAvailableRef);
      // Controller change listener is global, ensures it's set if any registration succeeds
      setupControllerChangeListener(); 
      localUpdateAvailableFlag = updateAvailableRef.value; // Sync back
    }
    
    return fallbackRegistration;
  }
}
