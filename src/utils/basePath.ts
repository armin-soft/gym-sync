
// Define app routes for comparison
export const APP_ROUTES = [
  "Coach-Profile", 
  "Students", 
  "Exercise-Movements",
  "Diet-Plan",
  "Supplements-Vitamins",
  "Reports",
  "Backup-Restore",
  "About"
];

/**
 * Determines the base path of the application, accounting for subdirectory deployment
 * Useful for routing and asset paths
 */
export const getBasePath = (): string => {
  // Get the current URL path
  const path = window.location.pathname;
  
  // Split the path into segments and filter out empty strings
  const segments = path.split('/').filter(segment => segment !== '');
  
  // If there are no segments, we're at the root
  if (segments.length === 0) {
    return '/';
  }
  
  // Check if the first segment is one of our app routes
  if (APP_ROUTES.includes(segments[0])) {
    return '/'; // We're not in a subdirectory
  }
  
  // We might be in a subdirectory
  // Find the index of the first segment that matches our app routes, if any
  const appRouteIndex = segments.findIndex(segment => APP_ROUTES.includes(segment));
  
  if (appRouteIndex === -1) {
    // No app routes found, assume the whole path is a subdirectory
    return '/' + segments.join('/') + '/';
  } else {
    // We found an app route, so the subdirectory is everything before that
    return '/' + segments.slice(0, appRouteIndex).join('/') + '/';
  }
};
