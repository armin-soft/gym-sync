
import { useState, useEffect, useCallback } from "react";

export function useStudentRefresh() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Refresh when localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Refresh after save
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // Simulate a storage event to refresh other tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);
  
  return { refreshTrigger, triggerRefresh };
}
