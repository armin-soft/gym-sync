
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeServiceWorker } from './utils/RegisterServiceWorker'

// راه‌اندازی سرویس ورکر برای پشتیبانی آفلاین و بروزرسانی
// بعد از بارگذاری صفحه
window.addEventListener('load', () => {
  initializeServiceWorker().catch(console.error);
});

// استفاده درست از API createRoot در React 19
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('عنصر root پیدا نشد');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
