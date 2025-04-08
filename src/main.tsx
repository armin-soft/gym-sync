
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get container and create root once
const container = document.getElementById('root');

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Update page title based on gym name
const updatePageTitle = () => {
  try {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (profile.gymName) {
        document.title = `Gym Sync - مدیریت برنامه ${profile.gymName}`;
      }
    }
  } catch (error) {
    console.error('Error updating page title:', error);
  }
};

// Generate dynamic favicon to replace the protected one
const generateDynamicFavicon = () => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fill background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 32, 32);
      gradient.addColorStop(0, '#7c3aed'); // Purple
      gradient.addColorStop(1, '#4f46e5'); // Indigo
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw stylized GS letters for Gym Sync in white
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GS', 16, 16);
      
      // Add a circular border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(16, 16, 13.4, 0, Math.PI * 2);
      ctx.stroke();
      
      // Create a link element for the favicon
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = canvas.toDataURL('image/png');
      
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll('link[rel="icon"]');
      existingLinks.forEach(link => link.remove());
      
      // Add the new favicon link to the document head
      document.head.appendChild(link);
      
      // Also set apple-touch-icon
      const appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      appleLink.href = canvas.toDataURL('image/png');
      document.head.appendChild(appleLink);
    }
  } catch (error) {
    console.error('Failed to generate favicon:', error);
  }
};

// Add custom styles for animation utilities - do this before render for better performance
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes zoom-in-90 {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-in.zoom-in-90 {
    animation: zoom-in-90 0.2s ease-out;
  }
`;
document.head.appendChild(styleEl);

// Update the page title and generate the favicon
updatePageTitle();
generateDynamicFavicon();

// Listen for storage changes to update title when gym name is updated
window.addEventListener('storage', (e) => {
  if (e.key === 'trainerProfile') {
    updatePageTitle();
  }
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Service-Worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed: ', error);
      });
  });
}

// Directly render the main application without the initial loading spinner
root.render(<App />);
