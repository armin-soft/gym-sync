
// سرویس ورکر بهینه‌سازی شده - برای پشتیبانی آفلاین و بارگذاری سریع

// تعریف نام کش
const CACHE_NAME = 'gym-sync-app-v267';

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

// نصب سرویس ورکر - کش کردن فایل‌های اصلی برای بارگذاری سریع
self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  
  // کش کردن فایل‌های اصلی
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] کش کردن فایل‌های اصلی');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()) // اعمال فوری سرویس ورکر جدید
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
    }).then(() => self.clients.claim()) // اعمال فوری کنترل روی تمام کلاینت‌ها
  );
});

// استراتژی کش بهبود یافته: 
// 1. اگر کش موجود باشد فوراً استفاده کن
// 2. همزمان درخواست شبکه را انجام بده و کش را بروز کن (اما منتظر نتیجه نباش)
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET را پردازش می‌کنیم
  if (event.request.method !== 'GET') return;

  // فقط درخواست‌های محلی را کش می‌کنیم
  if (!event.request.url.startsWith(self.location.origin)) return;

  // API درخواست‌ها را رد می‌کنیم
  if (event.request.url.includes('/api/')) return;

  // استراتژی سریع: اول کش، سپس شبکه در پس‌زمینه
  event.respondWith(
    (async function() {
      // فوری از کش بخوان
      const cachedResponse = await caches.match(event.request);
      
      if (cachedResponse) {
        // بروزرسانی در پس‌زمینه بدون انتظار
        updateCacheInBackground(event.request);
        return cachedResponse;
      }
      
      // اگر در کش نبود، از شبکه بگیر
      try {
        const networkResponse = await fetch(event.request);
        
        // نتیجه را در کش ذخیره کن
        if (networkResponse.ok) {
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clonedResponse);
          });
        }
        
        return networkResponse;
      } catch (error) {
        // اگر در حالت آفلاین هستیم، صفحه آفلاین را برگردان
        if (event.request.mode === 'navigate') {
          const offlinePage = await caches.match('./Offline.html');
          if (offlinePage) return offlinePage;
        }
        
        throw error;
      }
    })()
  );
});

// بروزرسانی کش در پس‌زمینه بدون ایجاد تاخیر در پاسخ
function updateCacheInBackground(request) {
  setTimeout(() => {
    fetch(request).then(response => {
      if (response.ok) {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, response);
        });
      }
    }).catch(() => {
      // خطاهای شبکه را نادیده می‌گیریم
    });
  }, 0);
}

// هنگامی که پیامی از برنامه دریافت می‌شود
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
