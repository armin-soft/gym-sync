
// پیکربندی سرویس ورکر

// دریافت نسخه از manifest
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version || '1.9.3';
    self.CACHE_NAME = `gym-sync-v${version.replace(/\./g, '')}`;
    console.log(`[Service Worker] نسخه ${version} (کش: ${self.CACHE_NAME})`);
  })
  .catch(() => {
    self.CACHE_NAME = 'gym-sync-v193';
    console.log('[Service Worker] خطا در دریافت نسخه از manifest');
  });

// فایل‌های اصلی برای کش کردن
self.STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

console.log('[Service Worker] فایل پیکربندی بارگذاری شد');
