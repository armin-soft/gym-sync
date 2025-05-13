
// Handle messages from clients
export function handleMessage(event) {
  if (!event.data) return;
  
  switch (event.data.type) {
    case 'SKIP_WAITING':
      console.log('[Service Worker] Skip waiting command received');
      self.skipWaiting();
      break;
      
    case 'CHECK_FOR_UPDATES':
      console.log('[Service Worker] Checking for updates...');
      self.registration.update();
      break;
      
    default:
      console.log('[Service Worker] Received message:', event.data);
  }
}
