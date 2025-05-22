
// مدیریت کش سرویس ورکر
import * as logger from './utils/logger.js';

// کش کردن فایل‌های اصلی
export async function cacheInitialAssets(cacheName, assets) {
  try {
    const cache = await caches.open(cacheName);
    logger.info('کش کردن فایل‌های اصلی');
    
    // کش کردن فایل به فایل برای جلوگیری از شکست کامل عملیات
    const cachePromises = assets.map(url => {
      return fetch(new Request(url, { cache: 'reload' }))
        .then(response => {
          if (!response || response.status !== 200) {
            logger.info(`خطا در کش: ${url} - وضعیت: ${response ? response.status : 'نامشخص'}`);
            return;
          }
          return cache.put(url, response);
        })
        .catch(err => {
          logger.error(`خطا در کش ${url}`, err);
          return Promise.resolve();
        });
    });
    
    return Promise.all(cachePromises);
  } catch (err) {
    logger.error('خطا در کش اولیه', err);
    return Promise.resolve(); // ادامه نصب حتی در صورت خطا
  }
}

// حذف کش‌های قدیمی
export async function cleanupOldCaches(currentCacheName) {
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName !== currentCacheName && cacheName.startsWith('gym-sync-')) {
        logger.info(`حذف کش قدیمی: ${cacheName}`);
        return caches.delete(cacheName);
      }
    })
  );
}

// بروزرسانی کش در پس‌زمینه
export function updateCacheInBackground(request, cacheName) {
  setTimeout(() => {
    fetch(request).then(response => {
      if (response.ok) {
        caches.open(cacheName).then(cache => {
          cache.put(request, response);
        });
      }
    }).catch(() => {
      // خطاهای شبکه را نادیده می‌گیریم
    });
  }, 0);
}

// بروزرسانی کامل کش
export async function refreshCache(cacheName, assets) {
  logger.info('بروزرسانی کامل کش');
  return cacheInitialAssets(cacheName, assets);
}

// استراتژی کش: اول از کش، سپس از شبکه
export async function fetchWithCacheFallback(request, cacheName) {
  try {
    // بررسی کش
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // بروزرسانی در پس‌زمینه
      updateCacheInBackground(request, cacheName);
      return cachedResponse;
    }
    
    // دریافت از شبکه
    const networkResponse = await fetch(request);
    
    // ذخیره در کش
    if (networkResponse.ok) {
      const clonedResponse = networkResponse.clone();
      caches.open(cacheName).then(cache => {
        cache.put(request, clonedResponse);
      });
    }
    
    return networkResponse;
  } catch (error) {
    logger.error(`خطا در دریافت: ${request.url}`, error);
    throw error; // انتقال خطا به هندلر
  }
}

// تزریق توابع به فضای نام سراسری
// @ts-ignore
self.cacheInitialAssets = function() {
  // @ts-ignore
  return cacheInitialAssets(self.CACHE_NAME, self.STATIC_ASSETS);
};

// @ts-ignore
self.cleanupOldCaches = function() {
  // @ts-ignore
  return cleanupOldCaches(self.CACHE_NAME);
};

// @ts-ignore
self.updateCacheInBackground = function(request) {
  // @ts-ignore
  return updateCacheInBackground(request, self.CACHE_NAME);
};

// @ts-ignore
self.fetchWithCacheFallback = function(request) {
  // @ts-ignore
  return fetchWithCacheFallback(request, self.CACHE_NAME);
};

logger.info('ماژول cache-core بارگذاری شد');
