
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LoadingScreen } from './components/LoadingScreen'
import './index.css'

// اطمینان از دسترسی جهانی React
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

// کامپوننت اصلی برنامه با نمایش صفحه لودینگ
function MainApp() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [appVersion, setAppVersion] = React.useState('');
  
  // دریافت نسخه از Manifest.json
  React.useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const version = manifest.version || 'نامشخص';
        setAppVersion(version);
        localStorage.setItem('app_version', version);
        console.log(`App version loaded from Manifest.json: ${version}`);
      } catch (error) {
        console.error('Error loading version from Manifest.json:', error);
        const cachedVersion = localStorage.getItem('app_version') || 'خطا در بارگذاری';
        setAppVersion(cachedVersion);
      }
    };
    
    fetchVersion();
  }, []);
  
  const handleLoadingComplete = React.useCallback(() => {
    console.log(`Loading completed for version ${appVersion}, showing main app`);
    setIsLoading(false);
  }, [appVersion]);
  
  return (
    <StrictMode>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && <App />}
    </StrictMode>
  );
}

// تابع راه‌اندازی اصلی برنامه
function startApp() {
  try {
    console.log('Starting app initialization...');
    console.log('React available:', !!React);
    console.log('React version:', React.version);
    console.log('useLayoutEffect available:', !!React.useLayoutEffect);
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('عنصر root پیدا نشد');
      return;
    }
    
    console.log('Root element found, creating React root...');
    const root = createRoot(rootElement);
    
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
