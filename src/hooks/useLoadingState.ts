
import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  // Make sure this hook is used inside a React function component
  const [progress, setProgress] = useState(100); // Start with 100% to not show loading
  const [gymName, setGymName] = useState("");
  const [loadingText, setLoadingText] = useState("آماده‌سازی کامل شد");
  
  useEffect(() => {
    // Load gym name from trainer profile
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
