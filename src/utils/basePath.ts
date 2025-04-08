
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
  
  // We are in a subdirectory, return it with slashes
  return '/' + segments[0] + '/';
};
