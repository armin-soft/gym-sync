
/**
 * Utilities for handling service worker requests
 */

// Fix any duplicate segments in URLs (like Assets/Assets/)
export function cleanRequestUrl(url: string): string {
  const duplicatePattern = /Assets\/Assets\//g;
  
  if (duplicatePattern.test(url)) {
    return url.replace(duplicatePattern, 'Assets/');
  }
  
  return url;
}

// Create a simple offline response
export function createOfflineResponse(isHtml: boolean = false): Response {
  if (isHtml) {
    return new Response(
      '<html><head><title>Offline</title></head><body><h1>Offline</h1><p>The app is currently offline.</p></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
  return new Response('Offline content not available');
}
