
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeServiceWorker, startServiceWorkerUpdateCheck } from './utils/RegisterServiceWorker'

// تابع راه‌اندازی اصلی برنامه
function startApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('عنصر root پیدا نشد');
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // راه‌اندازی سرویس ورکر با تأخیر برای تمرکز روی محتوای اصلی
  setTimeout(() => {
    initializeServiceWorker()
      .then(() => {
        // شروع بررسی‌های دوره‌ای بروزرسانی پس از راه‌اندازی موفق
        startServiceWorkerUpdateCheck();
      })
      .catch(console.error);
  }, 3000); // تأخیر 3 ثانیه برای اولویت‌دهی به رندر اصلی
}

// شروع برنامه پس از بارگذاری کامل صفحه
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // اگر صفحه قبلاً بارگذاری شده است
  setTimeout(startApp, 1);
} else {
  // در غیر این صورت منتظر بارگذاری کامل صفحه بمان
  window.addEventListener('DOMContentLoaded', startApp);
}
