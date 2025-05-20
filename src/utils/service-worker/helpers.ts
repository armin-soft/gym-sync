export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed; waiting for activation");
      } else if (registration.active) {
        console.log("Service worker active");
      }

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New content is available, prompt the user to update
              showUpdateNotification();
            } else {
              // Content is cached for offline use
              console.log("Content is cached for offline use.");
            }
          }
        };
      };
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.log("Service workers are not supported.");
  }
};

export const showUpdateNotification = () => {
  // Use window.location instead of location to fix the TypeScript error
  const updatePrompt = confirm(
    "A new version of the app is available. Do you want to update now?"
  );

  if (updatePrompt) {
    // Call window.location.reload() instead of location.reload()
    window.location.reload();
  }
};

export const unregisterServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log("Service worker unregistered.");
      }
    } catch (error) {
      console.error(`Service worker unregistration failed: ${error}`);
    }
  }
};
