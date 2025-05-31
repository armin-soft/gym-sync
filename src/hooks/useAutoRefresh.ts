
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseAutoRefreshOptions {
  interval?: number;
  onRefresh?: () => void;
  enabled?: boolean;
}

export const useAutoRefresh = ({ 
  interval = 30000, // 30 ثانیه
  onRefresh,
  enabled = true 
}: UseAutoRefreshOptions = {}) => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const performRefresh = useCallback(async () => {
    if (!enabled || isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      onRefresh?.();
      setLastRefresh(new Date());
      
      // نمایش اعلان بروزرسانی
      toast({
        title: "بروزرسانی انجام شد",
        description: "داده‌ها به‌روزرسانی شدند",
        duration: 2000,
      });
    } catch (error) {
      console.error('خطا در بروزرسانی:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [enabled, isRefreshing, onRefresh, toast]);

  // بروزرسانی خودکار با فاصله زمانی
  useEffect(() => {
    if (!enabled || interval <= 0) return;

    const intervalId = setInterval(performRefresh, interval);
    return () => clearInterval(intervalId);
  }, [performRefresh, interval, enabled]);

  // گوش دادن به تغییرات localStorage
  useEffect(() => {
    if (!enabled) return;

    const handleStorageChange = () => {
      console.log('Storage changed, refreshing data...');
      performRefresh();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // گوش دادن به رویدادهای سفارشی
    window.addEventListener('dataRefresh', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dataRefresh', handleStorageChange);
    };
  }, [enabled, performRefresh]);

  const triggerManualRefresh = useCallback(() => {
    performRefresh();
  }, [performRefresh]);

  return {
    lastRefresh,
    isRefreshing,
    triggerManualRefresh
  };
};
