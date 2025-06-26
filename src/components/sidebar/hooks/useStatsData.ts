
import { useState, useCallback, useEffect } from "react";
import { SidebarStats } from "../../modern-sidebar/types";

export const useStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 5
  });

  const loadStats = useCallback(() => {
    try {
      console.log('Loading sidebar stats...');
      const savedStudents = localStorage.getItem('students');
      let studentsCount = 0;
      let activeProgramsCount = 0;
      
      if (savedStudents) {
        const students = JSON.parse(savedStudents);
        if (Array.isArray(students)) {
          studentsCount = students.length;
          console.log('Students count for sidebar:', studentsCount);
          
          activeProgramsCount = students.filter(student => {
            const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
            const hasDiet = student.diet && Array.isArray(student.diet) && student.diet.length > 0;
            const hasSupplements = student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0;
            return hasExercises || hasDiet || hasSupplements;
          }).length;
        }
      }

      let totalSessions = 0;
      if (savedStudents) {
        const students = JSON.parse(savedStudents);
        if (Array.isArray(students)) {
          students.forEach(student => {
            if (student.exercises) {
              Object.keys(student.exercises).forEach(day => {
                if (Array.isArray(student.exercises[day])) {
                  totalSessions += student.exercises[day].length;
                }
              });
            }
          });
        }
      }

      const newStats = {
        totalStudents: studentsCount,
        activePrograms: activeProgramsCount,
        completedSessions: totalSessions,
        rating: 5
      };

      console.log('New sidebar stats:', newStats);
      setStats(newStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  // Load stats on mount and listen for changes
  useEffect(() => {
    loadStats();

    const handleStorageChange = (e?: StorageEvent) => {
      console.log('Stats data: Storage change detected', e?.key);
      loadStats();
    };

    const handleCustomEvent = (e: CustomEvent) => {
      console.log('Stats data: Custom event detected', e.type);
      loadStats();
    };

    // Listen for various events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleCustomEvent as EventListener);
    window.addEventListener('profileUpdated', handleCustomEvent as EventListener);
    window.addEventListener('localStorage-updated', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleCustomEvent as EventListener);
      window.removeEventListener('profileUpdated', handleCustomEvent as EventListener);
      window.removeEventListener('localStorage-updated', handleCustomEvent as EventListener);
    };
  }, [loadStats]);

  return {
    stats,
    loadStats
  };
};
