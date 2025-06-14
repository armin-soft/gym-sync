
// Enhanced storage manager to handle tracking prevention
interface StorageManager {
  setItem: (key: string, value: string) => boolean;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => boolean;
  isAvailable: () => boolean;
}

class SafeStorageManager implements StorageManager {
  private fallbackStorage: { [key: string]: string } = {};
  private storageAvailable = false;

  constructor() {
    this.checkStorageAvailability();
  }

  private checkStorageAvailability(): void {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      this.storageAvailable = true;
      console.log('localStorage is available');
    } catch (error) {
      console.warn('localStorage is not available, using fallback:', error);
      this.storageAvailable = false;
    }
  }

  isAvailable(): boolean {
    return this.storageAvailable;
  }

  setItem(key: string, value: string): boolean {
    try {
      if (this.storageAvailable) {
        localStorage.setItem(key, value);
        console.log(`Saved to localStorage: ${key}`);
      } else {
        this.fallbackStorage[key] = value;
        console.log(`Saved to fallback storage: ${key}`);
      }
      return true;
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
      this.fallbackStorage[key] = value;
      return false;
    }
  }

  getItem(key: string): string | null {
    try {
      if (this.storageAvailable) {
        const value = localStorage.getItem(key);
        console.log(`Retrieved from localStorage: ${key} = ${value}`);
        return value;
      } else {
        const value = this.fallbackStorage[key] || null;
        console.log(`Retrieved from fallback storage: ${key} = ${value}`);
        return value;
      }
    } catch (error) {
      console.error(`Failed to retrieve ${key}:`, error);
      return this.fallbackStorage[key] || null;
    }
  }

  removeItem(key: string): boolean {
    try {
      if (this.storageAvailable) {
        localStorage.removeItem(key);
        console.log(`Removed from localStorage: ${key}`);
      } else {
        delete this.fallbackStorage[key];
        console.log(`Removed from fallback storage: ${key}`);
      }
      return true;
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
      delete this.fallbackStorage[key];
      return false;
    }
  }
}

export const storageManager = new SafeStorageManager();
