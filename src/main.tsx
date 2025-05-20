
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// تابع راه‌اندازی اصلی برنامه - بهینه شده برای سرعت بیشتر
function startApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('عنصر root پیدا نشد');
  
  const root = createRoot(rootElement);
  root.render(
    <App />
  );
  
  // راه‌اندازی سرویس ورکر با تأخیر بیشتر و فقط در صورت نیاز
  import('./utils/RegisterServiceWorker')
    .then(({ initializeServiceWorker }) => {
      // فقط در صورتی که آنلاین باشیم سرویس ورکر را راه اندازی کن
      if (navigator.onLine) {
        setTimeout(() => {
          initializeServiceWorker().catch(console.error);
        }, 5000); // تأخیر 5 ثانیه برای اولویت‌دهی به رندر اصلی
      }
    })
    .catch(err => {
      console.log('خطای بارگیری سرویس ورکر:', err);
    });
}

// بلافاصله شروع به کار کن
startApp();
