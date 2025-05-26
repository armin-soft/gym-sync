
// پیکربندی سرویس ورکر

// فایل‌های اصلی برای کش کردن
export const STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

// دریافت نسخه از manifest و تولید نام کش
export async function initializeConfig() {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    const version = manifest.version;
    const formattedCacheName = `gym-sync-v${version.replace(/\./g, '')}`;
    
    // تزریق مقادیر به فضای نام سراسری
    // @ts-ignore
    self.CACHE_NAME = formattedCacheName;
    // @ts-ignore
    self.STATIC_ASSETS = STATIC_ASSETS;
    
    console.log(`[Service Worker] پیکربندی با نسخه ${version} راه‌اندازی شد`);
    return formattedCacheName;
  } catch (error) {
    console.error('[Service Worker] خطا در دریافت نسخه از manifest', error);
    
    // استفاده از نسخه پیش‌فرض در صورت خطا
    const fallbackCacheName = 'gym-sync-v336';
    
    // @ts-ignore
    self.CACHE_NAME = fallbackCacheName;
    // @ts-ignore
    self.STATIC_ASSETS = STATIC_ASSETS;
    
    return fallbackCacheName;
  }
}

// تابع دریافت نسخه جداگانه برای استفاده در سایر قسمت‌ها
export async function getAppVersion() {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version;
  } catch (error) {
    console.error('[Service Worker] خطا در دریافت نسخه', error);
    return '3.3.6'; // نسخه پیش‌فرض
  }
}
