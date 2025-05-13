
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Make sure to use createRoot API properly with React 19
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
