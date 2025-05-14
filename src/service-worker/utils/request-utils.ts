
// Utility functions for handling requests in the service worker

// Fix URL paths with duplicates (Assets/Assets)
export function cleanRequestUrl(url: string): string {
  const duplicatePattern = /Assets\/Assets\//g;
  
  if (duplicatePattern.test(url)) {
    // Replace duplicate segments
    return url.replace(duplicatePattern, 'Assets/');
  }
  
  return url;
}

// Helper function to create offline response
export function createOfflineResponse(isHtml: boolean = false): Response {
  if (isHtml) {
    return new Response(
      '<html><body dir="rtl">' +
      '<h1>برنامه در حالت آفلاین</h1>' +
      '<p>لطفا اتصال اینترنت خود را بررسی کنید.</p>' +
      '</body></html>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      }
    );
  }
  
  return new Response('خطا در اتصال به شبکه. برنامه در حالت آفلاین است.', {
    status: 408,
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
  });
}
