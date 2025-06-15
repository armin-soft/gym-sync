
import { useState, useCallback } from "react";
import { SidebarStats } from "@/components/modern-sidebar/types";

export const useStudentStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 0
  });

  const loadStats = useCallback(() => {
    try {
      // For student panel, we show different stats but use same interface
      setStats({
        totalStudents: 12, // Total workouts
        activePrograms: 8, // Completed workouts  
        completedSessions: 3, // Today's exercises
        rating: 4.8  // Progress rating
      });
      
      console.log('Student stats loaded');
    } catch (error) {
      console.error('خطا در بارگذاری آمار شاگرد:', error);
    }
  }, []);

  return { stats, loadStats };
};
