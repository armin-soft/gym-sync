
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { ExerciseWithSets } from '@/types/exercise';
import { Meal } from '@/components/diet/types';
import { Supplement, SupplementCategory } from '@/types/supplement';
import { safeJSONParse } from '@/utils/database/index';

export const useStudentCore = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [supplementCategories, setSupplementCategories] = useState<SupplementCategory[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadData = () => {
      console.log('Loading student data from localStorage...');
      
      // Load students
      const savedStudents = safeJSONParse(localStorage.getItem('students'), []);
      console.log('Found', savedStudents.length, 'students in localStorage');
      setStudents(Array.isArray(savedStudents) ? savedStudents : []);

      // Load exercises
      const savedExercises = safeJSONParse(localStorage.getItem('exercises'), []);
      console.log('Found', savedExercises.length, 'exercises in localStorage');
      setExercises(Array.isArray(savedExercises) ? savedExercises : []);

      // Load meals
      const savedMeals = safeJSONParse(localStorage.getItem('meals'), []);
      console.log('Found', savedMeals.length, 'meals in localStorage');
      setMeals(Array.isArray(savedMeals) ? savedMeals : []);

      // Load supplements
      const savedSupplements = safeJSONParse(localStorage.getItem('supplements'), []);
      console.log('Found', savedSupplements.length, 'supplements in localStorage');
      setSupplements(Array.isArray(savedSupplements) ? savedSupplements : []);

      // Load supplement categories - with proper fallback
      const savedSupplementCategories = safeJSONParse(localStorage.getItem('supplementCategories'), []);
      if (Array.isArray(savedSupplementCategories) && savedSupplementCategories.length > 0) {
        console.log('Found', savedSupplementCategories.length, 'supplement categories in localStorage');
        setSupplementCategories(savedSupplementCategories);
      } else {
        // Create default categories if none exist
        const defaultCategories: SupplementCategory[] = [
          { id: 1, name: 'پروتئینی', description: 'مکمل‌های پروتئینی و آمینو اسیدی' },
          { id: 2, name: 'ویتامین‌ها', description: 'ویتامین‌های محلول در آب و چربی' },
          { id: 3, name: 'کربوهیدراتی', description: 'مکمل‌های انرژی‌زا' },
          { id: 4, name: 'سلامت مفاصل', description: 'مکمل‌های مفید برای مفاصل' }
        ];
        console.log('No supplement categories found, creating default categories');
        setSupplementCategories(defaultCategories);
        localStorage.setItem('supplementCategories', JSON.stringify(defaultCategories));
      }

      setIsInitialized(true);
      console.log('Student data initialization complete');
    };

    loadData();
  }, []);

  return {
    students,
    setStudents,
    exercises,
    setExercises,
    meals,
    setMeals,
    supplements,
    setSupplements,
    supplementCategories,
    setSupplementCategories,
    isInitialized
  };
};
