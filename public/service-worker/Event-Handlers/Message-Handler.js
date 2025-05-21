
// Service Worker Message Handler

// Handle messages from clients
export function registerMessageHandler() {
  self.addEventListener('message', (event) => {
    if (!event.data) return;
    
    switch (event.data.type) {
      case 'SKIP_WAITING':
        console.log('[Service Worker] Skip waiting command received');
        self.skipWaiting();
        break;
      case 'CHECK_FOR_UPDATES':
        console.log('[Service Worker] Checking for updates');
        if (self.registration) {
          self.registration.update();
        }
        break;
      case 'REFRESH_CACHE':
        console.log('[Service Worker] Refreshing cache on request');
        self.cacheInitialAssets();
        break;
      default:
        console.log(`[Service Worker] Unhandled message type: ${event.data.type}`);
    }
  });
}

console.log('[Service Worker] Message handler module loaded');
