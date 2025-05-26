
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LoadingScreen } from './components/LoadingScreen'
import './index.css'

// کامپوننت اصلی برنامه با نمایش صفحه لودینگ
function MainApp() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoadingComplete = () => {
    console.log('Loading completed, showing main app');
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
  try {
    console.log('Starting app initialization...');
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('عنصر root پیدا نشد');
      return;
    }
    
    console.log('Root element found, creating React root...');
    const root = createRoot(rootElement);
    root.render(<MainApp />);
    
    console.log('برنامه با موفقیت راه‌اندازی شد');
    
    // راه‌اندازی سرویس ورکر با تأخیر بیشتر برای اولویت‌دهی به رندر اصلی
    setTimeout(() => {
      import('./utils/RegisterServiceWorker')
        .then(({ initializeServiceWorker }) => {
          initializeServiceWorker().catch(console.error);
        })
        .catch(err => {
          console.log('خطای بارگیری سرویس ورکر:', err);
        });
    }, 3000);
  } catch (error) {
    console.error('خطا در راه‌اندازی برنامه:', error);
    // نمایش پیام خطا برای کاربر
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;">خطا در بارگذاری برنامه. لطفا صفحه را رفرش کنید.</div>';
  }
}

// بررسی آماده بودن DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
