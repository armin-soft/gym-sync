
import { useState, useEffect } from 'react';
import { debouncedSave } from '@/utils/performance';

interface SystemInfo {
  version: string;
  totalComponents: number;
  loadedComponents: number;
}

interface LoadingStep {
  progress: number;
  text: string;
  components: number;
}

export const useLoadingState = () => {
  const [progress, setProgress] = useState(0);
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("آماده‌سازی سیستم...");
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    version: "در حال بارگذاری...",
    totalComponents: 128,
    loadedComponents: 0
  });
  
  useEffect(() => {
    // استفاده از نسخه کش شده برای شروع سریع
    const cachedVersion = localStorage.getItem('app_version') || 'در حال بارگذاری...';
    setSystemInfo(prev => ({
      ...prev,
      version: cachedVersion
    }));
    
    // دریافت نسخه از Manifest.json
    const fetchVersion = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const version = manifest.version || 'نامشخص';
        setSystemInfo(prev => ({
          ...prev,
          version: version
        }));
        // ذخیره نسخه با تأخیر برای بهینه‌سازی عملکرد
        debouncedSave('app_version', version, 100);
        console.log(`Version loaded from Manifest.json for loading: ${version}`);
      } catch (error) {
        console.error('Error loading version from Manifest.json in loading:', error);
      }
    };
    
    fetchVersion();
    
    // بارگذاری اطلاعات باشگاه - با بهینه‌سازی برای استفاده کمتر از منابع
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      }
    } catch (error) {
      console.error('Error loading gym profile:', error);
    }
    
    // بهینه‌سازی مراحل بارگذاری برای سرعت بیشتر
    const loadingSteps: LoadingStep[] = [
      { progress: 10, text: "بررسی سازگاری سیستم...", components: 13 },
      { progress: 20, text: "بارگذاری هسته اصلی برنامه...", components: 26 },
      { progress: 35, text: "راه‌اندازی رابط کاربری...", components: 45 },
      { progress: 50, text: "بارگذاری سیستم مدیریت...", components: 64 },
      { progress: 65, text: "بارگذاری سیستم تغذیه و تمرینات...", components: 88 },
      { progress: 80, text: "راه‌اندازی داشبورد هوشمند...", components: 112 },
      { progress: 100, text: "سیستم کاملاً آماده است!", components: 128 }
    ];
    
    let currentStep = 0;
    
    // کاهش زمان بارگذاری
    const progressInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        setSystemInfo(prev => ({
          ...prev,
          loadedComponents: step.components
        }));
        
        console.log(`Loading step ${currentStep + 1}: ${step.text} (${step.progress}%)`);
        currentStep++;
      } else {
        clearInterval(progressInterval);
        console.log('All systems loaded successfully');
      }
    }, 650); // زمان‌بندی سریع‌تر برای هر مرحله
    
    return () => clearInterval(progressInterval);
  }, []);
  
  return {
    progress,
    gymName,
    loadingText,
    systemInfo
  };
};
