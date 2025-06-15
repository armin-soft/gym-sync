
import { useState, useEffect } from 'react';

interface StudentRealData {
  name: string;
  totalWorkouts: number;
  completedDays: number;
  weeklyProgress: number;
  todayWorkouts: number;
  calories: number;
  weeklyGoal: number;
  weightProgress: number;
  nextWorkout: string;
  currentWeight: number;
  targetWeight: number;
  totalMeals: number;
  totalSupplements: number;
  exerciseStreak: number;
  mealCompletionRate: number;
  supplementCompletionRate: number;
  recentActivities: Array<{
    id: string;
    type: 'workout' | 'meal' | 'supplement' | 'progress';
    title: string;
    description: string;
    time: string;
    status: 'completed' | 'pending' | 'missed';
    value?: number;
  }>;
}

export const useStudentRealData = () => {
  const [data, setData] = useState<StudentRealData>({
    name: '',
    totalWorkouts: 0,
    completedDays: 0,
    weeklyProgress: 0,
    todayWorkouts: 0,
    calories: 0,
    weeklyGoal: 7,
    weightProgress: 0,
    nextWorkout: 'برنامه‌ای تعریف نشده',
    currentWeight: 0,
    targetWeight: 0,
    totalMeals: 0,
    totalSupplements: 0,
    exerciseStreak: 0,
    mealCompletionRate: 0,
    supplementCompletionRate: 0,
    recentActivities: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRealStudentData = () => {
      try {
        const studentData = localStorage.getItem('studentData');
        
        if (studentData) {
          const student = JSON.parse(studentData);
          
          // محاسبه کل تمرین‌ها از تمام روزهای هفته
          let totalWorkouts = 0;
          let completedDays = 0;
          
          for (let day = 1; day <= 7; day++) {
            const exercises = student[`exercisesDay${day}`];
            if (exercises && Array.isArray(exercises) && exercises.length > 0) {
              totalWorkouts += exercises.length;
              completedDays++;
            }
          }

          // محاسبه پیشرفت هفتگی
          const weeklyProgress = Math.round((completedDays / 7) * 100);

          // تمرین امروز
          const today = new Date().getDay();
          const dayNumber = today === 0 ? 7 : today;
          const todayExercises = student[`exercisesDay${dayNumber}`];
          const todayWorkouts = todayExercises && Array.isArray(todayExercises) ? todayExercises.length : 0;

          // محاسبه کالری از وعده‌های غذایی
          const totalMeals = (student.meals || []).length;
          const calories = totalMeals * 180; // تخمین میانگین کالری

          // مکمل‌ها
          const totalSupplements = (student.supplements || []).length + (student.vitamins || []).length;

          // پیدا کردن بعدی تمرین
          let nextWorkout = 'برنامه‌ای تعریف نشده';
          for (let i = 1; i <= 7; i++) {
            const checkDay = (dayNumber + i - 1) % 7 + 1;
            const exercises = student[`exercisesDay${checkDay}`];
            if (exercises && Array.isArray(exercises) && exercises.length > 0) {
              const dayNames = ['', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'];
              nextWorkout = `${dayNames[checkDay]}`;
              break;
            }
          }

          // محاسبه پیشرفت وزن
          const currentWeight = student.weight || 0;
          const targetWeight = student.targetWeight || currentWeight;
          const weightProgress = targetWeight ? Math.round(((currentWeight - (student.initialWeight || currentWeight)) / (targetWeight - (student.initialWeight || currentWeight))) * 100) : 0;

          // نرخ تکمیل
          const mealCompletionRate = totalMeals > 0 ? 85 : 0; // تخمین بر اساس تعداد وعده‌ها
          const supplementCompletionRate = totalSupplements > 0 ? 90 : 0;

          // استریک تمرین
          const exerciseStreak = completedDays;

          // فعالیت‌های اخیر واقعی
          const recentActivities = generateRecentActivities(student, totalWorkouts, totalMeals, totalSupplements);

          setData({
            name: student.name || 'شاگرد عزیز',
            totalWorkouts,
            completedDays,
            weeklyProgress,
            todayWorkouts,
            calories,
            weeklyGoal: 7,
            weightProgress: Math.max(0, Math.min(100, weightProgress)),
            nextWorkout,
            currentWeight,
            targetWeight,
            totalMeals,
            totalSupplements,
            exerciseStreak,
            mealCompletionRate,
            supplementCompletionRate,
            recentActivities
          });
        }
      } catch (error) {
        console.error('خطا در بارگذاری داده‌های واقعی شاگرد:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRealStudentData();
  }, []);

  return { data, loading };
};

const generateRecentActivities = (student: any, totalWorkouts: number, totalMeals: number, totalSupplements: number) => {
  const activities = [];
  
  // فعالیت‌های تمرینی
  if (totalWorkouts > 0) {
    activities.push({
      id: 'workout-week',
      type: 'workout' as const,
      title: 'تکمیل برنامه تمرینی هفتگی',
      description: `${totalWorkouts} تمرین در برنامه شما`,
      time: 'امروز',
      status: 'completed' as const,
      value: totalWorkouts
    });
  }

  // فعالیت‌های غذایی
  if (totalMeals > 0) {
    activities.push({
      id: 'meal-plan',
      type: 'meal' as const,
      title: 'برنامه غذایی تعریف شده',
      description: `${totalMeals} وعده غذایی`,
      time: 'امروز',
      status: 'pending' as const,
      value: totalMeals
    });
  }

  // فعالیت‌های مکمل
  if (totalSupplements > 0) {
    activities.push({
      id: 'supplements',
      type: 'supplement' as const,
      title: 'مکمل‌ها و ویتامین‌ها',
      description: `${totalSupplements} مکمل تعریف شده`,
      time: 'امروز',
      status: 'pending' as const,
      value: totalSupplements
    });
  }

  // پیشرفت وزن
  if (student.weight && student.targetWeight) {
    activities.push({
      id: 'weight-progress',
      type: 'progress' as const,
      title: 'پیگیری وزن',
      description: `وزن فعلی: ${student.weight} کیلو`,
      time: 'آخرین بروزرسانی',
      status: 'completed' as const,
      value: student.weight
    });
  }

  return activities.slice(0, 5);
};
