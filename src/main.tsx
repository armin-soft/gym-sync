
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container!);

// Add custom styles for animation utilities
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

// Directly render the main application without the initial loading spinner
root.render(<App />);
