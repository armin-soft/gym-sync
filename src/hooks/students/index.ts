
import { useStudentManagement } from './useStudentManagement';
import { useStudentExercises } from './useStudentExercises';
import { useStudentDiet } from './useStudentDiet';
import { useStudentSupplements } from './useStudentSupplements';
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useStudents = () => {
  console.log('hooks/students/index.ts: useStudents called');
  
  // بارگذاری مستقیم از localStorage
  const [students, setStudents] = useState<Student[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  
  // بارگذاری اولیه شاگردان از localStorage
  useEffect(() => {
    const loadStudentsFromStorage = () => {
      try {
        console.log('hooks/students/index.ts: Loading students directly from localStorage...');
        
        // بررسی تمام کلیدهای localStorage
        console.log('hooks/students/index.ts: All localStorage keys:', Object.keys(localStorage));
        
        const savedStudents = localStorage.getItem('students');
        console.log('hooks/students/index.ts: Raw localStorage data for "students":', savedStudents);
        
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          console.log('hooks/students/index.ts: Parsed students:', parsedStudents);
          console.log('hooks/students/index.ts: Students count:', Array.isArray(parsedStudents) ? parsedStudents.length : 'Not an array');
          console.log('hooks/students/index.ts: Students data:', parsedStudents);
          
          if (Array.isArray(parsedStudents)) {
            setStudents(parsedStudents);
            console.log('hooks/students/index.ts: Students loaded successfully:', parsedStudents.length);
          } else {
            console.warn('hooks/students/index.ts: Parsed data is not an array, setting empty array');
            setStudents([]);
          }
        } else {
          console.log('hooks/students/index.ts: No students found in localStorage');
          setStudents([]);
        }
      } catch (error) {
        console.error('hooks/students/index.ts: Error loading students from localStorage:', error);
        setStudents([]);
      } finally {
        setIsStudentsLoaded(true);
      }
    };

    loadStudentsFromStorage();

    // گوش دادن به تغییرات localStorage
    const handleStorageChange = () => {
      console.log('hooks/students/index.ts: Storage change detected, reloading students...');
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
    refreshData
  } = useStudentManagement();

  const { handleSaveExercises } = useStudentExercises(students, setStudents);
  const { handleSaveDiet } = useStudentDiet(students, setStudents);
  const { handleSaveSupplements } = useStudentSupplements(students, setStudents);

  console.log('hooks/students/index.ts: Final students count:', students.length);
  console.log('hooks/students/index.ts: Final students data:', students);

  // Helper function to trigger stats update
  const triggerStatsUpdate = () => {
    window.dispatchEvent(new CustomEvent('studentsUpdated'));
  };

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

  const enhancedSetStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    triggerStatsUpdate();
  };

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents: enhancedSetStudents,
    setSupplements,
    handleDelete: enhancedHandleDelete,
    handleSave: enhancedHandleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    refreshData
  };
};

export * from './useStudentManagement';
export * from './useStudentExercises';
export * from './useStudentDiet';
export * from './useStudentSupplements';
export * from './core';
