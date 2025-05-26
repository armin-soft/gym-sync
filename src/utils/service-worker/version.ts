
/**
 * مدیریت نسخه برنامه از فایل Manifest.json
 */

// دریافت نسخه از فایل Manifest.json با کش کردن نتیجه
export const getAppVersionFromManifest = async (): Promise<string> => {
  try {
    // ابتدا از localStorage بخوان اگر موجود است
    const cachedVersion = localStorage.getItem('app_version');
    
    // تلاش برای دریافت از سرور
    try {
      const response = await fetch('./Manifest.json');
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const manifest = await response.json();
      // ذخیره نسخه تازه در localStorage
      if (manifest.version) {
        localStorage.setItem('app_version', manifest.version);
      }
      return manifest.version;
    } catch (error) {
      console.warn('خطا در بارگیری نسخه از منیفست، استفاده از نسخه کش شده:', error);
      // اگر نسخه کش شده داریم، از آن استفاده کن
      if (cachedVersion) return cachedVersion;
      
      // تلاش مجدد با درخواست تازه
      try {
        const retryResponse = await fetch('./Manifest.json', { 
          cache: 'reload',
          mode: 'no-cors' // اضافه کردن no-cors برای تحمل خطای بیشتر
        });
        if (retryResponse.type === 'opaque') {
          // درخواست no-cors نمی‌تواند محتوا را بخواند، پس از نسخه پیش‌فرض استفاده می‌کنیم
          return cachedVersion || '3.3.2'; // استفاده از نسخه پیش‌فرض اگر کش نداشتیم
        }
        const retryData = await retryResponse.json();
        return retryData.version;
      } catch (retryError) {
        console.error('خطای دوم در بارگیری نسخه:', retryError);
        // استفاده از نسخه پیش‌فرض یا کش شده
        return cachedVersion || '3.3.2';
      }
    }
  } catch (finalError) {
    console.error('خطای نهایی در بارگیری نسخه:', finalError);
    return '3.3.2'; // همیشه یک مقدار برگشت بده
  }
};
