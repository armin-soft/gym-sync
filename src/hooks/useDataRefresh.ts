
import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface DataRefreshOptions {
  interval?: number;
  onStorageChange?: boolean;
  keys?: string[];
}

export const useDataRefresh = ({
  interval = 30000, // 30 seconds default
  onStorageChange = true,
  keys = []
}: DataRefreshOptions = {}) => {
  const queryClient = useQueryClient();

  const refreshData = useCallback(() => {
    if (keys.length > 0) {
      keys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    } else {
      // Refresh all queries if no specific keys provided
      queryClient.invalidateQueries();
    }
  }, [queryClient, keys]);

  // Auto refresh with interval
  useEffect(() => {
    if (interval > 0) {
      const intervalId = setInterval(refreshData, interval);
      return () => clearInterval(intervalId);
    }
  }, [interval, refreshData]);

  // Listen to localStorage changes
  useEffect(() => {
    if (!onStorageChange) return;

    const handleStorageChange = (e: StorageEvent) => {
      // Check if changed key is in our watch list
      if (keys.length === 0 || keys.includes(e.key || '')) {
        console.log('Storage changed for key:', e.key);
        refreshData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [onStorageChange, keys, refreshData]);

  // Listen to custom events for internal changes
  useEffect(() => {
    const handleDataChange = (event: CustomEvent) => {
      const { key } = event.detail;
      if (keys.length === 0 || keys.includes(key)) {
        console.log('Data changed for key:', key);
        refreshData();
      }
    };

    window.addEventListener('dataChanged', handleDataChange as EventListener);
    return () => window.removeEventListener('dataChanged', handleDataChange as EventListener);
  }, [keys, refreshData]);

  return { refreshData };
};

// Helper function to trigger data change events
export const triggerDataChange = (key: string) => {
  const event = new CustomEvent('dataChanged', { detail: { key } });
  window.dispatchEvent(event);
};
