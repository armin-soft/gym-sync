
/**
 * Gets the base path for the application based on the current window location
 * Works for any deployment path including subdirectories
 */
export function getBasePath(): string {
  // In development environment or when window is not available, use root path
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'development') {
    return '/';
  }
  
  // Try to determine base path from the script tag
  const scriptTags = document.getElementsByTagName('script');
  for (let i = 0; i < scriptTags.length; i++) {
    const src = scriptTags[i].getAttribute('src') || '';
    // Look for main script patterns
    if (src.includes('main.js') || src.includes('main.tsx') || src.includes('App.js')) {
      // Extract directory path from script src
      const urlObj = new URL(src, window.location.origin);
      const pathParts = urlObj.pathname.split('/');
      pathParts.pop(); // Remove file name
      
      // Remove common asset path segments if present
      if (pathParts.length > 0 && 
          (pathParts[pathParts.length - 1] === 'Script' || 
           pathParts[pathParts.length - 1] === 'script' ||
           pathParts[pathParts.length - 1] === 'Assets')) {
        pathParts.pop();
      }
      
      // Add trailing slash and return
      let basePath = pathParts.join('/');
      if (!basePath.endsWith('/')) basePath += '/';
      
      console.log("Base path determined from script:", basePath);
      return basePath;
    }
  }

  // Fallback to current path segment extraction
  try {
    // Simple approach: just use root path as base
    // This avoids routing issues when paths can't be determined
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
