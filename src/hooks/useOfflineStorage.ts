
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useOfflineStorage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Check if localStorage is available
  useEffect(() => {
    try {
      localStorage.setItem('storage_test', 'test');
      localStorage.removeItem('storage_test');
      setStorageAvailable(true);
    } catch (e) {
      setStorageAvailable(false);
      toast({
        variant: "destructive",
        title: "خطا در دسترسی به حافظه",
        description: "امکان ذخیره سازی اطلاعات وجود ندارد. ممکن است مرورگر شما حالت خصوصی فعال باشد.",
      });
    }
  }, [toast]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(true);
      toast({
        title: "اتصال برقرار شد",
        description: "شما مجدداً به اینترنت متصل شدید.",
      });
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      toast({
        variant: "warning",
        title: "حالت آفلاین",
        description: "شما در حالت آفلاین هستید. برنامه همچنان کار می‌کند.",
      });
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, [toast]);

  // Calculate available storage space
  const [storageStats, setStorageStats] = useState({
    used: 0,
    available: 5 * 1024 * 1024, // Default 5MB
    percentage: 0
  });

  useEffect(() => {
    if (!storageAvailable) return;
    
    try {
      let totalSize = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key) || '';
          totalSize += (key.length + value.length) * 2; // Approximate UTF-16 encoding
        }
      }
      
      // Most browsers allow ~5MB of localStorage
      const availableSpace = 5 * 1024 * 1024;
      const usedPercentage = (totalSize / availableSpace) * 100;
      
      setStorageStats({
        used: totalSize,
        available: availableSpace,
        percentage: usedPercentage
      });
      
      if (usedPercentage > 80) {
        toast({
          variant: "warning",
          title: "هشدار فضای ذخیره‌سازی",
          description: `${Math.round(usedPercentage)}% از فضای ذخیره‌سازی محلی استفاده شده است.`,
        });
      }
    } catch (error) {
      console.error('Error calculating storage stats:', error);
    }
  }, [storageAvailable, toast]);

  return {
    isOnline,
    storageAvailable,
    storageStats
  };
}
