
// سرویس ورکر بهینه‌سازی شده - برای پشتیبانی آفلاین و بارگذاری سریع

// تعریف نام کش
const CACHE_NAME = 'gym-sync-app-v327';

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
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] کش کردن فایل‌های اصلی');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting()) // اعمال فوری سرویس ورکر جدید
  );
});

// فعال‌سازی سرویس ورکر - پاکسازی کش‌های قدیمی و گرفتن کنترل سریع صفحات
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] فعال‌سازی');
  
  event.waitUntil(
    Promise.all([
      // حذف کش‌های قدیمی
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] حذف کش قدیمی:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // فعال کردن navigation preload برای سرعت بیشتر
      (async function() {
        // فقط اگر پشتیبانی شود
        if (self.registration.navigationPreload) {
          await self.registration.navigationPreload.enable();
          console.log('[Service Worker] Navigation preload فعال شد');
        }
      })(),
      
      // اعمال فوری کنترل روی تمام کلاینت‌ها
      self.clients.claim()
    ])
  );
});

// بهبود استراتژی کش برای مسیریابی بهتر
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET را پردازش می‌کنیم
  if (event.request.method !== 'GET') return;

  // فقط درخواست‌های محلی را کش می‌کنیم
  if (!event.request.url.startsWith(self.location.origin)) return;

  // API درخواست‌ها را رد می‌کنیم
  if (event.request.url.includes('/api/')) return;
  
  // تشخیص درخواست‌های مسیریابی (صفحات HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // استفاده از navigation preload اگر در دسترس باشد
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          
          // در غیر این صورت از شبکه با کش no-store استفاده کن
          return await fetch(event.request, { cache: 'no-store' });
        } catch (error) {
          // در صورت خطا از کش استفاده کن
          const cachedResponse = await caches.match('./index.html');
          return cachedResponse || new Response('صفحه در دسترس نیست', { 
            status: 503, 
            headers: {'Content-Type': 'text/html'} 
          });
        }
      })()
    );
    return;
  }

  // برای سایر درخواست‌ها (منابع استاتیک)
  event.respondWith(
    (async function() {
      // فوری از کش بخوان
      const cachedResponse = await caches.match(event.request);
      
      if (cachedResponse) {
        // بروزرسانی در پس‌زمینه بدون انتظار
        updateCacheInBackground(event.request);
        return cachedResponse;
      }
      
      try {
        // اگر در کش نبود، از شبکه بگیر
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
        // اگر منبع تصویر بود، تصویر پیش‌فرض را برگردان
        if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          return caches.match('./Assets/Image/Place-Holder.svg');
        }
        
        // برای سایر منابع خطای معمولی را برگردان
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
