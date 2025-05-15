
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeServiceWorker } from './utils/RegisterServiceWorker'

// Preload critical fonts and resources
const preloadFonts = () => {
  const fontPreloads = [
    { href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap", as: "style" }
  ];
  
  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font.href;
    link.as = font.as;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Preload fonts before rendering
preloadFonts();

// Add rendering optimization
document.documentElement.classList.add('js-focus-visible');

// Initial loading state
document.body.classList.add('loading');

// Make sure to use createRoot API properly with React 19
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Optimize rendering
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Remove loading class after render
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 100);
};

// Render with requestIdleCallback if available
if ('requestIdleCallback' in window) {
  // @ts-ignore - requestIdleCallback is not in TypeScript's lib.dom.d.ts
  window.requestIdleCallback(renderApp);
} else {
  // Fallback to setTimeout
  setTimeout(renderApp, 1);
}

// Initialize service worker after app renders
initializeServiceWorker()
  .catch(error => console.error('Failed to register service worker:', error));
