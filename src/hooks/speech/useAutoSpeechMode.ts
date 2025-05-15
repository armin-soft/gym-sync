
import { useState, useEffect, useCallback } from 'react';
import { networkStatus } from '@/services/connectivity/networkStatus';
import { useOfflineSpeech } from '@/providers/OfflineSpeechProvider';
import { useToast } from '@/hooks/use-toast';

type SpeechInputMode = 'speech' | 'offline' | 'text';

export function useAutoSpeechMode(initialMode: SpeechInputMode = 'speech') {
  const [inputMode, setInputMode] = useState<SpeechInputMode>(initialMode);
  const [isOffline, setIsOffline] = useState(false);
  const { isModelLoaded, loadModel } = useOfflineSpeech();
  const { toast } = useToast();
  
  // تابع تشخیص بهترین حالت براساس وضعیت شبکه و بارگذاری مدل
  const determineBestMode = useCallback(() => {
    const online = networkStatus.isOnline();
    
    if (online) {
      // اگر آنلاین هستیم، از تشخیص گفتار آنلاین استفاده می‌کنیم
      setIsOffline(false);
      return 'speech';
    } else {
      // اگر آفلاین هستیم، براساس بارگذاری مدل تصمیم می‌گیریم
      setIsOffline(true);
      
      if (isModelLoaded) {
        // اگر مدل آفلاین بارگذاری شده است، از آن استفاده می‌کنیم
        return 'offline';
      } else {
        // اگر مدل آفلاین بارگذاری نشده است، به حالت متنی می‌رویم
        return 'text';
      }
    }
  }, [isModelLoaded]);

  // تنظیم شنونده برای تغییرات وضعیت شبکه
  useEffect(() => {
    // بررسی و تنظیم اولیه
    const bestMode = determineBestMode();
    setInputMode(bestMode);
    
    // ثبت شنونده برای تغییرات وضعیت شبکه
    const removeListener = networkStatus.addListener((status) => {
      const newIsOffline = status === 'offline';
      setIsOffline(newIsOffline);
      
      // اگر وضعیت تغییر کرده، حالت را تغییر می‌دهیم
      if (newIsOffline !== isOffline) {
        const newMode = determineBestMode();
        setInputMode(newMode);
        
        // نمایش اعلان تغییر وضعیت برای کاربر
        if (newIsOffline) {
          toast({
            title: "اتصال به اینترنت قطع شد",
            description: isModelLoaded 
              ? "به حالت تشخیص گفتار آفلاین منتقل شدید" 
              : "به حالت ورود متنی منتقل شدید",
            variant: "warning",
          });
        } else {
          toast({
            title: "اتصال به اینترنت برقرار شد",
            description: "به حالت تشخیص گفتار آنلاین منتقل شدید",
            variant: "success",
          });
        }
      }
    });
    
    // بررسی دوره‌ای وضعیت اتصال برای اطمینان بیشتر
    const intervalId = setInterval(async () => {
      await networkStatus.checkConnection();
    }, 30000);
    
    // پاکسازی شنونده‌ها
    return () => {
      removeListener();
      clearInterval(intervalId);
    };
  }, [isOffline, isModelLoaded, determineBestMode, toast]);
  
  // تابع برای تنظیم خودکار مدل آفلاین
  const setupOfflineModel = useCallback(async () => {
    if (!isModelLoaded && isOffline) {
      try {
        toast({
          title: "در حال آماده‌سازی مدل آفلاین",
          description: "لطفاً صبر کنید...",
        });
        await loadModel();
      } catch (error) {
        console.error("خطا در بارگذاری مدل آفلاین:", error);
        toast({
          title: "خطا در بارگذاری مدل آفلاین",
          description: "لطفاً از ورود متنی استفاده کنید.",
          variant: "destructive",
        });
      }
    }
  }, [isModelLoaded, isOffline, loadModel, toast]);
  
  // هنگام تغییر به حالت آفلاین، سعی می‌کنیم مدل را بارگذاری کنیم
  useEffect(() => {
    if (isOffline && !isModelLoaded) {
      setupOfflineModel();
    }
  }, [isOffline, isModelLoaded, setupOfflineModel]);

  return {
    inputMode,
    setInputMode,
    isOffline,
    setupOfflineModel
  };
}
