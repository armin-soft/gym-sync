// سرویس ورکر اصلی - بهینه‌سازی و تحمل خطای بالا

// متغیر برای نام کش
const CACHE_NAME = 'gym-sync-v234'; // Updated from v230 to v234

// لیست منابع برای کش
const STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json', // Manifest itself is cached
  './assets/index.css',
  './assets/index.js'
];

// نصب سرویس ورکر و کش منابع استاتیک
self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] کش کردن منابع استاتیک');
        // کش کردن هر منبع جداگانه برای جلوگیری از شکست کامل فرآیند کش
        const cachePromises = STATIC_ASSETS.map(url => {
          // For Manifest.json, ensure it's fetched fresh during SW install
          const request = (url === './Manifest.json') ? new Request(url, { cache: 'reload' }) : new Request(url);
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                return cache.put(url, response);
              }
              console.warn(`[Service Worker] خطا در کش: ${url} - وضعیت: ${response.status}`);
              return Promise.resolve();
            })
            .catch(err => {
              console.warn(`[Service Worker] خطا در کش ${url}:`, err);
              return Promise.resolve(); // ادامه با فایل بعدی
            });
        });
        
        return Promise.allSettled(cachePromises);
      })
      .catch(error => {
        console.error('[Service Worker] خطا در فرآیند نصب:', error);
      })
  );
  
  // اجازه می‌دهیم نسخه جدید بلافاصله کنترل را به دست بگیرد
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] فعال‌سازی سرویس ورکر');
  
  // گرفتن کنترل بلافاصله، بدون نیاز به رفرش صفحه
  event.waitUntil(self.clients.claim());
  
  // حذف کش‌های قدیمی
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('gym-sync-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log(`[Service Worker] حذف کش قدیمی: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // پردازش درخواست‌های شبکه
  if (event.request.method !== 'GET') return;
  
  // درخواست‌های API را رد می‌کنیم
  if (event.request.url.includes('/api/')) return;
  
  // استراتژی کش: اول کش، سپس شبکه، با امکان بروزرسانی کش
  event.respondWith(
    (async () => {
      try {
        // تلاش برای پیدا کردن پاسخ از کش
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          // بروزرسانی کش در پس‌زمینه
          fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, response.clone());
                });
              }
            })
            .catch(() => {/* خطا را نادیده بگیر */});
          
          return cachedResponse;
        }
        
        // در صورت نبود در کش، از شبکه دریافت کنیم
        const networkResponse = await fetch(event.request);
        
        // کش کردن پاسخ برای استفاده‌های بعدی
        if (networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
      } catch (error) {
        // در صورت خطای شبکه، محتوای آفلاین را برگردان
        
        // برای صفحات ناوبری، index.html را برگردان
        if (event.request.mode === 'navigate') {
          const cachedIndex = await caches.match('./index.html');
          if (cachedIndex) return cachedIndex;
        }
        
        // برای تصاویر، تصویر پیش‌فرض را برگردان
        if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
          const cachedImage = await caches.match('./Assets/Image/Place-Holder.svg');
          if (cachedImage) return cachedImage;
        }
        
        // در غیر این صورت، پیام خطای آفلاین را برگردان
        return new Response('آفلاین - داده در دسترس نیست', {
          headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
        });
      }
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] درخواست SKIP_WAITING دریافت شد');
    self.skipWaiting();
  }
});

console.log('[Service Worker] نسخه جدید با تحمل خطای بالا راه‌اندازی شد');
