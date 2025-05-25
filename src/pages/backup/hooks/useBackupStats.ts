
import { useState, useEffect } from "react";

export function useBackupStats() {
  const [realStats, setRealStats] = useState({
    students: 0,
    exercises: 0,
    meals: 0,
    supplements: 0
  });

  // Calculate real statistics from localStorage
  useEffect(() => {
    const calculateRealStats = () => {
      try {
        const studentsData = localStorage.getItem('students');
        const exercisesData = localStorage.getItem('exercises');
        const mealsData = localStorage.getItem('meals');
        const supplementsData = localStorage.getItem('supplements');

        const studentsCount = studentsData ? JSON.parse(studentsData).length : 0;
        const exercisesCount = exercisesData ? JSON.parse(exercisesData).length : 0;
        const mealsCount = mealsData ? JSON.parse(mealsData).length : 0;
        const supplementsCount = supplementsData ? JSON.parse(supplementsData).length : 0;

        setRealStats({
          students: studentsCount,
          exercises: exercisesCount,
          meals: mealsCount,
          supplements: supplementsCount
        });
      } catch (error) {
        console.error("خطا در محاسبه آمار:", error);
        setRealStats({ students: 0, exercises: 0, meals: 0, supplements: 0 });
      }
    };

    calculateRealStats();
    
    // Listen for storage changes to update stats
    const handleStorageChange = () => calculateRealStats();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { realStats };
}
