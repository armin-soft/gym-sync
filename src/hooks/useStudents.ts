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
  
  // بارگذاری مستقیم از localStorage
  const [students, setStudents] = useState<Student[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  
  // بارگذاری اولیه شاگردان از localStorage
  useEffect(() => {
    const loadStudentsFromStorage = () => {
      try {
        console.log('useStudents: Loading students directly from localStorage...');
        
        // بررسی تمام کلیدهای localStorage
        console.log('useStudents: All localStorage keys:', Object.keys(localStorage));
        
        const savedStudents = localStorage.getItem('students');
        console.log('useStudents: Raw localStorage data for "students":', savedStudents);
        
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          console.log('useStudents: Parsed students:', parsedStudents);
          console.log('useStudents: Students count:', Array.isArray(parsedStudents) ? parsedStudents.length : 'Not an array');
          console.log('useStudents: Students data:', parsedStudents);
          
          if (Array.isArray(parsedStudents)) {
            setStudents(parsedStudents);
            console.log('useStudents: Students loaded successfully:', parsedStudents.length);
          } else {
            console.warn('useStudents: Parsed data is not an array, setting empty array');
            setStudents([]);
          }
        } else {
          console.log('useStudents: No students found in localStorage');
          setStudents([]);
        }
      } catch (error) {
        console.error('useStudents: Error loading students from localStorage:', error);
        setStudents([]);
      } finally {
        setIsStudentsLoaded(true);
      }
    };

    loadStudentsFromStorage();

    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => {
      console.log('useStudents: Storage change detected, reloading students...');
      loadStudentsFromStorage();
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
  
  const { 
    exercises, 
    meals, 
    supplements, 
    setSupplements, 
    handleDelete: originalHandleDelete, 
    handleSave: originalHandleSave,
    handleSaveExercises: originalHandleSaveExercises,
    handleSaveDiet: originalHandleSaveDiet,
    handleSaveSupplements: originalHandleSaveSupplements
  } = useStudentsImpl();
  
  console.log('useStudents: Final students count:', students.length);
  console.log('useStudents: Final students data:', students);
  
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
  
  // Wrap the original functions to trigger stats updates and update local state
  const enhancedHandleDelete = async (id: number) => {
    const result = await originalHandleDelete(id);
    if (result) {
      setStudents(prev => prev.filter(student => student.id !== id));
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSave = async (student: Student) => {
    const result = await originalHandleSave(student);
    if (result) {
      setStudents(prev => {
        const existingIndex = prev.findIndex(s => s.id === student.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = student;
          return updated;
        } else {
          return [...prev, student];
        }
      });
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveExercises = async (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    const result = await originalHandleSaveExercises(exercisesWithSets, studentId, dayNumber);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveDiet = async (mealIds: number[], studentId: number, dayNumber?: number) => {
    const result = await originalHandleSaveDiet(mealIds, studentId, dayNumber);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveSupplements = async (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    const result = await originalHandleSaveSupplements(data, studentId);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedSetStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
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
    loading: loading || !isStudentsLoaded,
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
