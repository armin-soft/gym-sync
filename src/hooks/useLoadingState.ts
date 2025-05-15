
import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  const [progress, setProgress] = useState(10); // شروع از 10% برای کاهش پرش صفحه
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("در حال آماده‌سازی برنامه");
  
  useEffect(() => {
    // بارگذاری نام باشگاه از پروفایل مربی - بدون تاخیر
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
    
    // کاهش تعداد تغییرات متن بارگذاری
    const textTimers = [
      setTimeout(() => setLoadingText("در حال بارگذاری تنظیمات"), 400),
      setTimeout(() => setLoadingText("در حال آماده‌سازی داده‌ها"), 1200),
      setTimeout(() => setLoadingText("آماده‌سازی کامل شد"), 2000)
    ];
    
    // شبیه‌سازی پیشرفت بارگذاری با تمرکز بر عملکرد بهتر
    const startProgress = 10;
    const targetProgress = 100;
    const duration = 2500; // کاهش به 2.5 ثانیه برای بهبود سرعت
    const totalSteps = Math.min(15, Math.floor(duration / 100)); // محدود کردن تعداد مراحل به حداکثر 15
    const stepSize = (targetProgress - startProgress) / totalSteps;
    const stepDuration = duration / totalSteps;
    
    let currentProgress = startProgress;
    const progressTimers = [];
    
    // استفاده از تعداد محدودتری از مراحل برای کاهش پرش صفحه
    for (let step = 0; step < totalSteps; step++) {
      const timer = setTimeout(() => {
        currentProgress = Math.min(startProgress + stepSize * (step + 1), step === totalSteps - 1 ? 100 : 95);
        setProgress(Math.floor(currentProgress));
      }, stepDuration * step);
      
      progressTimers.push(timer);
    }
    
    // اطمینان از رسیدن به 100٪ در انتها
    const finalTimer = setTimeout(() => {
      setProgress(100);
    }, duration);
    
    return () => {
      textTimers.forEach(clearTimeout);
      progressTimers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, []);
  
  return {
    progress,
    gymName,
    loadingText
  };
};
