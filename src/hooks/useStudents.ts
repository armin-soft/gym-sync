
import { useStudentFiltering } from './useStudentFiltering';
import { Student } from '@/components/students/StudentTypes';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ExerciseWithSets } from '@/types/exercise';

// Helper function to trigger stats update
const triggerStatsUpdate = () => {
  window.dispatchEvent(new CustomEvent('studentsUpdated'));
};

export const useStudents = () => {
  console.log('useStudents: Hook called');
  
  // بارگذاری مستقیم از localStorage
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  const { toast } = useToast();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // بارگذاری اولیه داده‌ها از localStorage
  useEffect(() => {
    const loadAllData = () => {
      try {
        console.log('useStudents: Loading all data from localStorage...');
        
        // بارگذاری شاگردان
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          if (Array.isArray(parsedStudents)) {
            setStudents(parsedStudents);
            console.log('useStudents: Students loaded successfully:', parsedStudents.length);
          }
        }
        
        // بارگذاری تمرینات
        const savedExercises = localStorage.getItem('exercises');
        if (savedExercises) {
          const parsedExercises = JSON.parse(savedExercises);
          if (Array.isArray(parsedExercises)) {
            setExercises(parsedExercises);
          }
        }
        
        // بارگذاری وعده‌های غذایی
        const savedMeals = localStorage.getItem('meals');
        if (savedMeals) {
          const parsedMeals = JSON.parse(savedMeals);
          if (Array.isArray(parsedMeals)) {
            setMeals(parsedMeals);
          }
        }
        
        // بارگذاری مکمل‌ها
        const savedSupplements = localStorage.getItem('supplements');
        if (savedSupplements) {
          const parsedSupplements = JSON.parse(savedSupplements);
          if (Array.isArray(parsedSupplements)) {
            setSupplements(parsedSupplements);
          }
        }
        
      } catch (error) {
        console.error('useStudents: Error loading data from localStorage:', error);
        setStudents([]);
      } finally {
        setIsStudentsLoaded(true);
      }
    };

    loadAllData();

    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => {
      console.log('useStudents: Storage change detected, reloading...');
      loadAllData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);
    window.addEventListener('localStorage-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
      window.removeEventListener('localStorage-updated', handleStorageChange);
    };
  }, []);
  
  // بررسی تکمیل پروفایل
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setIsProfileComplete(Boolean(profile.name && profile.gymName && profile.phone));
      } catch (error) {
        console.error('Error checking profile completeness:', error);
      }
    }
    setLoading(false);
  }, []);
  
  const { 
    searchQuery, 
    setSearchQuery, 
    sortField, 
    sortOrder, 
    toggleSort, 
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);
  
  // تابع حذف شاگرد
  const handleDelete = (studentId: number) => {
    try {
      console.log("Deleting student with ID:", studentId);
      
      const updatedStudents = students.filter(student => student.id !== studentId);
      
      // بروزرسانی localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      // بروزرسانی state محلی
      setStudents(updatedStudents);
      
      // اطلاع‌رسانی به سایر کامپوننت‌ها
      triggerStatsUpdate();
      
      toast({
        title: "حذف موفق",
        description: "شاگرد با موفقیت حذف شد",
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "خطا در حذف",
        description: "مشکلی در حذف شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    }
  };

  // تابع ذخیره شاگرد
  const handleSave = (studentData: any, existingStudent?: Student) => {
    try {
      console.log("Saving student data:", studentData);
      
      let updatedStudents;
      
      if (existingStudent) {
        // ویرایش شاگرد موجود
        updatedStudents = students.map(student =>
          student.id === existingStudent.id
            ? { 
                ...student, 
                ...studentData,
                createdAt: student.createdAt
              }
            : student
        );
        
        toast({
          title: "ویرایش موفق",
          description: "اطلاعات شاگرد با موفقیت ویرایش شد",
        });
      } else {
        // افزودن شاگرد جدید
        const newId = Math.max(...students.map(s => s.id), 0) + 1;
        const newStudent: Student = {
          ...studentData,
          id: newId,
          createdAt: new Date().toISOString()
        };
        
        updatedStudents = [...students, newStudent];
        
        toast({
          title: "افزودن موفق",
          description: "شاگرد جدید با موفقیت اضافه شد",
        });
      }
      
      // بروزرسانی localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      // بروزرسانی state محلی
      setStudents(updatedStudents);
      
      // اطلاع‌رسانی به سایر کامپوننت‌ها
      triggerStatsUpdate();
      
      return true;
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات شاگرد پیش آمد",
        variant: "destructive",
      });
      return false;
    }
  };

  // تابع ذخیره تمرینات
  const handleSaveExercises = (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          if (dayNumber) {
            const dayKey = `exercisesDay${dayNumber}` as keyof Student;
            const setsKey = `exerciseSetsDay${dayNumber}` as keyof Student;
            const repsKey = `exerciseRepsDay${dayNumber}` as keyof Student;
            
            (updatedStudent as any)[dayKey] = exercisesWithSets.map(e => e.exercise.id);
            (updatedStudent as any)[setsKey] = exercisesWithSets.reduce((acc, e) => ({
              ...acc,
              [e.exercise.id]: e.sets
            }), {});
            (updatedStudent as any)[repsKey] = exercisesWithSets.reduce((acc, e) => ({
              ...acc,
              [e.exercise.id]: e.reps
            }), {});
          } else {
            updatedStudent.exercises = exercisesWithSets.map(e => e.exercise.id);
            updatedStudent.exerciseSets = exercisesWithSets.reduce((acc, e) => ({
              ...acc,
              [e.exercise.id]: e.sets
            }), {});
            updatedStudent.exerciseReps = exercisesWithSets.reduce((acc, e) => ({
              ...acc,
              [e.exercise.id]: e.reps
            }), {});
          }
          
          return updatedStudent;
        }
        return student;
      });
      
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      triggerStatsUpdate();
      
      return true;
    } catch (error) {
      console.error("Error saving exercises:", error);
      return false;
    }
  };

  // تابع ذخیره رژیم غذایی
  const handleSaveDiet = (mealIds: number[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          if (dayNumber) {
            const dayKey = `mealsDay${dayNumber}` as keyof Student;
            (updatedStudent as any)[dayKey] = mealIds;
          } else {
            updatedStudent.meals = mealIds;
          }
          
          return updatedStudent;
        }
        return student;
      });
      
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      triggerStatsUpdate();
      
      return true;
    } catch (error) {
      console.error("Error saving diet:", error);
      return false;
    }
  };

  // تابع ذخیره مکمل‌ها
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          if (data.day) {
            const suppKey = `supplementsDay${data.day}` as keyof Student;
            const vitKey = `vitaminsDay${data.day}` as keyof Student;
            (updatedStudent as any)[suppKey] = data.supplements;
            (updatedStudent as any)[vitKey] = data.vitamins;
          } else {
            updatedStudent.supplements = data.supplements;
            updatedStudent.vitamins = data.vitamins;
          }
          
          return updatedStudent;
        }
        return student;
      });
      
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      triggerStatsUpdate();
      
      return true;
    } catch (error) {
      console.error("Error saving supplements:", error);
      return false;
    }
  };
  
  return {
    // Students data
    students,
    sortedAndFilteredStudents,
    exercises,
    meals,
    supplements,
    
    // State management
    loading: loading || !isStudentsLoaded,
    isProfileComplete,
    
    // Search & sort
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    handleClearSearch,
    
    // CRUD operations
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    setStudents,
    setSupplements
  };
};
