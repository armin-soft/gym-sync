
import { useStudents as useStudentsImpl } from './students';
import { useStudentFiltering } from './useStudentFiltering';
import { Student } from '@/components/students/StudentTypes';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { safeJSONParse } from '@/utils/database/index';

// Helper function to trigger stats update
const triggerStatsUpdate = () => {
  window.dispatchEvent(new CustomEvent('studentsUpdated'));
};

export const useStudents = () => {
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

  const enhancedHandleSaveExercises = async (studentId: number, exercises: any) => {
    const result = await handleSaveExercises(studentId, exercises);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveDiet = async (studentId: number, diet: any) => {
    const result = await handleSaveDiet(studentId, diet);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveSupplements = async (studentId: number, supplements: any) => {
    const result = await handleSaveSupplements(studentId, supplements);
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
