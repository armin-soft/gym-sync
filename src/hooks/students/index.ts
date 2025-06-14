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
        
        const savedStudents = localStorage.getItem('students');
        console.log('hooks/students/index.ts: Raw localStorage data for "students":', savedStudents);
        
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          console.log('hooks/students/index.ts: Parsed students:', parsedStudents);
          console.log('hooks/students/index.ts: Students count:', Array.isArray(parsedStudents) ? parsedStudents.length : 'Not an array');
          
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
    const handleStorageChange = (event?: StorageEvent) => {
      console.log('hooks/students/index.ts: Storage change detected, reloading students...');
      if (!event || event.key === 'students' || event.key === null) {
        loadStudentsFromStorage();
      }
    };

    const handleCustomStudentsUpdate = () => {
      console.log('hooks/students/index.ts: Custom students update event detected');
      loadStudentsFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleCustomStudentsUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleCustomStudentsUpdate);
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

  // Helper function to trigger stats update
  const triggerStatsUpdate = () => {
    window.dispatchEvent(new CustomEvent('studentsUpdated'));
  };

  // Wrap the original functions to trigger stats updates and update local state
  const enhancedHandleDelete = (id: number) => {
    console.log('hooks/students/index.ts: Enhanced delete called for ID:', id);
    const result = originalHandleDelete(id);
    if (result) {
      // بروزرسانی فوری state محلی
      setStudents(prev => {
        const updated = prev.filter(student => student.id !== id);
        console.log('hooks/students/index.ts: Local state updated after delete, new count:', updated.length);
        return updated;
      });
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSave = (studentData: any, existingStudent?: Student) => {
    const result = originalHandleSave(studentData, existingStudent);
    if (result) {
      // بروزرسانی فوری state محلی
      setStudents(prev => {
        const existingIndex = prev.findIndex(s => s.id === (existingStudent?.id || studentData.id));
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...existingStudent, ...studentData };
          return updated;
        } else {
          const newId = Math.max(...prev.map(s => s.id), 0) + 1;
          return [...prev, { ...studentData, id: newId, createdAt: new Date().toISOString() }];
        }
      });
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedSetStudents = (newStudents: Student[]) => {
    console.log('hooks/students/index.ts: Setting students:', newStudents.length);
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
