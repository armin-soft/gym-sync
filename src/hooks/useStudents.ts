
import { useStudents as useStudentsImpl } from './students';
import { useStudentFiltering } from './useStudentFiltering';
import { Student } from '@/components/students/StudentTypes';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { safeJSONParse } from '@/utils/database/index';
import { ExerciseWithSets } from '@/types/exercise';

// Helper function to trigger stats update
const triggerStatsUpdate = () => {
  window.dispatchEvent(new CustomEvent('studentsUpdated'));
};

export const useStudents = () => {
  console.log('useStudents: Hook called');
  
  const { 
    students, 
    exercises, 
    meals, 
    supplements, 
    setStudents,
    setSupplements, 
    handleDelete, 
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudentsImpl();
  
  console.log('useStudents: Students from useStudentsImpl:', students.length);
  
  // مجدداً بررسی مستقیم localStorage
  useEffect(() => {
    const checkLocalStorage = () => {
      try {
        const savedStudents = localStorage.getItem('students');
        console.log('useStudents: Direct localStorage check:', savedStudents ? 'Data exists' : 'No data');
        if (savedStudents) {
          const parsed = JSON.parse(savedStudents);
          console.log('useStudents: Parsed students:', Array.isArray(parsed) ? parsed.length : 'Not an array');
        }
      } catch (error) {
        console.error('useStudents: Error checking localStorage:', error);
      }
    };
    
    checkLocalStorage();
  }, []);
  
  const { toast } = useToast();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
  
  // Wrap the original functions to trigger stats updates
  const enhancedHandleDelete = async (id: number) => {
    const result = await handleDelete(id);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSave = async (student: Student) => {
    const result = await handleSave(student);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveExercises = async (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    const result = await handleSaveExercises(exercisesWithSets, studentId, dayNumber);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveDiet = async (mealIds: number[], studentId: number, dayNumber?: number) => {
    const result = await handleSaveDiet(mealIds, studentId, dayNumber);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveSupplements = async (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    const result = await handleSaveSupplements(data, studentId);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedSetStudents = (students: Student[]) => {
    setStudents(students);
    triggerStatsUpdate();
  };
  
  return {
    // Students data
    students,
    sortedAndFilteredStudents,
    exercises,
    meals,
    supplements,
    
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
    
    // CRUD operations with stats update triggers
    handleDelete: enhancedHandleDelete,
    handleSave: enhancedHandleSave,
    handleSaveExercises: enhancedHandleSaveExercises,
    handleSaveDiet: enhancedHandleSaveDiet,
    handleSaveSupplements: enhancedHandleSaveSupplements,
    setStudents: enhancedSetStudents,
    setSupplements
  };
};

export * from './students';
