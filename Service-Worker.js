
// سرویس ورکر اصلی - بهینه‌سازی شده
// تنها نقطه ورودی سرویس ورکر

self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] فعال‌سازی سرویس ورکر');
  event.waitUntil(self.clients.claim());
  
  // حذف کش‌های قدیمی
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('gym-sync-') && cacheName !== 'gym-sync-v222';
        }).map(cacheName => {
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
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request)
          .then(response => {
            // نسخه‌ای کش شده از پاسخ ایجاد می‌کنیم
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            
            caches.open('gym-sync-v222')
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // برای صفحات ناوبری، index.html را برگردان
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            
            // برای تصاویر، تصویر پیش‌فرض را برگردان
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match('./Assets/Image/Place-Holder.svg');
            }
            
            // در غیر این صورت، پیام خطای آفلاین را برگردان
            return new Response('آفلاین - داده در دسترس نیست');
          });
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[Service Worker] نسخه اصلی راه‌اندازی شد');
