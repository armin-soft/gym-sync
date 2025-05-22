
// مدیریت کش سرویس ورکر

// کش کردن فایل‌های اصلی
self.cacheInitialAssets = async function() {
  try {
    const cache = await caches.open(self.CACHE_NAME);
    console.log('[Service Worker] کش کردن فایل‌های اصلی');
    
    // کش کردن فایل به فایل برای جلوگیری از شکست کامل عملیات
    const cachePromises = self.STATIC_ASSETS.map(url => {
      return fetch(new Request(url, { cache: 'reload' }))
        .then(response => {
          if (!response || response.status !== 200) {
            console.log(`[Service Worker] خطا در کش: ${url} - وضعیت: ${response ? response.status : 'نامشخص'}`);
            return;
          }
          return cache.put(url, response);
        })
        .catch(err => {
          console.log(`[Service Worker] خطا در کش ${url}: ${err}`);
          return Promise.resolve();
        });
    });
    
    return Promise.all(cachePromises);
  } catch (err) {
    console.error('[Service Worker] خطا در کش اولیه:', err);
    return Promise.resolve(); // ادامه نصب حتی در صورت خطا
  }
};

// حذف کش‌های قدیمی
self.cleanupOldCaches = async function() {
  const cacheNames = await caches.keys();
  
  return Promise.all(
    cacheNames.map(cacheName => {
      if (cacheName !== self.CACHE_NAME && cacheName.startsWith('gym-sync-')) {
        console.log(`[Service Worker] حذف کش قدیمی: ${cacheName}`);
        return caches.delete(cacheName);
      }
    })
  );
};

// بروزرسانی کش در پس‌زمینه
self.updateCacheInBackground = function(request) {
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
};

// استراتژی کش: اول از کش، سپس از شبکه
self.fetchWithCacheFallback = async function(request) {
  try {
    // بررسی کش
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // بروزرسانی در پس‌زمینه
      self.updateCacheInBackground(request);
      return cachedResponse;
    }
    
    // دریافت از شبکه
    const networkResponse = await fetch(request);
    
    // ذخیره در کش
    if (networkResponse.ok) {
      const clonedResponse = networkResponse.clone();
      caches.open(self.CACHE_NAME).then(cache => {
        cache.put(request, clonedResponse);
      });
    }
    
    return networkResponse;
  } catch (error) {
    console.error(`[Service Worker] خطا در دریافت: ${request.url}`, error);
    throw error; // انتقال خطا به هندلر
  }
};

console.log('[Service Worker] فایل مدیریت کش بارگذاری شد');
