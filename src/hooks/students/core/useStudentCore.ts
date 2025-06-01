
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { safeJSONParse } from "@/utils/database";

/**
 * Core hook for student data loading
 */
export const useStudentCore = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Enhanced data loading with better error handling and logging
  useEffect(() => {
    if (isInitialized) return;
    
    console.log('Loading student data from localStorage...');
    
    try {
      // Load all data in parallel for better performance
      const studentsData = safeJSONParse('students', []);
      const exercisesData = safeJSONParse('exercises', []);
      const mealsData = safeJSONParse('meals', []);
      const supplementsData = safeJSONParse('supplements', []);
      const supplementCategoriesData = safeJSONParse('supplementCategories', []);
      
      // Process students data - ensure all fields are properly initialized
      if (Array.isArray(studentsData)) {
        console.log(`Found ${studentsData.length} students in localStorage`);
        
        const processedStudents = studentsData.map((student: any) => ({
          id: student.id || Date.now() + Math.random(),
          name: student.name || '',
          phone: student.phone || '',
          height: student.height || '',
          weight: student.weight || '',
          image: student.image || '/Assets/Image/Place-Holder.svg',
          payment: student.payment || '', 
          gender: student.gender || 'male', // Add gender with default value
          exercises: student.exercises || [],
          exerciseSets: student.exerciseSets || {},
          exerciseReps: student.exerciseReps || {},
          exercisesDay1: student.exercisesDay1 || [],
          exerciseSetsDay1: student.exerciseSetsDay1 || {},
          exerciseRepsDay1: student.exerciseRepsDay1 || {},
          exercisesDay2: student.exercisesDay2 || [],
          exerciseSetsDay2: student.exerciseSetsDay2 || {},
          exerciseRepsDay2: student.exerciseRepsDay2 || {},
          exercisesDay3: student.exercisesDay3 || [],
          exerciseSetsDay3: student.exerciseSetsDay3 || {},
          exerciseRepsDay3: student.exerciseRepsDay3 || {},
          exercisesDay4: student.exercisesDay4 || [],
          exerciseSetsDay4: student.exerciseSetsDay4 || {},
          exerciseRepsDay4: student.exerciseRepsDay4 || {},
          exercisesDay5: student.exercisesDay5 || [],
          exerciseSetsDay5: student.exerciseSetsDay5 || {},
          exerciseRepsDay5: student.exerciseRepsDay5 || {},
          exercisesDay6: student.exercisesDay6 || [],
          exerciseSetsDay6: student.exerciseSetsDay6 || {},
          exerciseRepsDay6: student.exerciseRepsDay6 || {},
          exercisesDay7: student.exercisesDay7 || [],
          exerciseSetsDay7: student.exerciseSetsDay7 || {},
          exerciseRepsDay7: student.exerciseRepsDay7 || {},
          meals: student.meals || [],
          mealsDay1: student.mealsDay1 || [],
          mealsDay2: student.mealsDay2 || [],
          mealsDay3: student.mealsDay3 || [],
          mealsDay4: student.mealsDay4 || [],
          mealsDay5: student.mealsDay5 || [],
          mealsDay6: student.mealsDay6 || [],
          mealsDay7: student.mealsDay7 || [],
          supplements: student.supplements || [],
          supplementsDay1: student.supplementsDay1 || [],
          vitamins: student.vitamins || [],
          vitaminsDay1: student.vitaminsDay1 || [],
          progress: student.progress || 0,
          age: student.age || '',
          grade: student.grade || '',
          group: student.group || '',
          createdAt: student.createdAt || new Date().toISOString()
        }));
        
        setStudents(processedStudents);
      } else {
        console.warn('Student data is not an array, initializing empty students array');
        setStudents([]);
      }
      
      // Load exercise data with validation
      if (Array.isArray(exercisesData)) {
        console.log(`Found ${exercisesData.length} exercises in localStorage`);
        setExercises(exercisesData);
      } else {
        console.warn('Exercise data is not an array, initializing empty array');
        setExercises([]);
      }
      
      // Load meal data with validation
      if (Array.isArray(mealsData)) {
        console.log(`Found ${mealsData.length} meals in localStorage`);
        setMeals(mealsData);
      } else {
        console.warn('Meal data is not an array, initializing empty array');
        setMeals([]);
      }
      
      // Make sure supplements are properly loaded with validation
      if (Array.isArray(supplementsData)) {
        console.log(`Found ${supplementsData.length} supplements in localStorage`);
        setSupplements(supplementsData);
        // Also save to localStorage to ensure consistency
        localStorage.setItem('supplements', JSON.stringify(supplementsData));
      } else {
        console.warn('Supplement data is not an array, initializing empty array');
        setSupplements([]);
      }
      
      // Ensure supplementCategories exist in localStorage
      if (Array.isArray(supplementCategoriesData) && supplementCategoriesData.length > 0) {
        console.log(`Found ${supplementCategoriesData.length} supplement categories in localStorage`);
      } else {
        console.warn('No supplement categories found or not an array');
      }
      
      setIsInitialized(true);
      console.log('Student data initialization complete');
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  }, [isInitialized]);

  return {
    students,
    setStudents,
    exercises,
    setExercises,
    meals,
    setMeals,
    supplements,
    setSupplements,
    isInitialized
  };
};
