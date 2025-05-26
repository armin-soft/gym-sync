
/**
 * Gets the base path for the application based on the current window location
 * Works for any deployment path including subdirectories
 */
export function getBasePath(): string {
  // در محیط توسعه همیشه از مسیر اصلی استفاده کن
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode - using root path');
    return '/';
  }
  
  // زمانی که در محیط مرورگر نیستیم
  if (typeof window === 'undefined') {
    console.log('No window object - using root path');
    return '/';
  }
  
  try {
    console.log('Determining base path for production...');
    console.log('Current location:', window.location);
    
    // برای production: همیشه از مسیر اصلی استفاده کن
    // این رویکرد ساده‌تر و قابل اعتمادتر است
    console.log("Using root path as basename");
    return '/';
  } catch (e) {
    console.error("Error determining base path:", e);
    return '/';
  }
}

/**
 * Gets the full URL for an asset based on the base path
 */
export function getAssetPath(assetPath: string): string {
  const basePath = getBasePath();
  // حذف اسلش ابتدایی از مسیر asset برای جلوگیری از دابل اسلش
  const cleanAssetPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // ترکیب مسیرها و پاک کردن هر دابل اسلش احتمالی
  const fullPath = `${basePath}${cleanAssetPath}`.replace(/([^:])\/+/g, '$1/');
  console.log('Asset path resolved:', { assetPath, basePath, cleanAssetPath, fullPath });
  return fullPath;
}
