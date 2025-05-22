
// سرویس ورکر بهینه‌سازی شده - برای پشتیبانی آفلاین و بارگذاری سریع

// دریافت نسخه از manifest
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version || '1.7.9';
    self.CACHE_NAME = `gym-sync-v${version.replace(/\./g, '')}`;
    console.log(`[Service Worker] نسخه ${version} (کش: ${self.CACHE_NAME})`);
  })
  .catch(() => {
    self.CACHE_NAME = 'gym-sync-v179';
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

// نصب سرویس ورکر - کش کردن فایل‌های اصلی برای بارگذاری سریع
self.addEventListener('install', (event) => {
  console.log('[Service Worker] نصب سرویس ورکر');
  
  // فعال‌سازی فوری
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(self.CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] کش کردن فایل‌های اصلی');
        return cache.addAll(self.STATIC_ASSETS);
      })
      .catch(error => {
        console.error('[Service Worker] خطا در کش کردن:', error);
        // ادامه نصب حتی در صورت خطا
        return Promise.resolve();
      })
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
            if (cacheName !== self.CACHE_NAME && cacheName.startsWith('gym-sync-')) {
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
          return cachedResponse || createOfflineResponse(true);
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
          caches.open(self.CACHE_NAME).then(cache => {
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
        return createOfflineResponse(false);
      }
    })()
  );
});

// بروزرسانی کش در پس‌زمینه بدون ایجاد تاخیر در پاسخ
function updateCacheInBackground(request) {
  setTimeout(() => {
    fetch(request).then(response => {
      if (response.ok) {
        caches.open(self.CACHE_NAME).then(cache => {
          cache.put(request, response);
        });
      }
    }).catch(() => {
      // خطاهای شبکه را نادیده می‌گیریم
    });
  }, 0);
}

// ایجاد پاسخ آفلاین
function createOfflineResponse(isNavigationRequest) {
  if (isNavigationRequest) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="fa" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>حالت آفلاین - GymSync</title>
        <style>
          body {
            font-family: 'Vazirmatn', system-ui, sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 1rem;
            text-align: center;
          }
          .container {
            max-width: 28rem;
            padding: 2rem;
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          h1 {
            color: #7c3aed;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          p {
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }
          .button {
            background-color: #7c3aed;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
          }
          .button:hover {
            background-color: #6d28d9;
          }
          .icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #7c3aed;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">⚡️</div>
          <h1>حالت آفلاین</h1>
          <p>شما در حال حاضر به اینترنت متصل نیستید، اما نگران نباشید! تمام امکانات برنامه در حالت آفلاین نیز در دسترس هستند.</p>
          <p>پس از اتصال مجدد به اینترنت، تغییرات به صورت خودکار همگام‌سازی خواهند شد.</p>
          <button class="button" onclick="window.location.href='./'">بازگشت به برنامه</button>
        </div>
        <script>
          window.addEventListener('online', function() {
            window.location.reload();
          });
        </script>
      </body>
      </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      }
    );
  }
  
  // برای درخواست‌های غیر مسیریابی
  return new Response('آفلاین - داده در دسترس نیست', {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
  });
}

// هنگامی که پیامی از برنامه دریافت می‌شود
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
