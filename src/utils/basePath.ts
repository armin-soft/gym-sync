
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
    
    // همیشه از مسیر root استفاده کن برای جلوگیری از مشکلات routing
    console.log("Using root path for all scenarios");
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
  // اگر مسیر به صورت مطلق است، همان‌طور که هست برگردان
  if (assetPath.startsWith('http') || assetPath.startsWith('//')) {
    return assetPath;
  }
  
  // تنظیم مسیر asset برای ساختار جدید
  let cleanAssetPath = assetPath;
  
  // اطمینان از شروع با /
  if (!cleanAssetPath.startsWith('/')) {
    cleanAssetPath = '/' + cleanAssetPath;
  }
  
  console.log('Asset path resolved:', { assetPath, cleanAssetPath });
  return cleanAssetPath;
}

/**
 * Helper function to get image paths for the new structure
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(`/Assets/Image/${imageName}`);
}
