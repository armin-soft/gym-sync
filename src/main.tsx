
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
  
  // راه‌اندازی سرویس ورکر با تأخیر بیشتر برای اولویت‌دهی به رندر اصلی
  setTimeout(() => {
    import('./utils/RegisterServiceWorker')
      .then(({ initializeServiceWorker }) => {
        initializeServiceWorker().catch(console.error);
      })
      .catch(err => {
        console.log('خطای بارگیری سرویس ورکر:', err);
      });
  }, 3000); // تأخیر 3 ثانیه
}

// بلافاصله شروع به کار کن
startApp();
