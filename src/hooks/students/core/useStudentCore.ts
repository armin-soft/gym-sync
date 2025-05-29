
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
          password: student.password || '',
          exercises: student.exercises || [],
          exercisesDay1: student.exercisesDay1 || [],
          exercisesDay2: student.exercisesDay2 || [],
          exercisesDay3: student.exercisesDay3 || [],
          exercisesDay4: student.exercisesDay4 || [],
          meals: student.meals || [],
          supplements: student.supplements || [],
          vitamins: student.vitamins || [],
          progress: student.progress || 0,
          // Add more fields as needed with proper defaults
          age: student.age || '',
          grade: student.grade || '',
          group: student.group || '',
          lastUpdate: student.lastUpdate || new Date().toISOString()
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
