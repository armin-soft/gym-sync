
import { useState, useCallback, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';
import { SidebarStats } from "../../modern-sidebar/types";

export const useStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 5
  });

  const loadStats = useCallback(async () => {
    try {
      console.log('Loading sidebar stats from Supabase...');
      
      // Fetch students count
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('id');

      if (studentsError) {
        console.error('Error loading students for stats:', studentsError);
        return;
      }

      const studentsCount = students?.length || 0;
      
      // For now, use default values for active programs and completed sessions
      // TODO: Implement proper program tracking with student relationships
      const activeProgramsCount = Math.floor(studentsCount * 0.7); // Assume 70% have active programs
      const totalSessions = studentsCount * 12; // Assume average 12 sessions per student

      const newStats = {
        totalStudents: studentsCount,
        activePrograms: activeProgramsCount,
        completedSessions: totalSessions,
        rating: 5
      };

      console.log('New sidebar stats from Supabase:', newStats);
      setStats(newStats);
    } catch (error) {
      console.error('Error loading stats from Supabase:', error);
    }
  }, []);

  useEffect(() => {
    loadStats();

    // Set up real-time listener for students changes
    const channel = supabase
      .channel('sidebar-stats-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'students' }, 
        () => {
          console.log('Students data changed, reloading sidebar stats...');
          loadStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadStats]);

  return {
    stats,
    loadStats
  };
};
