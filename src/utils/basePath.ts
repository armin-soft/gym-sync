
/**
 * Gets the base path for the application based on the current window location
 * Works for any deployment path including subdirectories
 */
export function getBasePath(): string {
  // In development environment, always use root path
  if (process.env.NODE_ENV === 'development') {
    return '/';
  }
  
  // When not in a browser environment
  if (typeof window === 'undefined') {
    return '/';
  }
  
  try {
    // For production: Get base URL from window location
    // This is more reliable than parsing script tags
    const pathName = window.location.pathname;
    
    // If we're at the root or a direct route
    if (pathName === '/' || pathName.indexOf('.') !== -1) {
      return '/';
    }
    
    // Check for specific paths that should be excluded from the base path
    const routePaths = [
      '/Coach-Profile', 
      '/Students', 
      '/Student-History',
      '/Exercise-Movements', 
      '/Diet-Plan', 
      '/Supplements-Vitamins', 
      '/Backup-Restore',
      '/students',
      '/student-history',
      '/exercises',
      '/diet',
      '/supplements',
      '/trainer',
      '/backup'
    ];
    
    // If the current path is one of our application routes, use root
    for (const route of routePaths) {
      if (pathName.startsWith(route)) {
        return '/';
      }
    }
    
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
  // Remove any leading slash from asset path to avoid double slashes
  const cleanAssetPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // Join paths and clean up any potential double slashes
  return `${basePath}${cleanAssetPath}`.replace(/([^:])\/+/g, '$1/');
}
