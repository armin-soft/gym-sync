
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Make sure to use createRoot API properly
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

// ثبت یک تابع برای پاکسازی کش
window.clearServiceWorkerCache = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      // ارسال پیام به سرویس ورکر برای پاکسازی کش
      return new Promise((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          if (event.data && event.data.result === 'success') {
            console.log('Cache cleared successfully');
            resolve(true);
            // بازنشانی صفحه بعد از پاکسازی کش
            window.location.reload(true);
          }
        };
        
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage(
            { type: 'CLEAR_CACHE' },
            [channel.port2]
          );
        } else {
          console.warn('No active service worker found');
          resolve(false);
        }
      });
    });
  }
};

// اجرای یک بازنشانی کش اولیه برای اطمینان از بارگذاری نسخه جدید
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    console.log('Updating existing service worker...');
    registration.update();
  });
}

ReactDOM.createRoot(rootElement).render(<App />);

