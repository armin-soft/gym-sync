
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useStudentPrograms = (studentId?: number) => {
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

  const getStudentById = (id: number): Student => {
    return students.find(s => s.id === id) || {} as Student;
  };

  const getStudentExercises = (studentId: number, day?: number) => {
    const student = getStudentById(studentId);
    if (day) {
      return student[`exercisesDay${day}` as keyof Student] || [];
    }
    return student.exercises || [];
  };

  const getStudentMeals = (studentId: number, day?: number) => {
    const student = getStudentById(studentId);
    if (day) {
      return student[`mealsDay${day}` as keyof Student] || [];
    }
    return student.meals || [];
  };

  const getStudentSupplements = (studentId: number) => {
    const student = getStudentById(studentId);
    return {
      supplements: student.supplements || [],
      vitamins: student.vitamins || []
    };
  };

  const currentStudentProgram = studentId ? {
    exercises: [],
    diet: [],
    supplements: getStudentSupplements(studentId).supplements,
    vitamins: getStudentSupplements(studentId).vitamins
  } : null;

  return {
    students,
    getStudentById,
    getStudentExercises,
    getStudentMeals,
    getStudentSupplements,
    currentStudentProgram
  };
};
