
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useStudentPrograms = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const loadStudents = () => {
      try {
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        }
      } catch (error) {
        console.error('Error loading students:', error);
      }
    };

    loadStudents();
  }, []);

  const getStudentById = (id: number): Student | undefined => {
    return students.find(student => student.id === id);
  };

  const getStudentExercises = (studentId: number, day?: number) => {
    const student = getStudentById(studentId);
    if (!student) return [];

    const dayKey = day ? `exercisesDay${day}` : 'exercises';
    return student[dayKey as keyof Student] || [];
  };

  const getStudentMeals = (studentId: number, day?: number) => {
    const student = getStudentById(studentId);
    if (!student) return [];

    const dayKey = day ? `mealsDay${day}` : 'meals';
    return student[dayKey as keyof Student] || [];
  };

  const getStudentSupplements = (studentId: number) => {
    const student = getStudentById(studentId);
    if (!student) return { supplements: [], vitamins: [] };

    return {
      supplements: student.supplements || [],
      vitamins: student.vitamins || []
    };
  };

  return {
    students,
    getStudentById,
    getStudentExercises,
    getStudentMeals,
    getStudentSupplements
  };
};
