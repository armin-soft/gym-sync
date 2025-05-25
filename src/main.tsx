
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LoadingScreen } from './components/LoadingScreen'
import './index.css'

// کامپوننت اصلی برنامه با نمایش صفحه لودینگ
function MainApp() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && <App />}
    </>
  );
}

// تابع راه‌اندازی اصلی برنامه - بهینه شده برای سرعت بیشتر
function startApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('عنصر root پیدا نشد');
  
  const root = createRoot(rootElement);
  root.render(
    <MainApp />
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
