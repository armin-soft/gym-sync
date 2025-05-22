
// هندلرهای رویداد اصلی سرویس ورکر

// راه‌اندازی تمام هندلرها
function registerEventHandlers() {
  registerInstallHandler();
  registerActivateHandler();
  registerFetchHandler();
  registerMessageHandler();
  registerPeriodicSyncHandler();
}

// هندلر نصب
function registerInstallHandler() {
  self.addEventListener('install', (event) => {
    console.log('[Service Worker] نصب سرویس ورکر');
    
    // فعال‌سازی فوری
    self.skipWaiting();
    
    event.waitUntil(
      self.cacheInitialAssets()
        .catch(error => {
          console.error('[Service Worker] خطا در کش کردن:', error);
          // ادامه نصب حتی در صورت خطا
          return Promise.resolve();
        })
    );
  });
}

// هندلر فعال‌سازی
function registerActivateHandler() {
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] فعال‌سازی سرویس ورکر');
    
    event.waitUntil(
      Promise.all([
        // حذف کش‌های قدیمی
        self.cleanupOldCaches(),
        
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
}

// هندلر درخواست‌ها (fetch)
function registerFetchHandler() {
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
            
            // در غیر این صورت از شبکه استفاده کن
            return await fetch(event.request, { cache: 'no-store' });
          } catch (error) {
            // در صورت خطا از کش استفاده کن
            const cachedResponse = await caches.match('./index.html');
            return cachedResponse || self.createOfflineResponse(true);
          }
        })()
      );
      return;
    }
    
    // ایجاد درخواست تمیز
    const cleanRequest = self.createCleanRequest(event.request);

    // برای سایر درخواست‌ها (منابع استاتیک)
    event.respondWith(
      self.fetchWithCacheFallback(cleanRequest)
        .catch(error => {
          console.error(`[Service Worker] خطا در دریافت: ${cleanRequest.url}`, error);
          
          // اگر منبع تصویر بود، تصویر پیش‌فرض را برگردان
          if (cleanRequest.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return caches.match('./Assets/Image/Place-Holder.svg');
          }
          
          // برای سایر منابع پاسخ آفلاین را برگردان
          return self.createOfflineResponse(false);
        })
    );
  });
}

// هندلر پیام‌ها
function registerMessageHandler() {
  self.addEventListener('message', (event) => {
    if (!event.data) return;
    
    switch (event.data.type) {
      case 'SKIP_WAITING':
        console.log('[Service Worker] درخواست اجرای فوری دریافت شد');
        self.skipWaiting();
        break;
        
      case 'CHECK_FOR_UPDATES':
        console.log('[Service Worker] بررسی بروزرسانی‌ها');
        if (self.registration) {
          self.registration.update();
        }
        break;
        
      case 'REFRESH_CACHE':
        console.log('[Service Worker] درخواست بروزرسانی کش');
        self.cacheInitialAssets();
        break;
        
      default:
        console.log(`[Service Worker] نوع پیام ناشناخته: ${event.data.type}`);
    }
  });
}

// هندلر همگام‌سازی دوره‌ای
function registerPeriodicSyncHandler() {
  // اگر پشتیبانی شود
  if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', (event) => {
      if (event.tag === 'cache-update') {
        console.log('[Service Worker] همگام‌سازی دوره‌ای');
        event.waitUntil(self.cacheInitialAssets());
      }
    });
  }
}

// اکسپورت راه‌اندازی هندلرها
self.registerEventHandlers = registerEventHandlers;

console.log('[Service Worker] فایل هندلرهای رویداد بارگذاری شد');
