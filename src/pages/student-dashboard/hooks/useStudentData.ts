
import { useState, useEffect, useMemo } from 'react';

interface StudentData {
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

export const useStudentData = () => {
  const [rawData, setRawData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // بارگذاری داده‌ها فقط یک بار
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('studentData');
        if (savedData) {
          setRawData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('خطا در بارگذاری داده‌های شاگرد:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // پردازش داده‌ها با useMemo برای بهینه‌سازی
  const studentData = useMemo((): StudentData => {
    if (!rawData) {
      return {
        name: 'شاگرد عزیز',
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
      };
    }

    // محاسبه کل تمرین‌ها و روزهای تکمیل شده
    let totalWorkouts = 0;
    let completedDays = 0;
    
    for (let day = 1; day <= 7; day++) {
      const exercises = rawData[`exercisesDay${day}`];
      if (exercises && Array.isArray(exercises) && exercises.length > 0) {
        totalWorkouts += exercises.length;
        completedDays++;
      }
    }

    const weeklyProgress = Math.round((completedDays / 7) * 100);

    // تمرین امروز
    const today = new Date().getDay();
    const dayNumber = today === 0 ? 7 : today;
    const todayExercises = rawData[`exercisesDay${dayNumber}`];
    const todayWorkouts = todayExercises && Array.isArray(todayExercises) ? todayExercises.length : 0;

    // محاسبه وعده‌ها و مکمل‌ها
    const totalMeals = (rawData.meals || []).length;
    const totalSupplements = (rawData.supplements || []).length + (rawData.vitamins || []).length;
    const calories = totalMeals * 180; // تخمین کالری

    // محاسبه پیشرفت وزن
    const currentWeight = rawData.weight || 0;
    const targetWeight = rawData.targetWeight || currentWeight;
    const initialWeight = rawData.initialWeight || currentWeight;
    let weightProgress = 0;
    
    if (targetWeight !== initialWeight) {
      weightProgress = Math.round(((currentWeight - initialWeight) / (targetWeight - initialWeight)) * 100);
      weightProgress = Math.max(0, Math.min(100, weightProgress));
    }

    // نرخ‌های تکمیل
    const mealCompletionRate = totalMeals > 0 ? 85 : 0;
    const supplementCompletionRate = totalSupplements > 0 ? 90 : 0;
    const exerciseStreak = completedDays;

    // فعالیت‌های اخیر
    const recentActivities = [
      ...(totalWorkouts > 0 ? [{
        id: 'workout-week',
        type: 'workout' as const,
        title: 'برنامه تمرینی هفتگی',
        description: `${totalWorkouts} تمرین در برنامه شما تعریف شده است`,
        time: 'امروز',
        status: 'completed' as const,
        value: totalWorkouts
      }] : []),
      ...(totalMeals > 0 ? [{
        id: 'meal-plan',
        type: 'meal' as const,
        title: 'برنامه غذایی روزانه',
        description: `${totalMeals} وعده غذایی برای شما تنظیم شده`,
        time: 'امروز',
        status: 'pending' as const,
        value: totalMeals
      }] : []),
      ...(totalSupplements > 0 ? [{
        id: 'supplements',
        type: 'supplement' as const,
        title: 'مکمل‌ها و ویتامین‌ها',
        description: `${totalSupplements} مکمل و ویتامین تجویز شده`,
        time: 'امروز',
        status: 'pending' as const,
        value: totalSupplements
      }] : []),
      {
        id: 'progress-update',
        type: 'progress' as const,
        title: 'به‌روزرسانی پیشرفت',
        description: `پیشرفت هفتگی شما ${weeklyProgress}% محاسبه شد`,
        time: 'یک ساعت پیش',
        status: 'completed' as const,
        value: weeklyProgress
      }
    ].slice(0, 5);

    return {
      name: rawData.name || 'شاگرد عزیز',
      totalWorkouts,
      completedDays,
      weeklyProgress,
      todayWorkouts,
      calories,
      weeklyGoal: 7,
      weightProgress,
      nextWorkout: 'برنامه بعدی',
      currentWeight,
      targetWeight,
      totalMeals,
      totalSupplements,
      exerciseStreak,
      mealCompletionRate,
      supplementCompletionRate,
      recentActivities
    };
  }, [rawData]);

  return { studentData, loading };
};
