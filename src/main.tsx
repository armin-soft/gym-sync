
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeServiceWorker } from './utils/RegisterServiceWorker'

// Make sure to use createRoot API properly with React 19
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Flag to prevent multiple service worker initializations
let serviceWorkerInitialized = false;

// Initialize service worker after app renders to avoid blocking the main thread
window.addEventListener('load', () => {
  // Prevent double initialization
  if (serviceWorkerInitialized) return;
  serviceWorkerInitialized = true;
  
  // Delay service worker registration slightly to prioritize UI rendering
  setTimeout(() => {
    initializeServiceWorker()
      .catch(error => {
        console.error('Failed to register service worker:', error);
        // App will continue to work without offline capabilities
      });
  }, 1000);
});
