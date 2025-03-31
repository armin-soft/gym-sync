
/**
 * Gym-Sync Performance Utilities
 * ==============================
 * ابزارهای بهینه‌سازی عملکرد برنامه
 */

/**
 * اجرای یک عملیات در زمان خالی مرورگر
 * Running a task when the browser is idle
 */
export const runWhenIdle = (callback: () => void, timeout = 1000): void => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => callback(), { timeout });
  } else {
    setTimeout(callback, 1);
  }
};

/**
 * ذخیره‌سازی با تأخیر
 * Debounced saving of data
 */
export const debouncedSave = (key: string, data: any, delay = 300): void => {
  if (typeof localStorage === 'undefined') return;
  
  const serializedData = typeof data === 'string' ? data : JSON.stringify(data);
  
  // Clear any existing timeout
  const existingTimeout = (window as any)[`_debounceTimeout_${key}`];
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }
  
  // Set new timeout
  (window as any)[`_debounceTimeout_${key}`] = setTimeout(() => {
    try {
      localStorage.setItem(key, serializedData);
      delete (window as any)[`_debounceTimeout_${key}`];
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, delay);
};

/**
 * بررسی کردن امکان استفاده از localStorage
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * اجرای پیشرفته و موازی چندین پرامیس
 * Enhanced parallel promise execution
 */
export const runPromisesInParallel = <T>(
  promises: Array<Promise<T> | (() => Promise<T>)>,
  concurrencyLimit = 4
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let currentIndex = 0;
    let completedPromises = 0;
    
    // Convert function callbacks to promises
    const allPromises = promises.map(p => typeof p === 'function' ? p() : p);
    
    // Function to run promises with concurrency limit
    const runPromise = (index: number) => {
      if (index >= allPromises.length) return;
      
      const currentPromise = allPromises[index];
      
      currentPromise
        .then((result) => {
          results[index] = result;
          completedPromises++;
          
          if (completedPromises === allPromises.length) {
            resolve(results);
          } else {
            // Process next promise
            runPromise(currentIndex++);
          }
        })
        .catch(reject);
    };
    
    // Start initial batch of promises
    const initialBatch = Math.min(concurrencyLimit, allPromises.length);
    for (let i = 0; i < initialBatch; i++) {
      runPromise(currentIndex++);
    }
    
    // If no promises, resolve immediately
    if (allPromises.length === 0) {
      resolve([]);
    }
  });
};

/**
 * پردازش داده‌های بزرگ بدون مسدودسازی رندر
 * Process large datasets without blocking rendering
 */
export const processChunked = <T, U>(
  items: T[],
  processor: (item: T) => U,
  chunkSize = 50,
  callback?: (results: U[]) => void
): Promise<U[]> => {
  return new Promise((resolve) => {
    const results: U[] = [];
    let index = 0;
    
    function processNextChunk() {
      const chunk = items.slice(index, index + chunkSize);
      index += chunkSize;
      
      if (chunk.length === 0) {
        if (callback) callback(results);
        resolve(results);
        return;
      }
      
      // Process this chunk
      for (let i = 0; i < chunk.length; i++) {
        results.push(processor(chunk[i]));
      }
      
      // Schedule next chunk
      if (index < items.length) {
        setTimeout(processNextChunk, 0);
      } else {
        if (callback) callback(results);
        resolve(results);
      }
    }
    
    processNextChunk();
  });
};
