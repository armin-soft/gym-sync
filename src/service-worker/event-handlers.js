
// Service worker event handlers registration
import { registerInstallHandler } from './event-handlers/install-handler.js';
import { registerActivateHandler } from './event-handlers/activate-handler.js';
import { registerFetchHandler } from './event-handlers/fetch-handler.js';
import { registerMessageHandler } from './event-handlers/message-handler.js';
import { registerSyncHandler } from './event-handlers/sync-handler.js';

// Register all event handlers
export function registerAllEventHandlers() {
  // Register installation handler
  registerInstallHandler();
  
  // Register activation handler
  registerActivateHandler();
  
  // Register fetch handler
  registerFetchHandler();
  
  // Register message handler
  registerMessageHandler();
  
  // Register periodic sync handler
  registerSyncHandler();
}

// Initialize all event handlers
registerAllEventHandlers();
