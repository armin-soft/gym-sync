
// Service Worker Activation Handler

// Handle the activate event
export function registerActivateHandler() {
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
      self.cleanupOldCaches()
        .then(() => {
          // Immediately claim clients so updated SW controls open pages
          return self.clients.claim();
        })
    );
  });
}

console.log('[Service Worker] Activate handler module loaded');
