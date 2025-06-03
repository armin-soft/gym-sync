
import { useState, useEffect } from "react";

interface DietStats {
  totalMeals: number;
  totalStudents: number;
  weeklyPlans: number;
  completionRate: number;
}

export const useDietData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dietStats, setDietStats] = useState<DietStats>({
    totalMeals: 0,
    totalStudents: 0,
    weeklyPlans: 0,
    completionRate: 0,
  });
  const [weeklyPlans, setWeeklyPlans] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        // Load meals
        const savedMeals = localStorage.getItem('meals');
        const mealsData = savedMeals ? JSON.parse(savedMeals) : [];
        setMeals(mealsData);

        // Load students
        const savedStudents = localStorage.getItem('students');
        const studentsData = savedStudents ? JSON.parse(savedStudents) : [];

        // Calculate stats
        const totalMeals = mealsData.length;
        const totalStudents = studentsData.length;
        const studentsWithDiet = studentsData.filter((student: any) => 
          student.meals && student.meals.length > 0
        ).length;
        const completionRate = totalStudents > 0 ? Math.round((studentsWithDiet / totalStudents) * 100) : 0;

        setDietStats({
          totalMeals,
          totalStudents,
          weeklyPlans: 7, // Sample weekly plans
          completionRate,
        });

        setWeeklyPlans([]); // Will be implemented later
        
      } catch (error) {
        console.error("Error loading diet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    dietStats,
    weeklyPlans,
    meals,
    isLoading,
  };
};
