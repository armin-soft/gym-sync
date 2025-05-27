
import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  const [progress, setProgress] = useState(0);
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("در حال بارگذاری...");
  
  useEffect(() => {
    // بارگذاری نام باشگاه از پروفایل مربی
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.gymName) {
          setGymName(profile.gymName);
        }
      }
    } catch (error) {
      console.error('Error loading gym name:', error);
    }
    
    // شبیه‌سازی روند بارگذاری کامل از 0 تا 100
    setProgress(0);
    
    const steps = [
      { progress: 8, text: "در حال آماده‌سازی محیط برنامه..." },
      { progress: 18, text: "در حال بارگذاری کامپوننت‌های اصلی..." },
      { progress: 30, text: "در حال بارگذاری صفحه شاگردان..." },
      { progress: 42, text: "در حال بارگذاری سیستم تمرینات..." },
      { progress: 55, text: "در حال بارگذاری برنامه غذایی..." },
      { progress: 68, text: "در حال بارگذاری مکمل‌ها و ویتامین‌ها..." },
      { progress: 78, text: "در حال بارگذاری پروفایل مربی..." },
      { progress: 88, text: "در حال تکمیل سیستم پشتیبان‌گیری..." },
      { progress: 95, text: "در حال نهایی‌سازی رابط کاربری..." },
      { progress: 100, text: "همه کامپوننت‌ها بارگذاری شدند - آماده استفاده" }
    ];
    
    // زمان‌بندی برای هر مرحله - طولانی‌تر برای بارگذاری کامل
    let currentStep = 0;
    
    const intervalId = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setLoadingText(steps[currentStep].text);
        console.log(`Loading step ${currentStep + 1}: ${steps[currentStep].text}`);
        currentStep++;
      } else {
        clearInterval(intervalId);
        console.log('All components fully loaded and ready');
      }
    }, 1000); // هر مرحله 1 ثانیه برای بارگذاری کامل
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    progress,
    gymName,
    loadingText
  };
};
