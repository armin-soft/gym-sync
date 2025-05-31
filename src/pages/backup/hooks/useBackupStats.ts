
import { useState, useEffect } from "react";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";

export function useBackupStats() {
  const [realStats, setRealStats] = useState({
    students: 0,
    exercises: 0,
    meals: 0,
    supplements: 0
  });

  // محاسبه آمار واقعی از localStorage
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

      const newStats = {
        students: studentsCount,
        exercises: exercisesCount,
        meals: mealsCount,
        supplements: supplementsCount
      };

      console.log('محاسبه آمار جدید:', newStats);
      setRealStats(newStats);
    } catch (error) {
      console.error("خطا در محاسبه آمار:", error);
      setRealStats({ students: 0, exercises: 0, meals: 0, supplements: 0 });
    }
  };

  // استفاده از سیستم بروزرسانی خودکار
  const { lastRefresh, isRefreshing, triggerManualRefresh } = useAutoRefresh({
    interval: 10000, // هر 10 ثانیه
    onRefresh: calculateRealStats,
    enabled: true
  });

  // محاسبه اولیه آمار
  useEffect(() => {
    calculateRealStats();
  }, []);

  return { 
    realStats, 
    lastRefresh, 
    isRefreshing, 
    refreshStats: triggerManualRefresh 
  };
}
