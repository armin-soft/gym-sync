
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LoadingScreen } from './components/LoadingScreen'
import React from 'react'

// کامپوننت اصلی برنامه با نمایش صفحه لودینگ در هر رفرش
function MainApp() {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);
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
    setIsInitialLoading(false);
  }, [appVersion]);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {isInitialLoading && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        </div>
      )}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        opacity: isInitialLoading ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: isInitialLoading ? 'none' : 'auto'
      }}>
        <App />
      </div>
    </div>
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
    
    root.render(
      <StrictMode>
        <MainApp />
      </StrictMode>
    );
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
