
import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  const [progress, setProgress] = useState(100); // شروع با 100% برای عدم نمایش لودینگ
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("آماده‌سازی کامل شد");
  
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
  }, []);
  
  return {
    progress,
    gymName,
    loadingText
  };
};
