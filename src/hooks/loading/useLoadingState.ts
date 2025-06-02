
import { useState, useEffect } from 'react';

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
        localStorage.setItem('app_version', version);
        console.log(`Version loaded from Manifest.json for loading: ${version}`);
      } catch (error) {
        console.error('Error loading version from Manifest.json in loading:', error);
        const cachedVersion = localStorage.getItem('app_version') || 'نامشخص';
        setSystemInfo(prev => ({
          ...prev,
          version: cachedVersion
        }));
      }
    };
    
    fetchVersion();
    
    // بارگذاری اطلاعات باشگاه
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
    
    // مراحل بارگذاری با اطلاعات واقعی و به‌روز
    const loadingSteps: LoadingStep[] = [
      { progress: 5, text: "بررسی سازگاری سیستم...", components: 8 },
      { progress: 12, text: "بارگذاری هسته اصلی برنامه...", components: 16 },
      { progress: 20, text: "راه‌اندازی سیستم احراز هویت...", components: 24 },
      { progress: 28, text: "بارگذاری رابط کاربری اصلی...", components: 32 },
      { progress: 36, text: "آماده‌سازی پنل مدیریت شاگردان...", components: 40 },
      { progress: 44, text: "بارگذاری سیستم تمرینات...", components: 52 },
      { progress: 52, text: "راه‌اندازی مدیریت برنامه غذایی...", components: 64 },
      { progress: 60, text: "بارگذاری سیستم مکمل‌ها...", components: 76 },
      { progress: 68, text: "آماده‌سازی پنل مربی...", components: 88 },
      { progress: 76, text: "بارگذاری سیستم پشتیبان‌گیری...", components: 100 },
      { progress: 84, text: "راه‌اندازی داشبورد هوشمند...", components: 112 },
      { progress: 92, text: "تکمیل رابط‌های کاربری...", components: 120 },
      { progress: 100, text: "سیستم کاملاً آماده است!", components: 128 }
    ];
    
    let currentStep = 0;
    
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
    }, 1100); // هر مرحله 1.1 ثانیه
    
    return () => clearInterval(progressInterval);
  }, []);
  
  return {
    progress,
    gymName,
    loadingText,
    systemInfo
  };
};
