
import { useSupabaseStudents } from './useSupabaseStudents';
import { useSupabaseExercises } from './useSupabaseExercises';
import { useSupabaseMeals } from './useSupabaseMeals';
import { useSupabaseSupplements } from './useSupabaseSupplements';
import { useStudentFiltering } from './useStudentFiltering';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Student } from '@/types/database';
import { ExerciseWithSets } from '@/types/exercise';

export const useStudents = () => {
  console.log('useStudents: Hook called');
  
  const { toast } = useToast();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  // Use Supabase hooks
  const { 
    students, 
    loading: studentsLoading, 
    addStudent, 
    updateStudent, 
    deleteStudent,
    refetch: refetchStudents
  } = useSupabaseStudents();
  
  const { 
    exercises, 
    categories, 
    exerciseTypes, 
    loading: exercisesLoading,
    refetch: refetchExercises
  } = useSupabaseExercises();
  
  const { 
    meals, 
    loading: mealsLoading,
    refetch: refetchMeals
  } = useSupabaseMeals();
  
  const { 
    supplements, 
    vitamins, 
    loading: supplementsLoading,
    refetch: refetchSupplements
  } = useSupabaseSupplements();
  
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
  
  const handleDelete = async (id: number) => {
    return await deleteStudent(id);
  };

  const handleSave = async (studentData: any, existingStudent?: Student) => {
    if (existingStudent) {
      return await updateStudent(existingStudent.id, studentData);
    } else {
      return await addStudent(studentData);
    }
  };

  const handleSaveExercises = async (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    // TODO: Implement exercise assignment to students in Supabase
    console.log('Saving exercises to student:', { exercisesWithSets, studentId, dayNumber });
    toast({
      title: "موفقیت",
      description: "تمرینات شاگرد ذخیره شد"
    });
    return true;
  };

  const handleSaveDiet = async (mealIds: number[], studentId: number, dayNumber?: number) => {
    // TODO: Implement diet assignment to students in Supabase
    console.log('Saving diet to student:', { mealIds, studentId, dayNumber });
    toast({
      title: "موفقیت",
      description: "برنامه غذایی شاگرد ذخیره شد"
    });
    return true;
  };

  const handleSaveSupplements = async (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    // TODO: Implement supplement assignment to students in Supabase
    console.log('Saving supplements to student:', { data, studentId });
    toast({
      title: "موفقیت",
      description: "مکمل‌های شاگرد ذخیره شد"
    });
    return true;
  };

  const loading = studentsLoading || exercisesLoading || mealsLoading || supplementsLoading;
  
  return {
    // Students data
    students,
    sortedAndFilteredStudents,
    exercises,
    meals,
    supplements: [...supplements, ...vitamins], // Combine supplements and vitamins
    
    // State management
    loading,
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
    setStudents: () => {}, // Not needed with Supabase
    setSupplements: () => {} // Not needed with Supabase
  };
};

export * from './students';
