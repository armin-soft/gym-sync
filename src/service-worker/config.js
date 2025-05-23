
// پیکربندی سرویس ورکر

// فایل‌های اصلی برای کش کردن
export const STATIC_ASSETS = [
  './',
  './index.html',
  './Offline.html',
  './Assets/Image/Logo.png',
  './Assets/Image/Place-Holder.svg',
  './Manifest.json',
  './assets/index.css',
  './assets/index.js'
];

// دریافت نسخه از manifest و تولید نام کش
export async function initializeConfig() {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    const version = manifest.version;
    const formattedCacheName = `gym-sync-v${version.replace(/\./g, '')}`;
    
    // تزریق مقادیر به فضای نام سراسری
    // @ts-ignore
    self.CACHE_NAME = formattedCacheName;
    // @ts-ignore
    self.STATIC_ASSETS = STATIC_ASSETS;
    
    console.log(`[Service Worker] پیکربندی با نسخه ${version} راه‌اندازی شد`);
    return formattedCacheName;
  } catch (error) {
    console.error('[Service Worker] خطا در دریافت نسخه از manifest', error);
    
    // در صورت خطا، مجددا تلاش می‌کنیم تا نسخه را بخوانیم
    try {
      const manifestResponse = await fetch('./Manifest.json', { cache: 'reload' });
      const manifestData = await manifestResponse.json();
      const backupVersion = manifestData.version;
      const backupCacheName = `gym-sync-v${backupVersion.replace(/\./g, '')}`;
      
      // @ts-ignore
      self.CACHE_NAME = backupCacheName;
      // @ts-ignore
      self.STATIC_ASSETS = STATIC_ASSETS;
      
      return backupCacheName;
    } catch (secondError) {
      console.error('[Service Worker] خطای دوم در دریافت نسخه', secondError);
      
      // در صورت خطای مجدد، از منیفست در حافظه استفاده می‌کنیم
      // @ts-ignore
      const manifestFromCache = self.caches?.match('./Manifest.json')
        .then(response => response?.json())
        .then(data => data?.version || null)
        .catch(() => null);
      
      const fallbackVersion = await manifestFromCache;
      const fallbackCacheName = `gym-sync-v${(fallbackVersion || '').replace(/\./g, '')}`;
      
      // @ts-ignore
      self.CACHE_NAME = fallbackCacheName;
      // @ts-ignore
      self.STATIC_ASSETS = STATIC_ASSETS;
      
      return fallbackCacheName;
    }
  }
}

// تابع دریافت نسخه جداگانه برای استفاده در سایر قسمت‌ها
export async function getAppVersion() {
  try {
    const response = await fetch('./Manifest.json');
    const manifest = await response.json();
    return manifest.version;
  } catch (error) {
    console.error('[Service Worker] خطا در دریافت نسخه', error);
    
    try {
      // تلاش مجدد با درخواست تازه
      const retryResponse = await fetch('./Manifest.json', { cache: 'reload' });
      const retryData = await retryResponse.json();
      return retryData.version;
    } catch (retryError) {
      console.error('[Service Worker] خطای دوم در دریافت نسخه', retryError);
      
      // از کش استفاده می‌کنیم
      // @ts-ignore
      return self.caches?.match('./Manifest.json')
        .then(response => response?.json())
        .then(data => data?.version)
        .catch(cacheError => {
          console.error('[Service Worker] خطا در دریافت نسخه از کش', cacheError);
          return null;
        });
    }
  }
}
