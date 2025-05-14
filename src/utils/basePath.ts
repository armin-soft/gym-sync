
/**
 * Gets the base path for the application based on the current window location
 * Works for any deployment path including subdirectories
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') {
    return '/';
  }
  
  // Extract the path from the script tag that loaded the application
  const scriptTags = document.getElementsByTagName('script');
  for (let i = 0; i < scriptTags.length; i++) {
    const src = scriptTags[i].getAttribute('src') || '';
    if (src.includes('Main.js') || src.includes('main.tsx') || src.includes('main.js') || src.includes('App.js')) {
      // Extract directory path from script src
      const pathParts = src.split('/');
      // Remove the filename and Assets/Script part if present
      pathParts.pop();
      if (pathParts.length > 0 && 
          (pathParts[pathParts.length - 1] === 'Script' || 
           pathParts[pathParts.length - 1] === 'script')) {
        pathParts.pop();
      }
      if (pathParts.length > 0 && 
          (pathParts[pathParts.length - 1] === 'Assets' || 
           pathParts[pathParts.length - 1] === 'assets')) {
        pathParts.pop();
      }
      
      // For debugging
      console.log("Script src detected:", src);
      console.log("Base path from script:", pathParts.join('/') + '/');
      
      // Join the parts back together and add a trailing slash
      return pathParts.join('/') + '/';
    }
  }
  
  // Fallback: Use the current URL path up to the last segment
  try {
    // Get current path up to the last directory
    const path = window.location.pathname;
    console.log("Current window path:", path);
    
    // If this is already the root path or has no segments, just return "/"
    if (path === "/" || path === "" || !path.includes("/")) {
      return "/";
    }
    
    // Find if the path includes any of our known routes
    const knownRoutes = [
      "/Coach-Profile", 
      "/Students", 
      "/Exercise-Movements", 
      "/Diet-Plan", 
      "/Supplements-Vitamins", 
      "/Backup-Restore"
    ];
    
    for (const route of knownRoutes) {
      if (path.includes(route)) {
        const basePath = path.split(route)[0];
        console.log("Detected base path from route:", basePath);
        return basePath;
      }
    }
    
    // Final fallback: try to get the directory path
    const lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex === -1) {
      return '/';
    }
    
    const basePath = path.substring(0, lastSlashIndex + 1);
    console.log("Fallback base path:", basePath);
    return basePath;
  } catch (e) {
    console.error("Error determining base path:", e);
    return '/';
  }
}

/**
 * Gets the full URL for an asset based on the base path
 * Ensures we don't have duplicate path segments like "Assets/Assets"
 */
export function getAssetPath(assetPath: string): string {
  const basePath = getBasePath();
  // Remove any leading slash from asset path to avoid double slashes
  const cleanAssetPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
  
  // Prevent duplication of 'Assets' in the path
  let cleanedPath = `${basePath}${cleanAssetPath}`.replace(/([^:])\/+/g, '$1/');
  // Fix potential duplication of "Assets/Assets" in the path
  cleanedPath = cleanedPath.replace(/Assets\/Assets\//g, 'Assets/');
  
  // For debugging
  console.log(`Asset path resolved: ${cleanedPath} from ${basePath} and ${assetPath}`);
  
  return cleanedPath;
}
