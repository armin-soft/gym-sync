
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
    
    // شبیه‌سازی روند بارگذاری از 0 تا 100
    setProgress(0);
    
    const steps = [
      { progress: 15, text: "در حال آماده‌سازی محیط برنامه..." },
      { progress: 35, text: "در حال بارگذاری اطلاعات پایه..." },
      { progress: 60, text: "در حال آماده‌سازی رابط کاربری..." },
      { progress: 85, text: "در حال تکمیل اطلاعات..." },
      { progress: 100, text: "آماده‌سازی کامل شد" }
    ];
    
    // زمان‌بندی برای هر مرحله
    let currentStep = 0;
    
    const intervalId = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setLoadingText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(intervalId);
      }
    }, 700); // هر مرحله 700 میلی‌ثانیه
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    progress,
    gymName,
    loadingText
  };
};
