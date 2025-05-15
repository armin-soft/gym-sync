
/**
 * Local Database Utilities
 * Centralized management of localStorage operations with improved error handling and performance
 */

import { toast } from "@/hooks/use-toast";

/**
 * Generic type for database operations
 */
export type DBItem = {
  id: number;
  [key: string]: any;
};

/**
 * Safely parse JSON data from localStorage with improved error handling
 */
export const safeJSONParse = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return fallback;
  }
};

/**
 * Safely save data to localStorage with error handling
 */
export const safeJSONSave = <T>(key: string, data: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    toast({
      variant: "destructive",
      title: "خطا در ذخیره سازی",
      description: `مشکلی در ذخیره اطلاعات ${key} پیش آمده است`
    });
    return false;
  }
};

/**
 * Trigger a storage event to notify other tabs of data changes
 */
export const notifyDataChange = (key: string): void => {
  window.dispatchEvent(new Event('storage'));
};

/**
 * Get the next available ID for a collection
 */
export const getNextId = (items: DBItem[]): number => {
  return items.length > 0 
    ? Math.max(...items.map(item => item.id)) + 1 
    : 1;
};

/**
 * Database collection abstraction with CRUD operations
 */
export class DBCollection<T extends DBItem> {
  private key: string;
  
  constructor(key: string) {
    this.key = key;
  }
  
  getAll(): T[] {
    return safeJSONParse<T[]>(this.key, []);
  }
  
  getById(id: number): T | undefined {
    const items = this.getAll();
    return items.find(item => item.id === id);
  }
  
  save(item: T): boolean {
    const items = this.getAll();
    const index = items.findIndex(i => i.id === item.id);
    
    if (index >= 0) {
      items[index] = item;
    } else {
      item.id = getNextId(items);
      items.push(item);
    }
    
    const result = safeJSONSave(this.key, items);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  saveAll(newItems: T[]): boolean {
    const result = safeJSONSave(this.key, newItems);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  delete(id: number): boolean {
    const items = this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) {
      return false; // Item not found
    }
    
    const result = safeJSONSave(this.key, filteredItems);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  deleteMany(ids: number[]): boolean {
    const items = this.getAll();
    const filteredItems = items.filter(item => !ids.includes(item.id));
    
    const result = safeJSONSave(this.key, filteredItems);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  clear(): boolean {
    const result = safeJSONSave(this.key, []);
    if (result) notifyDataChange(this.key);
    return result;
  }
}

/**
 * Create a database collection instance
 */
export function createCollection<T extends DBItem>(key: string): DBCollection<T> {
  return new DBCollection<T>(key);
}
