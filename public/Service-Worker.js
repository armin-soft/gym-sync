
// سرویس ورکر ساده‌شده - فقط برای پشتیبانی آفلاین و بروزرسانی

// تعریف نام کش
const CACHE_NAME = 'gym-sync-app-v258';

// فایل‌های اصلی برای کش کردن
const STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

// نصب سرویس ورکر
self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  
  // کش کردن فایل‌های اصلی
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] کش کردن فایل‌های اصلی');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // فقط در صورتی که قبلاً سرویس ورکری فعال نبوده باشد skipWaiting را فراخوانی می‌کنیم
        if (!self.registration.active) {
          return self.skipWaiting();
        }
      })
  );
});

// فعال‌سازی سرویس ورکر
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] فعال‌سازی');
  
  // حذف کش‌های قدیمی
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] حذف کش قدیمی:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // اعمال کنترل فقط در صورت نیاز
      return self.clients.matchAll().then(clients => {
        if (clients.length === 0) {
          // اگر هیچ کلاینت نبود، کنترل را بگیر
          return self.clients.claim();
        }
      });
    })
  );
});

// استراتژی کش: ابتدا کش، سپس شبکه و بروزرسانی کش در پس‌زمینه
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET را پردازش می‌کنیم
  if (event.request.method !== 'GET') return;

  // فقط درخواست‌های محلی را کش می‌کنیم
  if (!event.request.url.startsWith(self.location.origin)) return;

  // API درخواست‌ها را رد می‌کنیم
  if (event.request.url.includes('/api/')) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // استفاده از نسخه کش شده اگر موجود باشد
        if (cachedResponse) {
          // بروزرسانی کش در پس‌زمینه
          fetch(event.request)
            .then(response => {
              if (response.ok) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, response.clone()));
              }
            })
            .catch(() => {/* خطا را نادیده می‌گیریم چون قبلاً نسخه کش شده را برگردانده‌ایم */});
          
          return cachedResponse;
        }

        // گرفتن از شبکه اگر در کش نباشد
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) {
              return response;
            }

            // کش کردن پاسخ
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.log('[Service Worker] خطا در گرفتن از شبکه:', error);
            
            // برای درخواست‌های صفحه، صفحه آفلاین را برمی‌گردانیم
            if (event.request.mode === 'navigate') {
              return caches.match('./Offline.html');
            }
            
            // برای منابع دیگر، خطا را برمی‌گردانیم
            return new Response('خطا: شما آفلاین هستید و این منبع در کش موجود نیست.');
          });
      })
  );
});

// هنگامی که پیامی از برنامه دریافت می‌شود
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
