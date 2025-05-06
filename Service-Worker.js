
// This is the service worker for the application
// It handles caching and offline functionality

const CACHE_NAME = 'gym-sync-v6'; // افزایش نسخه کش

// Assets to cache - use relative paths instead of absolute
const STATIC_ASSETS = [
  './',
  './index.html',
  './Manifest.json',
  './Assets/Image/Logo.png',
  './Assets/Script/index.js',
  './Assets/Style/Menu.css'
];

// نسخه فعلی برنامه
let currentAppVersion = '';

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing');
  
  // Skip waiting to activate immediately
  self.skipWaiting();
  
  // خواندن نسخه فعلی از مانیفست
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(data => {
      currentAppVersion = data.version || '';
      console.log('[Service Worker] Current app version:', currentAppVersion);
    })
    .catch(err => {
      console.error('[Service Worker] Failed to read manifest:', err);
    });
  
  // Use a more resilient caching strategy
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching Files');
        return cache.addAll(STATIC_ASSETS).catch(err => {
          console.error('[Service Worker] Failed to cache all resources:', err);
          
          // If bulk caching fails, try individual items
          return Promise.all(
            STATIC_ASSETS.map(url => 
              fetch(new Request(url, { cache: 'reload' }))
                .then(response => {
                  if (!response || response.status !== 200) {
                    console.log(`[Service Worker] Failed to cache: ${url} - Status: ${response ? response.status : 'unknown'}`);
                    return;
                  }
                  return cache.put(url, response);
                })
                .catch(err => {
                  console.log(`[Service Worker] Error caching ${url}: ${err}`);
                  // Continue despite errors
                  return Promise.resolve();
                })
            )
          );
        });
      })
      .catch(err => {
        console.error('[Service Worker] Cache error during installation', err);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated');
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing Old Cache', cache);
            return caches.delete(cache);
          }
          return Promise.resolve();
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Claiming clients');
      return self.clients.claim(); // اطمینان از کنترل همه کلاینت‌ها
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and requests to external resources
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip analytics, API calls, etc.
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('analytics') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }
  
  // اگر درخواست برای مانیفست است، نسخه را بروزرسانی کن
  if (event.request.url.includes('Manifest.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) {
            return caches.match(event.request);
          }
          
          // کلون کردن پاسخ برای پردازش
          const clonedResponse = response.clone();
          
          // خواندن و ذخیره نسخه جدید
          clonedResponse.json().then(data => {
            const newVersion = data.version || '';
            console.log('[Service Worker] Manifest fetched, version:', newVersion);
            
            // ذخیره نسخه جدید
            currentAppVersion = newVersion;
          });
          
          // کش کردن نسخه جدید مانیفست
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
          });
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Remove any patternUrl variables from the URL to avoid caching issues
  const cleanUrl = event.request.url.replace(/\${patternUrl}/g, '');
  const cleanRequest = cleanUrl !== event.request.url ? 
    new Request(cleanUrl, { 
      method: event.request.method,
      headers: event.request.headers,
      mode: event.request.mode,
      credentials: event.request.credentials
    }) : event.request;

  console.log('[Service Worker] Fetching', cleanUrl);
  
  // استراتژی Network First برای منابع اصلی و static
  const isMainResource = cleanUrl.endsWith('/') || 
                         cleanUrl.endsWith('.html') || 
                         cleanUrl.endsWith('.js') || 
                         cleanUrl.endsWith('.css');
  
  if (isMainResource) {
    // برای منابع اصلی، اول از شبکه استفاده کن
    event.respondWith(
      fetch(cleanRequest)
        .then(response => {
          // کش کردن پاسخ تازه
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(cleanRequest, responseToCache);
            })
            .catch(err => {
              console.error('[Service Worker] Failed to cache response:', err);
            });
          
          return response;
        })
        .catch(() => {
          // اگر شبکه در دسترس نبود، از کش استفاده کن
          return caches.match(cleanRequest)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // برای درخواست‌های ناوبری، صفحه آفلاین را برگردان
              if (cleanRequest.mode === 'navigate') {
                return caches.match('./');
              }
              
              return new Response('خطا در اتصال به شبکه. برنامه در حالت آفلاین است.', {
                status: 408,
                headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
              });
            });
        })
    );
  } else {
    // برای سایر منابع، اول کش را بررسی کن و سپس به شبکه برو
    event.respondWith(
      caches.match(cleanRequest)
        .then(cachedResponse => {
          // اگر در کش موجود است و نیاز به بروزرسانی نیست
          if (cachedResponse) {
            // در پس‌زمینه، کش را بروز کن
            fetch(cleanRequest)
              .then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return;
                }
                
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(cleanRequest, responseToCache);
                  })
                  .catch(err => {
                    console.log('[Service Worker] Failed to update cache for:', cleanUrl, err);
                  });
              })
              .catch(() => {
                // خطای شبکه، اما نسخه کش شده داریم، پس مشکلی نیست
              });
              
            return cachedResponse;
          }

          // در غیر این صورت از شبکه بگیر
          return fetch(cleanRequest)
            .then(response => {
              // اگر پاسخ معتبر نیست، کش نکن
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // پاسخ را کلون کن
              const responseToCache = response.clone();

              // به کش اضافه کن
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(cleanRequest, responseToCache);
                })
                .catch(err => {
                  console.error('[Service Worker] Failed to cache response:', err);
                });

              return response;
            })
            .catch(() => {
              // برای درخواست‌های ناوبری، صفحه آفلاین را برگردان
              if (cleanRequest.mode === 'navigate') {
                return caches.match('./');
              }
              
              // در غیر این صورت پاسخ خطا
              return new Response('خطا در اتصال به شبکه. برنامه در حالت آفلاین است.', {
                status: 408,
                headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
              });
            });
        })
        .catch(error => {
          console.error('[Service Worker] Error in fetch handler:', error);
          return new Response('خطای سرویس ورکر', {
            status: 500,
            headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
          });
        })
    );
  }
});

// بررسی آیا نسخه جدید است
function isNewVersion(newVersion, currentVersion) {
  if (!newVersion || !currentVersion) return false;
  
  // تبدیل نسخه‌ها به آرایه‌های عددی
  const newParts = newVersion.split('.').map(Number);
  const currentParts = currentVersion.split('.').map(Number);
  
  // مقایسه بخش‌های نسخه
  for (let i = 0; i < Math.max(newParts.length, currentParts.length); i++) {
    const newPart = newParts[i] || 0;
    const currentPart = currentParts[i] || 0;
    
    if (newPart > currentPart) return true;
    if (newPart < currentPart) return false;
  }
  
  // اگر همه بخش‌ها برابر باشند
  return false;
}

// Listen for messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    console.log('[Service Worker] Checking for updates...');
    
    // دریافت نسخه جدید از مانیفست
    fetch('./Manifest.json?t=' + new Date().getTime())
      .then(response => response.json())
      .then(data => {
        const newVersion = data.version || '';
        console.log('[Service Worker] Manifest version check - Current:', currentAppVersion, 'New:', newVersion);
        
        // فقط اگر نسخه جدید باشد، اعلان بروزرسانی نمایش داده شود
        if (isNewVersion(newVersion, currentAppVersion)) {
          console.log('[Service Worker] New version available:', newVersion);
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'UPDATE_AVAILABLE', 
                version: newVersion,
                currentVersion: currentAppVersion
              });
            });
          });
          
          // بروزرسانی سرویس ورکر
          self.registration.update();
        } else {
          console.log('[Service Worker] No new version available');
        }
      })
      .catch(err => {
        console.error('[Service Worker] Error checking for updates:', err);
      });
  }

  // افزودن پیام برای پاکسازی کش
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[Service Worker] Clearing all caches as requested');
    
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      ).then(() => {
        console.log('[Service Worker] All caches cleared successfully');
        // اعلام به کلاینت
        event.ports[0].postMessage({ result: 'success' });
      });
    });
  }
});
