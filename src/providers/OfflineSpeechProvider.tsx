
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { offlineSpeechRecognition } from '@/services/offline-speech/OfflineSpeechRecognition';
import { useToast } from '@/hooks/use-toast';

interface OfflineSpeechContextType {
  isModelLoaded: boolean;
  isModelLoading: boolean;
  downloadProgress: number;
  loadModel: () => Promise<void>;
  isOfflineAvailable: boolean;
}

const OfflineSpeechContext = createContext<OfflineSpeechContextType>({
  isModelLoaded: false,
  isModelLoading: false,
  downloadProgress: 0,
  loadModel: async () => {},
  isOfflineAvailable: false,
});

export const useOfflineSpeech = () => useContext(OfflineSpeechContext);

interface OfflineSpeechProviderProps {
  children: ReactNode;
}

export function OfflineSpeechProvider({ children }: OfflineSpeechProviderProps) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
  const { toast } = useToast();

  // بررسی قابلیت استفاده از WebAssembly که برای تشخیص گفتار آفلاین مورد نیاز است
  useEffect(() => {
    const checkWasmSupport = () => {
      // بررسی پشتیبانی از WebAssembly
      const hasWasm = typeof WebAssembly === 'object' && 
                     typeof WebAssembly.instantiate === 'function' &&
                     typeof WebAssembly.compile === 'function';
                     
      // بررسی برخی APIهای دیگر مورد نیاز
      const hasRequiredApis = typeof SharedArrayBuffer !== 'undefined' && 
                             typeof Blob !== 'undefined' &&
                             typeof AudioContext !== 'undefined';
                             
      setIsOfflineAvailable(hasWasm && hasRequiredApis);
      
      if (!hasWasm) {
        console.warn("مرورگر شما از WebAssembly پشتیبانی نمی‌کند. تشخیص گفتار آفلاین در دسترس نخواهد بود.");
      }
    };
    
    checkWasmSupport();
  }, []);

  // تنظیم callback‌های دانلود مدل
  useEffect(() => {
    offlineSpeechRecognition.onProgress((progress) => {
      setDownloadProgress(progress);
    });

    offlineSpeechRecognition.onLoaded(() => {
      setIsModelLoaded(true);
      setIsModelLoading(false);
      
      // ذخیره وضعیت بارگذاری مدل در localStorage برای دفعات بعدی
      localStorage.setItem('offline_speech_model_loaded', 'true');
      localStorage.setItem('offline_speech_model_date', new Date().toISOString());
    });

    offlineSpeechRecognition.onError((error) => {
      setIsModelLoading(false);
      console.error("خطا در بارگذاری مدل:", error);
    });

    // بررسی وضعیت فعلی مدل
    setIsModelLoaded(offlineSpeechRecognition.isModelLoaded());
    setIsModelLoading(offlineSpeechRecognition.isModelLoading());
    setDownloadProgress(offlineSpeechRecognition.getDownloadProgress());
    
    // بررسی آیا قبلاً مدل را دانلود کرده‌ایم
    const modelLoaded = localStorage.getItem('offline_speech_model_loaded') === 'true';
    const modelDate = localStorage.getItem('offline_speech_model_date');
    
    // اگر مدل قبلاً دانلود شده، دوباره آن را بارگذاری می‌کنیم
    if (modelLoaded && modelDate) {
      const lastLoaded = new Date(modelDate);
      const now = new Date();
      const daysSinceLoaded = (now.getTime() - lastLoaded.getTime()) / (1000 * 60 * 60 * 24);
      
      // اگر مدل در ۳۰ روز گذشته دانلود شده، دوباره بارگذاری می‌کنیم
      if (daysSinceLoaded < 30) {
        loadModel();
      }
    }
  }, []);

  // بارگذاری مدل
  const loadModel = useCallback(async () => {
    if (isModelLoaded || isModelLoading) return;
    
    if (!isOfflineAvailable) {
      toast({
        title: "عدم پشتیبانی مرورگر",
        description: "مرورگر شما از قابلیت‌های لازم برای تشخیص گفتار آفلاین پشتیبانی نمی‌کند.",
        variant: "destructive",
      });
      return;
    }
    
    setIsModelLoading(true);
    
    try {
      toast({
        title: "شروع دانلود مدل تشخیص گفتار",
        description: "در حال دانلود مدل تشخیص گفتار آفلاین. لطفا تا پایان دانلود صبر کنید.",
      });
      
      await offlineSpeechRecognition.loadModel();
    } catch (error) {
      console.error("خطا در بارگذاری مدل:", error);
      setIsModelLoading(false);
      
      toast({
        title: "خطا در دانلود",
        description: "نتوانستیم مدل تشخیص گفتار را دانلود کنیم. لطفا اتصال اینترنت خود را بررسی کنید.",
        variant: "destructive",
      });
    }
  }, [isModelLoaded, isModelLoading, isOfflineAvailable, toast]);

  const value = {
    isModelLoaded,
    isModelLoading,
    downloadProgress,
    loadModel,
    isOfflineAvailable,
  };

  return (
    <OfflineSpeechContext.Provider value={value}>
      {children}
    </OfflineSpeechContext.Provider>
  );
}
