
/**
 * Gets the base path for the application based on the current window location
 * Fixed for universal deployment compatibility
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
    
    // برای production: استفاده از pathname اما تنها در صورت نیاز
    const pathname = window.location.pathname;
    
    // اگر در ریشه دامنه هستیم، مسیر خالی برگردان
    if (pathname === '/' || pathname === '/index.html') {
      console.log("Using root path for domain root");
      return '';
    }
    
    // اگر در پوشه‌ای هستیم، آن پوشه را به عنوان base path برگردان
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && !pathSegments[pathSegments.length - 1].includes('.')) {
      const basePath = '/' + pathSegments.join('/');
      console.log("Using subdirectory base path:", basePath);
      return basePath;
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
 */
export function getAssetPath(assetPath: string): string {
  const basePath = getBasePath();
  const cleanAssetPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  const fullPath = basePath + cleanAssetPath;
  console.log('Asset path resolved:', { assetPath, basePath, fullPath });
  return fullPath;
}
