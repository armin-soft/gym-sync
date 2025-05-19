
import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  const [progress, setProgress] = useState(0);
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("در حال آماده‌سازی برنامه");
  
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
    
    // شبیه‌سازی مراحل بارگذاری با متن‌های مختلف
    setTimeout(() => setLoadingText("در حال بارگذاری تنظیمات"), 800);
    setTimeout(() => setLoadingText("در حال آماده‌سازی داده‌ها"), 1800);
    setTimeout(() => setLoadingText("آماده‌سازی کامل شد"), 2800);
    
    // شبیه‌سازی پیشرفت بارگذاری به صورت روان
    let currentProgress = 0;
    const targetProgress = 100;
    const duration = 3000; // 3 ثانیه کل
    const interval = 30; // هر 30 میلی‌ثانیه بررسی شود
    
    const timer = setInterval(() => {
      // افزایش تدریجی پیشرفت
      const increment = (targetProgress - currentProgress) * 0.05;
      currentProgress += Math.max(0.5, increment);
      
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        clearInterval(timer);
      }
      
      setProgress(Math.min(Math.floor(currentProgress), targetProgress));
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  return {
    progress,
    gymName,
    loadingText
  };
};
