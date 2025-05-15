
// Main service worker entry point that orchestrates all modules
// This file serves as the entry point for the service worker

// Import app version from manifest
const APP_VERSION = 'gym-sync'; // Base name, version will be appended

// Define global scope for TypeScript
self.CACHE_NAME = `${APP_VERSION}-v17`;
self.BASE_PATH = self.location.pathname.replace(/\/[^/]*$/, '/');

// Core service worker functionality
self.addEventListener('install', event => {
  // Get version dynamically
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      const version = manifest.version || '1.0.0';
      console.log(`[Service Worker] Installing v${version}`);
    })
    .catch(err => {
      console.log('[Service Worker] Installing (version fetch failed)');
    });
  
  event.waitUntil(
    caches.open(self.CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          './',
          './index.html',
          './Offline.html',
          './Assets/Image/Logo.png',
          './Assets/Image/Place-Holder.svg',
          './Manifest.json',
          './assets/index.css',
          './assets/index.js'
        ]);
      })
      .catch(error => {
        console.error('[Service Worker] Cache failed', error);
        return Promise.resolve();
      })
  );
});

self.addEventListener('activate', event => {
  // Get version dynamically
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      const version = manifest.version || '1.0.0';
      console.log(`[Service Worker] Activated v${version}`);
    })
    .catch(err => {
      console.log('[Service Worker] Activated (version fetch failed)');
    });
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== self.CACHE_NAME) {
              console.log('[Service Worker] Clearing Old Cache:', cacheName);
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || 
      !event.request.url.startsWith(self.location.origin) ||
      event.request.url.includes('/api/') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Update cache in background
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200) {
                caches.open(self.CACHE_NAME)
                  .then(cache => cache.put(event.request, response.clone()));
              }
            })
            .catch(() => {});
          
          return cachedResponse;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(self.CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch failed:', error);
            
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html')
                .then(indexResponse => {
                  return indexResponse || new Response(
                    '<html><body dir="rtl"><h1>حالت آفلاین</h1><p>لطفا اتصال اینترنت خود را بررسی کنید.</p></body></html>',
                    {status: 200, headers: {'Content-Type': 'text/html; charset=UTF-8'}}
                  );
                });
            }
            
            return new Response('خطای سرویس ورکر', {
              status: 500,
              headers: {'Content-Type': 'text/plain; charset=UTF-8'}
            });
          });
      })
  );
});

self.addEventListener('message', event => {
  if (!event.data) return;
  
  // Get version dynamically for logs
  let appVersion = '1.0.0';
  fetch('./Manifest.json')
    .then(response => response.json())
    .then(manifest => {
      appVersion = manifest.version || '1.0.0';
    })
    .catch(() => {});
    
  switch (event.data.type) {
    case 'SKIP_WAITING':
      console.log(`[Service Worker] Skip waiting command received (v${appVersion})`);
      self.skipWaiting();
      break;
    case 'CHECK_FOR_UPDATES':
      self.registration && self.registration.update();
      break;
    case 'REFRESH_CACHE':
      caches.open(self.CACHE_NAME)
        .then(cache => {
          return cache.addAll([
            './',
            './index.html',
            './Assets/Image/Logo.png',
            './Manifest.json',
            './assets/index.css',
            './assets/index.js'
          ]);
        })
        .then(() => console.log(`[Service Worker] Cache refreshed (v${appVersion})`));
      break;
    default:
      console.log(`[Service Worker] Unhandled message type: ${event.data.type}`);
  }
});

self.addEventListener('periodicsync', event => {
  if (event.tag === 'cache-update') {
    // Get version dynamically for logs
    fetch('./Manifest.json')
      .then(response => response.json())
      .then(manifest => {
        const version = manifest.version || '1.0.0';
        console.log(`[Service Worker] Periodic cache update (v${version})`);
      })
      .catch(() => {
        console.log('[Service Worker] Periodic cache update');
      });
      
    event.waitUntil(
      caches.open(self.CACHE_NAME)
        .then(cache => {
          return cache.addAll([
            './',
            './index.html',
            './Assets/Image/Logo.png',
            './Manifest.json',
            './assets/index.css',
            './assets/index.js'
          ]);
        })
    );
  }
});

// Get version for startup log
fetch('./Manifest.json')
  .then(response => response.json())
  .then(manifest => {
    const version = manifest.version || '1.0.0';
    console.log(`[Service Worker] Starting Service Worker v${version}`);
  })
  .catch(() => {
    console.log('[Service Worker] Starting Service Worker');
  });
