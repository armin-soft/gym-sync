
import { useState, useEffect, useMemo } from 'react';

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
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // بارگذاری داده‌ها فقط یک بار
  useEffect(() => {
    const loadStudentData = () => {
      try {
        const data = localStorage.getItem('studentData');
        if (data) {
          setStudentData(JSON.parse(data));
        }
      } catch (error) {
        console.error('خطا در بارگذاری داده‌های شاگرد:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  // محاسبات با useMemo برای بهینه‌سازی
  const data = useMemo((): StudentRealData => {
    if (!studentData) {
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

    // محاسبه کل تمرین‌ها
    let totalWorkouts = 0;
    let completedDays = 0;
    
    for (let day = 1; day <= 7; day++) {
      const exercises = studentData[`exercisesDay${day}`];
      if (exercises && Array.isArray(exercises) && exercises.length > 0) {
        totalWorkouts += exercises.length;
        completedDays++;
      }
    }

    const weeklyProgress = Math.round((completedDays / 7) * 100);

    // تمرین امروز
    const today = new Date().getDay();
    const dayNumber = today === 0 ? 7 : today;
    const todayExercises = studentData[`exercisesDay${dayNumber}`];
    const todayWorkouts = todayExercises && Array.isArray(todayExercises) ? todayExercises.length : 0;

    const totalMeals = (studentData.meals || []).length;
    const calories = totalMeals * 180;
    const totalSupplements = (studentData.supplements || []).length + (studentData.vitamins || []).length;

    // پیدا کردن بعدی تمرین
    let nextWorkout = 'برنامه‌ای تعریف نشده';
    for (let i = 1; i <= 7; i++) {
      const checkDay = (dayNumber + i - 1) % 7 + 1;
      const exercises = studentData[`exercisesDay${checkDay}`];
      if (exercises && Array.isArray(exercises) && exercises.length > 0) {
        const dayNames = ['', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'];
        nextWorkout = `${dayNames[checkDay]}`;
        break;
      }
    }

    const currentWeight = studentData.weight || 0;
    const targetWeight = studentData.targetWeight || currentWeight;
    const weightProgress = targetWeight ? Math.round(((currentWeight - (studentData.initialWeight || currentWeight)) / (targetWeight - (studentData.initialWeight || currentWeight))) * 100) : 0;

    const mealCompletionRate = totalMeals > 0 ? 85 : 0;
    const supplementCompletionRate = totalSupplements > 0 ? 90 : 0;
    const exerciseStreak = completedDays;

    const recentActivities = [
      ...(totalWorkouts > 0 ? [{
        id: 'workout-week',
        type: 'workout' as const,
        title: 'تکمیل برنامه تمرینی هفتگی',
        description: `${totalWorkouts} تمرین در برنامه شما`,
        time: 'امروز',
        status: 'completed' as const,
        value: totalWorkouts
      }] : []),
      ...(totalMeals > 0 ? [{
        id: 'meal-plan',
        type: 'meal' as const,
        title: 'برنامه غذایی تعریف شده',
        description: `${totalMeals} وعده غذایی`,
        time: 'امروز',
        status: 'pending' as const,
        value: totalMeals
      }] : []),
      ...(totalSupplements > 0 ? [{
        id: 'supplements',
        type: 'supplement' as const,
        title: 'مکمل‌ها و ویتامین‌ها',
        description: `${totalSupplements} مکمل تعریف شده`,
        time: 'امروز',
        status: 'pending' as const,
        value: totalSupplements
      }] : [])
    ].slice(0, 5);

    return {
      name: studentData.name || 'شاگرد عزیز',
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
    };
  }, [studentData]);

  return { data, loading };
};
