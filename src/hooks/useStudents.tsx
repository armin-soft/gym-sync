
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudents = () => {
      try {
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          const parsedStudents = JSON.parse(savedStudents);
          setStudents(Array.isArray(parsedStudents) ? parsedStudents : []);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error loading students:', error);
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadStudents();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
    };
  }, []);

  return { students, isLoading };
};
