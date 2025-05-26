
// سرویس ورکر ساده شده برای Lovable
const CACHE_NAME = 'gym-sync-v316';

// منابع اصلی برای کش
const STATIC_ASSETS = [
  './',
  './index.html',
  './Manifest.json'
];

// نصب سرویس ورکر
self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] کش کردن منابع');
        return cache.addAll(STATIC_ASSETS).catch(err => {
          console.log('[Service Worker] خطا در کش:', err);
          return Promise.resolve();
        });
      })
      .catch(error => {
        console.log('[Service Worker] خطا در نصب:', error);
      })
  );
  
  self.skipWaiting();
});

// فعال‌سازی
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] فعال‌سازی');
  event.waitUntil(self.clients.claim());
});

// مدیریت درخواست‌ها
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request).then(response => {
          return response || new Response('آفلاین');
        });
      })
  );
});

console.log('[Service Worker] سرویس ورکر ساده راه‌اندازی شد');
