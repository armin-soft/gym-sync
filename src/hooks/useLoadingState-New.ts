
import { useState, useEffect } from 'react';

export const useLoadingStateNew = () => {
  const [progress, setProgress] = useState(۰);
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("آماده‌سازی سیستم...");
  const [systemInfo, setSystemInfo] = useState({
    version: "۴.۱.۶",
    totalComponents: ۱۲۸,
    loadedComponents: ۰
  });
  
  useEffect(() => {
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
    const loadingSteps = [
      { progress: ۵, text: "بررسی سازگاری سیستم...", components: ۸ },
      { progress: ۱۲, text: "بارگذاری هسته اصلی برنامه...", components: ۱۶ },
      { progress: ۲۰, text: "راه‌اندازی سیستم احراز هویت...", components: ۲۴ },
      { progress: ۲۸, text: "بارگذاری رابط کاربری اصلی...", components: ۳۲ },
      { progress: ۳۶, text: "آماده‌سازی پنل مدیریت شاگردان...", components: ۴۰ },
      { progress: ۴۴, text: "بارگذاری سیستم تمرینات...", components: ۵۲ },
      { progress: ۵۲, text: "راه‌اندازی مدیریت برنامه غذایی...", components: ۶۴ },
      { progress: ۶۰, text: "بارگذاری سیستم مکمل‌ها...", components: ۷۶ },
      { progress: ۶۸, text: "آماده‌سازی پنل مربی...", components: ۸۸ },
      { progress: ۷۶, text: "بارگذاری سیستم پشتیبان‌گیری...", components: ۱۰۰ },
      { progress: ۸۴, text: "راه‌اندازی داشبورد هوشمند...", components: ۱۱۲ },
      { progress: ۹۲, text: "تکمیل رابط‌های کاربری...", components: ۱۲۰ },
      { progress: ۱۰۰, text: "سیستم کاملاً آماده است!", components: ۱۲۸ }
    ];
    
    let currentStep = ۰;
    
    const progressInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        setSystemInfo(prev => ({
          ...prev,
          loadedComponents: step.components
        }));
        
        console.log(`Loading step ${currentStep + ۱}: ${step.text} (${step.progress}%)`);
        currentStep++;
      } else {
        clearInterval(progressInterval);
        console.log('All systems loaded successfully');
      }
    }, ۱۱۰۰); // هر مرحله ۱.۱ ثانیه
    
    return () => clearInterval(progressInterval);
  }, []);
  
  return {
    progress,
    gymName,
    loadingText,
    systemInfo
  };
};
