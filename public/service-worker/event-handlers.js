
// Service Worker Event Handlers Registration Module
import { registerInstallHandler } from './Event-Handlers/Install-Handler.js';
import { registerActivateHandler } from './Event-Handlers/Activate-Handler.js';
import { registerFetchHandler } from './Event-Handlers/Fetch-Handler.js';
import { registerMessageHandler } from './Event-Handlers/Message-Handler.js';
import { registerSyncHandler } from './Event-Handlers/Sync-Handler.js';

// Function to register all event handlers
export function registerAllEventHandlers() {
  // Register installation handler
  registerInstallHandler();
  
  // Register activation handler
  registerActivateHandler();
  
  // Register fetch handler
  registerFetchHandler();
  
  // Register message handler
  registerMessageHandler();
  
  // Register sync handler
  registerSyncHandler();
}

// Initialize all event handlers
registerAllEventHandlers();

console.log('[Service Worker] Event handlers module loaded');
