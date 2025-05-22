
// هندلرهای رویداد اصلی سرویس ورکر
import { initializeConfig } from './config.js';
import { cacheInitialAssets, cleanupOldCaches, fetchWithCacheFallback } from './cache-core.js';
import { createOfflineResponse, createCleanRequest } from './utils.js';

// راه‌اندازی تمام هندلرها
export function registerEventHandlers() {
  // @ts-ignore
  initializeConfig().then(cacheName => {
    // زمانی که پیکربندی آماده شد، هندلرها را راه‌اندازی کن
    registerInstallHandler();
    registerActivateHandler();
    registerFetchHandler();
    registerMessageHandler();
    registerPeriodicSyncHandler();
  });
}

// هندلر نصب
export function registerInstallHandler() {
  self.addEventListener('install', (event) => {
    console.log('[Service Worker] نصب سرویس ورکر');
    
    // فعال‌سازی فوری
    self.skipWaiting();
    
    // @ts-ignore
    event.waitUntil(
      // @ts-ignore
      cacheInitialAssets(self.CACHE_NAME, self.STATIC_ASSETS)
        .catch(error => {
          console.error('[Service Worker] خطا در کش کردن:', error);
          // ادامه نصب حتی در صورت خطا
          return Promise.resolve();
        })
    );
  });
}

// هندلر فعال‌سازی
export function registerActivateHandler() {
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] فعال‌سازی سرویس ورکر');
    
    // @ts-ignore
    event.waitUntil(
      Promise.all([
        // حذف کش‌های قدیمی
        // @ts-ignore
        cleanupOldCaches(self.CACHE_NAME),
        
        // فعال کردن navigation preload برای سرعت بیشتر
        (async function() {
          // فقط اگر پشتیبانی شود
          // @ts-ignore
          if (self.registration.navigationPreload) {
            // @ts-ignore
            await self.registration.navigationPreload.enable();
            console.log('[Service Worker] Navigation preload فعال شد');
          }
        })(),
        
        // اعمال فوری کنترل روی تمام کلاینت‌ها
        // @ts-ignore
        self.clients.claim()
      ])
    );
  });
}

// هندلر درخواست‌ها (fetch)
export function registerFetchHandler() {
  self.addEventListener('fetch', (event) => {
    // فقط درخواست‌های GET را پردازش می‌کنیم
    if (event.request.method !== 'GET') return;

    // فقط درخواست‌های محلی را کش می‌کنیم
    // @ts-ignore
    if (!event.request.url.startsWith(self.location.origin)) return;

    // API درخواست‌ها را رد می‌کنیم
    if (event.request.url.includes('/api/')) return;
    
    // تشخیص درخواست‌های مسیریابی (صفحات HTML)
    if (event.request.mode === 'navigate') {
      // @ts-ignore
      event.respondWith(
        (async () => {
          try {
            // استفاده از navigation preload اگر در دسترس باشد
            // @ts-ignore
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            }
            
            // در غیر این صورت از شبکه استفاده کن
            return await fetch(event.request, { cache: 'no-store' });
          } catch (error) {
            // در صورت خطا از کش استفاده کن
            const cachedResponse = await caches.match('./index.html');
            // @ts-ignore
            return cachedResponse || createOfflineResponse(true);
          }
        })()
      );
      return;
    }
    
    // ایجاد درخواست تمیز
    // @ts-ignore
    const cleanRequest = createCleanRequest(event.request);

    // برای سایر درخواست‌ها (منابع استاتیک)
    // @ts-ignore
    event.respondWith(
      // @ts-ignore
      fetchWithCacheFallback(cleanRequest, self.CACHE_NAME)
        .catch(error => {
          console.error(`[Service Worker] خطا در دریافت: ${cleanRequest.url}`, error);
          
          // اگر منبع تصویر بود، تصویر پیش‌فرض را برگردان
          if (cleanRequest.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return caches.match('./Assets/Image/Place-Holder.svg');
          }
          
          // برای سایر منابع پاسخ آفلاین را برگردان
          // @ts-ignore
          return createOfflineResponse(false);
        })
    );
  });
}

// هندلر پیام‌ها
export function registerMessageHandler() {
  self.addEventListener('message', (event) => {
    if (!event.data) return;
    
    switch (event.data.type) {
      case 'SKIP_WAITING':
        console.log('[Service Worker] درخواست اجرای فوری دریافت شد');
        // @ts-ignore
        self.skipWaiting();
        break;
        
      case 'CHECK_FOR_UPDATES':
        console.log('[Service Worker] بررسی بروزرسانی‌ها');
        // @ts-ignore
        if (self.registration) {
          // @ts-ignore
          self.registration.update();
        }
        break;
        
      case 'REFRESH_CACHE':
        console.log('[Service Worker] درخواست بروزرسانی کش');
        // @ts-ignore
        cacheInitialAssets(self.CACHE_NAME, self.STATIC_ASSETS);
        break;
        
      default:
        console.log(`[Service Worker] نوع پیام ناشناخته: ${event.data.type}`);
    }
  });
}

// هندلر همگام‌سازی دوره‌ای
export function registerPeriodicSyncHandler() {
  // اگر پشتیبانی شود
  // @ts-ignore
  if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', (event) => {
      // @ts-ignore
      if (event.tag === 'cache-update') {
        console.log('[Service Worker] همگام‌سازی دوره‌ای');
        // @ts-ignore
        event.waitUntil(cacheInitialAssets(self.CACHE_NAME, self.STATIC_ASSETS));
      }
    });
  }
}

// تزریق به فضای نام سراسری
// @ts-ignore
self.registerEventHandlers = registerEventHandlers;
