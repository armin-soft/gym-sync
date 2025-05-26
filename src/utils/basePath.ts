
/**
 * Gets the base path for the application based on the current window location
 * Works for any deployment path including subdirectories
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
    
    // برای production: استفاده از relative path برای سازگاری بیشتر
    const pathname = window.location.pathname;
    const basePath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    
    console.log("Using base path:", basePath);
    return basePath || '';
  } catch (e) {
    console.error("Error determining base path:", e);
    return '';
  }
}

/**
 * Gets the full URL for an asset based on the base path
 */
export function getAssetPath(assetPath: string): string {
  // برای relative paths، فقط asset path را برگردان
  const cleanAssetPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  console.log('Asset path resolved:', { assetPath, cleanAssetPath });
  return cleanAssetPath;
}
