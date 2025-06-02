
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

      // Calculate total size
      const totalBytes = (studentsData?.length || 0) + 
                        (exercisesData?.length || 0) + 
                        (mealsData?.length || 0) + 
                        (supplementsData?.length || 0);
      
      const totalKB = Math.round(totalBytes / 1024);
      const totalSize = totalKB > 1024 ? 
        `${Math.round(totalKB / 1024)} مگابایت` : 
        `${totalKB} کیلوبایت`;

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
    
    const handleStorageChange = () => calculateStats();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { stats, refreshStats: calculateStats };
}
