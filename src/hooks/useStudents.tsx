
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useStudents = () => {
  console.log('useStudents.tsx: Hook called');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudents = () => {
      console.log('useStudents.tsx: Loading students from localStorage...');
      try {
        const savedStudents = localStorage.getItem('students');
        console.log('useStudents.tsx: Raw data from localStorage:', savedStudents ? 'Data exists' : 'No data found');
        
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          console.log('useStudents.tsx: Parsed students:', parsedStudents);
          console.log('useStudents.tsx: Is array?', Array.isArray(parsedStudents));
          console.log('useStudents.tsx: Length:', Array.isArray(parsedStudents) ? parsedStudents.length : 'Not an array');
          
          setStudents(Array.isArray(parsedStudents) ? parsedStudents : []);
        } else {
          console.log('useStudents.tsx: No students found in localStorage');
          setStudents([]);
        }
      } catch (error) {
        console.error('useStudents.tsx: Error loading students:', error);
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();

    // Listen for storage changes
    const handleStorageChange = () => {
      console.log('useStudents.tsx: Storage change detected, reloading...');
      loadStudents();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
    };
  }, []);

  console.log('useStudents.tsx: Returning students count:', students.length);
  return { students, isLoading };
};
