import { useState, useEffect } from 'react';

interface StudentDashboardData {
  totalWorkouts: number;
  completedDays: number;
  progressPercent: number;
  weeklyGoal: number;
  todayWorkouts: number;
  calories: number;
  nextWorkout: string;
  recentActivities: Array<{
    id: string;
    type: 'workout' | 'diet' | 'supplement';
    title: string;
    time: string;
    status: 'completed' | 'pending' | 'missed';
  }>;
}

export const useStudentDashboardData = () => {
  const [data, setData] = useState<StudentDashboardData>({
    totalWorkouts: 0,
    completedDays: 0,
    progressPercent: 0,
    weeklyGoal: 0,
    todayWorkouts: 0,
    calories: 0,
    nextWorkout: "برنامه‌ای تعریف نشده",
    recentActivities: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = () => {
      try {
        const studentData = localStorage.getItem('studentData');
        
        if (studentData) {
          const student = JSON.parse(studentData);
          
          // Calculate real dashboard data from student's program
          const totalWorkouts = calculateTotalWorkouts(student);
          const completedDays = calculateCompletedDays(student);
          const progressPercent = calculateProgressPercent(student);
          const weeklyGoal = 7; // Default weekly goal
          const todayWorkouts = getTodayWorkouts(student);
          const calories = calculateDailyCalories(student);
          const nextWorkout = getNextWorkout(student);
          const recentActivities = getRecentActivities(student);

          setData({
            totalWorkouts,
            completedDays,
            progressPercent,
            weeklyGoal,
            todayWorkouts,
            calories,
            nextWorkout,
            recentActivities
          });
        } else {
          // Keep empty data if no student found
          setData({
            totalWorkouts: 0,
            completedDays: 0,
            progressPercent: 0,
            weeklyGoal: 0,
            todayWorkouts: 0,
            calories: 0,
            nextWorkout: "برنامه‌ای تعریف نشده",
            recentActivities: []
          });
        }
      } catch (error) {
        console.error('خطا در بارگذاری داده‌های داشبورد:', error);
        // Reset to empty on error
        setData({
          totalWorkouts: 0,
          completedDays: 0,
          progressPercent: 0,
          weeklyGoal: 0,
          todayWorkouts: 0,
          calories: 0,
          nextWorkout: "خطا در بارگذاری برنامه",
          recentActivities: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return { data, loading };
};

// Helper functions
const calculateTotalWorkouts = (student: any): number => {
  let total = 0;
  for (let day = 1; day <= 7; day++) {
    const exercises = student[`exercisesDay${day}`];
    if (exercises && Array.isArray(exercises)) {
      total += exercises.length;
    }
  }
  return total;
};

const calculateCompletedDays = (student: any): number => {
  let completedDays = 0;
  for (let day = 1; day <= 7; day++) {
    const exercises = student[`exercisesDay${day}`];
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      completedDays++;
    }
  }
  return completedDays;
};

const calculateProgressPercent = (student: any): number => {
  const totalPossibleDays = 7;
  const completedDays = calculateCompletedDays(student);
  return Math.round((completedDays / totalPossibleDays) * 100);
};

const getTodayWorkouts = (student: any): number => {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayNumber = today === 0 ? 7 : today; // Convert to 1-7 format
  
  const exercises = student[`exercisesDay${dayNumber}`];
  return exercises && Array.isArray(exercises) ? exercises.length : 0;
};

const calculateDailyCalories = (student: any): number => {
  const meals = student.meals;
  if (!meals || !Array.isArray(meals)) return 0;
  
  // Estimate calories based on number of meals (rough calculation)
  return meals.length * 150; // Average 150 calories per meal item
};

const getNextWorkout = (student: any): string => {
  const today = new Date().getDay();
  const currentDay = today === 0 ? 7 : today;
  
  // Find next day with workouts
  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDay + i - 1) % 7 + 1;
    const exercises = student[`exercisesDay${checkDay}`];
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      const dayNames = ['', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'];
      return `روز ${dayNames[checkDay]}`;
    }
  }
  
  return "برنامه‌ای تعریف نشده";
};

const getRecentActivities = (student: any): Array<any> => {
  const activities = [];
  
  // Add workout activities
  for (let day = 1; day <= 7; day++) {
    const exercises = student[`exercisesDay${day}`];
    if (exercises && Array.isArray(exercises) && exercises.length > 0) {
      activities.push({
        id: `workout-${day}`,
        type: 'workout',
        title: `برنامه تمرینی روز ${day}`,
        time: `${exercises.length} تمرین`,
        status: 'pending'
      });
    }
  }
  
  // Add diet activity
  if (student.meals && Array.isArray(student.meals) && student.meals.length > 0) {
    activities.push({
      id: 'diet',
      type: 'diet',
      title: 'برنامه غذایی',
      time: `${student.meals.length} وعده`,
      status: 'pending'
    });
  }
  
  // Add supplement activity
  if (student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0) {
    activities.push({
      id: 'supplements',
      type: 'supplement',
      title: 'مکمل‌ها',
      time: `${student.supplements.length} مکمل`,
      status: 'pending'
    });
  }
  
  return activities.slice(0, 5); // Return max 5 activities
};
