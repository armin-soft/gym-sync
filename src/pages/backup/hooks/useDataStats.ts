
import { useState, useEffect } from "react";

export interface DataStats {
  students: number;
  exercises: number;
  meals: number;
  supplements: number;
  totalSize: string;
}

export function useDataStats() {
  const [stats, setStats] = useState<DataStats>({
    students: 0,
    exercises: 0,
    meals: 0,
    supplements: 0,
    totalSize: "0 کیلوبایت"
  });

  const calculateStats = () => {
    try {
      const studentsData = localStorage.getItem('students');
      const exercisesData = localStorage.getItem('exercises');
      const mealsData = localStorage.getItem('meals');
      const supplementsData = localStorage.getItem('supplements');

      const studentsCount = studentsData ? JSON.parse(studentsData).length : 0;
      const exercisesCount = exercisesData ? JSON.parse(exercisesData).length : 0;
      const mealsCount = mealsData ? JSON.parse(mealsData).length : 0;
      const supplementsCount = supplementsData ? JSON.parse(supplementsData).length : 0;

      // Calculate total size more accurately
      let totalBytes = 0;
      
      // Calculate size of all localStorage data
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const value = localStorage.getItem(key);
          if (value) {
            // Calculate size including key and value
            totalBytes += key.length + value.length;
          }
        }
      }
      
      // Convert bytes to appropriate unit
      let totalSize: string;
      if (totalBytes < 1024) {
        totalSize = `${totalBytes} بایت`;
      } else if (totalBytes < 1024 * 1024) {
        const totalKB = Math.round(totalBytes / 1024 * 100) / 100;
        totalSize = `${totalKB} کیلوبایت`;
      } else {
        const totalMB = Math.round(totalBytes / (1024 * 1024) * 100) / 100;
        totalSize = `${totalMB} مگابایت`;
      }

      setStats({
        students: studentsCount,
        exercises: exercisesCount,
        meals: mealsCount,
        supplements: supplementsCount,
        totalSize
      });
    } catch (error) {
      console.error("خطا در محاسبه آمار:", error);
    }
  };

  useEffect(() => {
    calculateStats();
    
    // Listen for localStorage changes
    const handleStorageChange = () => calculateStats();
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom storage events (for same-tab updates)
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (['students', 'exercises', 'meals', 'supplements'].includes(e.detail.key)) {
        calculateStats();
      }
    };
    
    window.addEventListener('localStorage-updated', handleCustomStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage-updated', handleCustomStorageChange as EventListener);
    };
  }, []);

  return { stats, refreshStats: calculateStats };
}
