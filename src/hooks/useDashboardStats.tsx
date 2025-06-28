
import { useEffect, useState, useCallback } from "react";
import { supabase } from '@/integrations/supabase/client';
import type { DashboardStats } from "@/types/dashboard";

const initialStats: DashboardStats = {
  totalStudents: 0,
  totalMeals: 0,
  totalSupplements: 0,
  studentsProgress: 0,
  studentGrowth: 0,
  mealGrowth: 0,
  supplementGrowth: 0,
  maxCapacity: 50,
  mealCompletionRate: 0,
  supplementCompletionRate: 0
};

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>(initialStats);

  const calculateStats = useCallback(async () => {
    try {
      // Fetch all data from Supabase
      const [
        { data: students, error: studentsError },
        { data: meals, error: mealsError },
        { data: supplements, error: supplementsError },
        { data: vitamins, error: vitaminsError },
        { data: exercises, error: exercisesError }
      ] = await Promise.all([
        supabase.from('students').select('*'),
        supabase.from('meals').select('*'),
        supabase.from('supplements').select('*'),
        supabase.from('vitamins').select('*'),
        supabase.from('exercises').select('*')
      ]);

      if (studentsError || mealsError || supplementsError || vitaminsError || exercisesError) {
        console.error('Error fetching stats data:', {
          studentsError,
          mealsError,
          supplementsError,
          vitaminsError,
          exercisesError
        });
        return;
      }

      // Calculate stats
      const totalStudents = students?.length || 0;
      const totalMeals = meals?.length || 0;
      const totalSupplements = (supplements?.length || 0) + (vitamins?.length || 0);
      
      // For now, set default values for complex calculations
      // TODO: Implement proper progress tracking with student relationships
      const averageProgress = 75; // Default progress
      const mealCompletionRate = 85; // Default completion rate
      const supplementCompletionRate = 70; // Default completion rate

      setStats({
        totalStudents,
        totalMeals,
        totalSupplements,
        studentsProgress: averageProgress,
        studentGrowth: 12, // Default growth
        mealGrowth: 8, // Default growth
        supplementGrowth: 15, // Default growth
        maxCapacity: 50,
        mealCompletionRate,
        supplementCompletionRate
      });

    } catch (error) {
      console.error('Error calculating dashboard stats:', error);
      setStats(initialStats);
    }
  }, []);

  useEffect(() => {
    calculateStats();
    
    // Set up real-time listeners for data changes
    const studentsChannel = supabase
      .channel('students-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'students' }, 
        () => calculateStats()
      )
      .subscribe();

    const mealsChannel = supabase
      .channel('meals-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'meals' }, 
        () => calculateStats()
      )
      .subscribe();

    const supplementsChannel = supabase
      .channel('supplements-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'supplements' }, 
        () => calculateStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(studentsChannel);
      supabase.removeChannel(mealsChannel);
      supabase.removeChannel(supplementsChannel);
    };
  }, [calculateStats]);

  return stats;
};
