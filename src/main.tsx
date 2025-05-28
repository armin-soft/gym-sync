
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LoadingScreen } from './components/LoadingScreen'
import './index.css'

// Ensure React is available globally to prevent hook errors
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
    <React.StrictMode>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && <App />}
    </React.StrictMode>
  );
}

// تابع راه‌اندازی اصلی برنامه
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
