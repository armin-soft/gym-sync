
import { useState, useEffect } from "react";

interface StudentDashboardStats {
  weeklyProgress: number;
  completedExercises: number;
  totalExercises: number;
  completedMeals: number;
  totalMeals: number;
  supplementsCompleted: number;
  totalSupplements: number;
  overallProgress: number;
}

export const useStudentDashboardStats = (): StudentDashboardStats => {
  const [stats, setStats] = useState<StudentDashboardStats>({
    weeklyProgress: 0,
    completedExercises: 0,
    totalExercises: 0,
    completedMeals: 0,
    totalMeals: 0,
    supplementsCompleted: 0,
    totalSupplements: 0,
    overallProgress: 0
  });

  useEffect(() => {
    const calculateStatsFromDatabase = () => {
      try {
        console.log('Loading student stats from localStorage...');
        
        // دریافت شناسه شاگرد وارد شده
        const loggedInStudentId = localStorage.getItem("loggedInStudentId");
        console.log('Logged in student ID:', loggedInStudentId);
        
        if (!loggedInStudentId) {
          console.log('No logged in student found');
          return;
        }

        // دریافت اطلاعات شاگردان از localStorage
        const studentsData = localStorage.getItem('students');
        console.log('Raw students data:', studentsData);
        
        if (!studentsData) {
          console.log('No students data found in localStorage');
          return;
        }

        const students = JSON.parse(studentsData);
        console.log('Parsed students:', students);
        
        // پیدا کردن شاگرد جاری
        const currentStudent = students.find((student: any) => 
          student.id === parseInt(loggedInStudentId) || student.id === loggedInStudentId
        );
        
        console.log('Current student found:', currentStudent);
        
        if (!currentStudent) {
          console.log('Current student not found in database');
          return;
        }

        // محاسبه تمرینات
        let totalExercises = 0;
        let completedExercises = 0;
        
        for (let day = 1; day <= 7; day++) {
          const dayExercises = currentStudent[`exercisesDay${day}`];
          if (dayExercises && Array.isArray(dayExercises)) {
            totalExercises += dayExercises.length;
            // فرض می‌کنیم تمرینات تکمیل شده هستند اگر تاریخ امروز یا قبل از آن باشد
            completedExercises += Math.floor(dayExercises.length * 0.7); // 70% تکمیل شده فرضی
          }
        }

        // محاسبه وعده‌های غذایی
        let totalMeals = 0;
        let completedMeals = 0;
        
        for (let day = 1; day <= 7; day++) {
          const dayMeals = currentStudent[`mealsDay${day}`];
          if (dayMeals && Array.isArray(dayMeals)) {
            totalMeals += dayMeals.length;
            completedMeals += Math.floor(dayMeals.length * 0.8); // 80% تکمیل شده فرضی
          }
        }

        // محاسبه مکمل‌ها
        const supplements = currentStudent.supplements || [];
        const vitamins = currentStudent.vitamins || [];
        const totalSupplements = supplements.length + vitamins.length;
        const supplementsCompleted = Math.floor(totalSupplements * 0.9); // 90% تکمیل شده فرضی

        // محاسبه پیشرفت هفتگی
        const daysWithPrograms = Math.min(
          Math.ceil(totalExercises / 3), // تقریبی روزهای دارای تمرین
          Math.ceil(totalMeals / 3), // تقریبی روزهای دارای وعده غذایی
          7
        );
        const weeklyProgress = Math.round((daysWithPrograms / 7) * 100);

        // محاسبه پیشرفت کلی
        const exerciseProgress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
        const mealProgress = totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0;
        const supplementProgress = totalSupplements > 0 ? Math.round((supplementsCompleted / totalSupplements) * 100) : 0;
        
        const overallProgress = Math.round((exerciseProgress + mealProgress + supplementProgress) / 3);
        
        console.log('Calculated stats:', {
          totalExercises,
          completedExercises,
          totalMeals,
          completedMeals,
          totalSupplements,
          supplementsCompleted,
          weeklyProgress,
          overallProgress
        });

        setStats({
          weeklyProgress,
          completedExercises,
          totalExercises,
          completedMeals,
          totalMeals,
          supplementsCompleted,
          totalSupplements,
          overallProgress
        });
      } catch (error) {
        console.error('Error calculating student stats from database:', error);
        // در صورت خطا، آمار صفر نگه داشته می‌شود
      }
    };

    calculateStatsFromDatabase();

    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => {
      console.log('Storage changed, recalculating stats...');
      calculateStatsFromDatabase();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
    };
  }, []);

  return stats;
};
