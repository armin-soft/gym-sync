/**
 * Utility functions for safe database operations (localStorage)
 * These functions provide better error handling and logging than direct localStorage access
 */

/**
 * Safely parse JSON data from localStorage with fallback value
 * @param key The localStorage key to retrieve
 * @param defaultValue The default value to return if the key doesn't exist or parsing fails
 * @returns The parsed value from localStorage or the default value
 */
export function safeJSONParse<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely save JSON data to localStorage
 * @param key The localStorage key to save to
 * @param value The value to stringify and save
 */
export function safeJSONSave(key: string, value: any): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    throw error; // Rethrow to allow callers to handle errors
  }
}

/**
 * Remove an item from localStorage
 * @param key The localStorage key to remove
 */
export function safeJSONRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

/**
 * Notify other windows/tabs about data changes
 * @param key The key that was changed
 */
export function notifyDataChange(key: string): void {
  try {
    localStorage.setItem('_last_change', new Date().toISOString());
    // Create a custom event that can be listened for in the same window
    const event = new CustomEvent('localDataChanged', { detail: { key } });
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Error notifying data change:', error);
  }
}

/**
 * Check if any updates are available for data
 * @param key The localStorage key to check
 * @param timestamp The timestamp to compare against
 * @returns True if updates are available
 */
export function hasUpdates(key: string, timestamp: string): boolean {
  try {
    const lastChange = localStorage.getItem('_last_change');
    if (!lastChange) return false;
    
    return new Date(lastChange) > new Date(timestamp);
  } catch (error) {
    console.error('Error checking for updates:', error);
    return false;
  }
}

/**
 * Clear all app data from localStorage
 * (Use with caution)
 */
export function clearAllData(): void {
  try {
    const keysToKeep = ['theme', 'user_preferences']; 
    
    // Get all keys
    const keys = Object.keys(localStorage);
    
    // Remove each key that isn't in the keysToKeep list
    keys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
}
