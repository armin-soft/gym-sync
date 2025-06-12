
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { ExerciseWithSets } from '@/types/exercise';

export const useStudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedStudents = localStorage.getItem('students');
        const savedExercises = localStorage.getItem('exercises');
        const savedMeals = localStorage.getItem('meals');
        const savedSupplements = localStorage.getItem('supplements');

        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        }
        if (savedExercises) {
          setExercises(JSON.parse(savedExercises));
        }
        if (savedMeals) {
          setMeals(JSON.parse(savedMeals));
        }
        if (savedSupplements) {
          setSupplements(JSON.parse(savedSupplements));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save students to localStorage
  const saveStudents = (updatedStudents: Student[]) => {
    try {
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error saving students:', error);
    }
  };

  // Student operations
  const handleSave = (data: any, selectedStudent?: Student) => {
    try {
      let updatedStudents;
      
      if (selectedStudent) {
        // Edit existing student
        updatedStudents = students.map(student =>
          student.id === selectedStudent.id ? { ...student, ...data } : student
        );
      } else {
        // Add new student
        const newStudent = {
          ...data,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        updatedStudents = [...students, newStudent];
      }
      
      saveStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      return false;
    }
  };

  const handleDelete = (studentId: number) => {
    try {
      const updatedStudents = students.filter(student => student.id !== studentId);
      saveStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      return false;
    }
  };

  const handleSaveExercises = (exercisesData: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const dayKey = dayNumber ? `exercisesDay${dayNumber}` : 'exercises';
          const setsKey = dayNumber ? `exerciseSetsDay${dayNumber}` : 'exerciseSets';
          const repsKey = dayNumber ? `exerciseRepsDay${dayNumber}` : 'exerciseReps';
          
          const exerciseIds = exercisesData.map(ex => ex.exerciseId);
          const sets: Record<number, number> = {};
          const reps: Record<number, string> = {};
          
          exercisesData.forEach(ex => {
            sets[ex.exerciseId] = ex.sets;
            reps[ex.exerciseId] = ex.reps;
          });
          
          return {
            ...student,
            [dayKey]: exerciseIds,
            [setsKey]: sets,
            [repsKey]: reps
          };
        }
        return student;
      });
      
      saveStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error saving exercises:', error);
      return false;
    }
  };

  const handleSaveDiet = (mealIds: number[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const dayKey = dayNumber ? `mealsDay${dayNumber}` : 'meals';
          return {
            ...student,
            [dayKey]: mealIds
          };
        }
        return student;
      });
      
      saveStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error saving diet:', error);
      return false;
    }
  };

  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            supplements: data.supplements,
            vitamins: data.vitamins
          };
        }
        return student;
      });
      
      saveStudents(updatedStudents);
      return true;
    } catch (error) {
      console.error('Error saving supplements:', error);
      return false;
    }
  };

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    setSupplements,
    handleSave,
    handleDelete,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  };
};
