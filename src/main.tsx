
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LoadingScreen } from './components/loading/LoadingScreen'
import { AppVersionProvider } from './contexts/AppVersionContext'
import React from 'react'

// کامپوننت اصلی برنامه با صفحه لودینگ بهینه شده
function MainApp() {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);
  
  const handleLoadingComplete = React.useCallback(() => {
    console.log('Loading completed, showing main app');
    setIsInitialLoading(false);
  }, []);
  
  return (
    <AppVersionProvider>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {isInitialLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <App />
        )}
      </div>
    </AppVersionProvider>
  );
}

// متغیر برای نگهداری root
let root: any = null;

// تابع راه‌اندازی اصلی برنامه - بهینه شده
function startApp() {
  try {
    console.log('Starting optimized app initialization...');
    
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('عنصر root پیدا نشد');
      return;
    }
    
    if (!root) {
      root = createRoot(rootElement);
    }
    
    root.render(
      <StrictMode>
        <MainApp />
      </StrictMode>
    );
    console.log('برنامه با موفقیت و سرعت بهینه راه‌اندازی شد');
    
  } catch (error) {
    console.error('خطا در راه‌اندازی برنامه:', error);
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

// راه‌اندازی سریع برنامه
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
