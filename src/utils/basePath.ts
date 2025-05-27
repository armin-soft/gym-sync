
/**
 * Gets the base path for the application based on the current window location
 * Optimized for universal deployment compatibility - auto-versioned from Manifest.json
 */
export function getBasePath(): string {
  // در محیط توسعه همیشه از مسیر اصلی استفاده کن
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode - using root path');
    return '';
  }
  
  // زمانی که در محیط مرورگر نیستیم
  if (typeof window === 'undefined') {
    console.log('No window object - using root path');
    return '';
  }
  
  try {
    console.log('Determining base path for production...');
    console.log('Current location:', window.location);
    
    const pathname = window.location.pathname;
    
    // اگر در ریشه دامنه هستیم یا فایل index.html
    if (pathname === '/' || pathname === '/index.html' || pathname.endsWith('/')) {
      console.log("Using root path for domain root");
      return '';
    }
    
    // اگر در پوشه‌ای هستیم، آن پوشه را به عنوان base path برگردان
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      // حذف index.html اگر در آخر مسیر باشد
      if (pathSegments[pathSegments.length - 1] === 'index.html') {
        pathSegments.pop();
      }
      
      if (pathSegments.length > 0) {
        const basePath = '/' + pathSegments.join('/');
        console.log("Using subdirectory base path:", basePath);
        return basePath;
      }
    }
    
    console.log("Using empty base path as fallback");
    return '';
  } catch (e) {
    console.error("Error determining base path:", e);
    return '';
  }
}

/**
 * Gets the full URL for an asset based on the base path
 * Optimized for build output structure
 */
export function getAssetPath(assetPath: string): string {
  const basePath = getBasePath();
  
  // اگر مسیر به صورت مطلق است، همان‌طور که هست برگردان
  if (assetPath.startsWith('http') || assetPath.startsWith('//')) {
    return assetPath;
  }
  
  // تنظیم مسیر asset برای ساختار جدید
  let cleanAssetPath = assetPath;
  
  // اگر مسیر قدیمی Assets/Image استفاده شده، به مسیر جدید تبدیل کن
  if (cleanAssetPath.includes('Assets/Image/')) {
    cleanAssetPath = cleanAssetPath.replace('Assets/Image/', 'assets/images/');
  }
  
  // اطمینان از شروع با /
  if (!cleanAssetPath.startsWith('/')) {
    cleanAssetPath = '/' + cleanAssetPath;
  }
  
  const fullPath = basePath + cleanAssetPath;
  console.log('Asset path resolved:', { assetPath, basePath, fullPath });
  return fullPath;
}

/**
 * Helper function to get image paths for the new structure
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(`assets/images/${imageName}`);
}
