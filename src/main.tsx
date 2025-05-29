
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import * as React from 'react';

// کامپوننت اصلی برنامه
function MainApp() {
  const [isLoading, setIsLoading] = React.useState(true);
  
  const handleLoadingComplete = React.useCallback(() => {
    console.log('Loading completed, showing main app');
    setIsLoading(false);
  }, []);
  
  // حذف صفحه لودینگ و نمایش مستقیم برنامه
  React.useEffect(() => {
    // نمایش فوری برنامه بدون لودینگ
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-brand-500/90 to-brand-700/90">
        <div className="text-white text-lg">در حال بارگذاری...</div>
      </div>
    );
  }
  
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// متغیر برای نگهداری root
let root: any = null;

// تابع راه‌اندازی اصلی برنامه
function startApp() {
  try {
    console.log('Starting app initialization...');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('عنصر root پیدا نشد');
      return;
    }
    
    // بررسی اینکه آیا root قبلاً ایجاد شده است یا خیر
    if (!root) {
      console.log('Root element found, creating React root...');
      root = createRoot(rootElement);
    }
    
    root.render(<MainApp />);
    console.log('برنامه با موفقیت راه‌اندازی شد');
    
  } catch (error) {
    console.error('خطا در راه‌اندازی برنامه:', error);
    // نمایش پیام خطا برای کاربر
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
        <h2>خطا در بارگذاری برنامه</h2>
        <p>مشکل: ${error.message}</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 5px; cursor: pointer;">
          رفرش صفحه
        </button>
      </div>
    `;
  }
}

// بررسی آماده بودن DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
