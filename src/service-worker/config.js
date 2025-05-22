
// پیکربندی سرویس ورکر

// نام کش با نسخه پروژه
export const CACHE_NAME = 'gym-sync-v222';

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

// تزریق مقادیر به فضای نام سراسری
// @ts-ignore
self.CACHE_NAME = CACHE_NAME;
// @ts-ignore
self.STATIC_ASSETS = STATIC_ASSETS;

// دریافت نسخه از manifest
export async function initializeConfig() {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    const version = manifest.version || '2.2.2';
    const formattedCacheName = `gym-sync-v${version.replace(/\./g, '')}`;
    
    // @ts-ignore
    self.CACHE_NAME = formattedCacheName;
    
    console.log(`[Service Worker] پیکربندی با نسخه ${version} راه‌اندازی شد`);
    return formattedCacheName;
  } catch (error) {
    console.error('[Service Worker] خطا در دریافت نسخه از manifest', error);
    return CACHE_NAME;
  }
}
