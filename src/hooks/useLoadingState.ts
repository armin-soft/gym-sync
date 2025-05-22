
import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  // عددی بین 0 تا 100
  const [progress, setProgress] = useState(100);
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("آماده‌سازی کامل شد");
  
  useEffect(() => {
    // ایجاد یک انیمیشن لود که افزایشی است
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
    
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
  }, [progress]);
  
  // تابع کاربردی برای شروع انیمیشن لودینگ
  const startLoading = () => {
    setProgress(0);
    setLoadingText("در حال بارگذاری منابع...");
  };
  
  // تابع برای پایان دادن به انیمیشن لودینگ
  const completeLoading = () => {
    setProgress(100);
    setLoadingText("آماده‌سازی کامل شد");
  };
  
  // تابع برای آپدیت کردن متن لودینگ
  const updateLoadingText = (text: string) => {
    setLoadingText(text);
  };
  
  return {
    progress,
    gymName,
    loadingText,
    startLoading,
    completeLoading,
    updateLoadingText
  };
};
