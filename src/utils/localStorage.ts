
// Enhanced localStorage utilities with automatic refresh triggers
import { triggerDataChange } from '@/hooks/useDataRefresh';

export const setLocalStorageItem = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    
    // Trigger refresh for this key
    triggerDataChange(key);
    
    console.log(`Data saved to localStorage: ${key}`);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getLocalStorageItem = <T = any>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key);
    triggerDataChange(key);
    console.log(`Data removed from localStorage: ${key}`);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export const updateLocalStorageItem = <T = any>(
  key: string,
  updater: (currentValue: T) => T,
  defaultValue: T
) => {
  try {
    const currentValue = getLocalStorageItem(key, defaultValue);
    const newValue = updater(currentValue);
    return setLocalStorageItem(key, newValue);
  } catch (error) {
    console.error('Error updating localStorage:', error);
    return false;
  }
};
