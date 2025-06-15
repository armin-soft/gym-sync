
import { useState, useCallback } from "react";
import { SidebarStats } from "@/components/modern-sidebar/types";

export const useStudentStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activeStudents: 0,
    completedToday: 0,
    monthlyGrowth: 0
  });

  const loadStats = useCallback(() => {
    try {
      // For student panel, we show different stats
      setStats({
        totalStudents: 12, // Total workouts
        activeStudents: 8, // Completed workouts
        completedToday: 3, // Today's exercises
        monthlyGrowth: 15  // Progress percentage
      });
      
      console.log('Student stats loaded');
    } catch (error) {
      console.error('خطا در بارگذاری آمار شاگرد:', error);
    }
  }, []);

  return { stats, loadStats };
};
