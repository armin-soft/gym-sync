
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
    if (src.includes('Main.js') || src.includes('main.tsx') || src.includes('main.js')) {
      // Extract directory path from script src
      const pathParts = src.split('/');
      // Remove the filename and Assets/Scripts part if present
      pathParts.pop();
      if (pathParts.length > 0 && pathParts[pathParts.length - 1] === 'Scripts') {
        pathParts.pop();
      }
      if (pathParts.length > 0 && pathParts[pathParts.length - 1] === 'Assets') {
        pathParts.pop();
      }
      // Join the parts back together and add a trailing slash
      return pathParts.join('/') + '/';
    }
  }
  
  // Fallback to the pathname from the URL
  const path = window.location.pathname;
  // Get the path up to the last directory
  const lastSlashIndex = path.lastIndexOf('/');
  if (lastSlashIndex === -1) {
    return '/';
  }
  
  return path.substring(0, lastSlashIndex + 1);
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
