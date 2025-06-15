
import { useState, useCallback } from "react";
import { StudentSidebarStats } from "../types/studentSidebarStats";

export const useStudentStatsData = () => {
  const [stats, setStats] = useState<StudentSidebarStats>({
    totalWorkouts: 24,
    completedDays: 45,
    achievedGoals: 8,
    progressPercent: 85
  });

  const loadStats = useCallback(() => {
    try {
      const savedStats = localStorage.getItem('studentStats');
      if (savedStats) {
        const data = JSON.parse(savedStats);
        setStats(data);
      }
    } catch (error) {
      console.error('خطا در بارگذاری آمار شاگرد:', error);
    }
  }, []);

  return { stats, loadStats };
};
