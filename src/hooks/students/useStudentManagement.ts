
import { useState, useEffect, useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { safeJSONParse, safeJSONSave, notifyDataChange } from "@/utils/database";

export const useStudentManagement = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage - optimized to run only once
  useEffect(() => {
    if (isInitialized) return;
    
    try {
      // Load all data in parallel for better performance
      const studentsData = safeJSONParse('students', []);
      const exercisesData = safeJSONParse('exercises', []);
      const mealsData = safeJSONParse('meals', []);
      const supplementsData = safeJSONParse('supplements', []);
      const supplementCategoriesData = safeJSONParse('supplementCategories', []);
      
      // Process students data
      if (Array.isArray(studentsData)) {
        const processedStudents = studentsData.map((student: any) => ({
          id: student.id || Date.now() + Math.random(),
          name: student.name || '',
          phone: student.phone || '',
          height: student.height || '',
          weight: student.weight || '',
          image: student.image || '/Assets/Image/Place-Holder.svg',
          payment: student.payment || '', 
          exercises: student.exercises || [],
          exercisesDay1: student.exercisesDay1 || [],
          exercisesDay2: student.exercisesDay2 || [],
          exercisesDay3: student.exercisesDay3 || [],
          exercisesDay4: student.exercisesDay4 || [],
          meals: student.meals || [],
          supplements: student.supplements || [],
          vitamins: student.vitamins || []
        }));
        
        setStudents(processedStudents);
      }
      
      if (Array.isArray(exercisesData)) setExercises(exercisesData);
      if (Array.isArray(mealsData)) setMeals(mealsData);
      
      // Make sure supplements are properly loaded
      if (Array.isArray(supplementsData)) {
        console.log('Loaded supplements from localStorage:', supplementsData);
        setSupplements(supplementsData);
        // Also save to localStorage to ensure consistency
        safeJSONSave('supplements', supplementsData);
      }
      
      // Ensure supplementCategories exist in localStorage
      if (Array.isArray(supplementCategoriesData) && supplementCategoriesData.length > 0) {
        console.log('Loaded supplement categories from localStorage:', supplementCategoriesData);
        // Save to localStorage to ensure consistency
        safeJSONSave('supplementCategories', supplementCategoriesData);
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات پیش آمده است"
      });
    }
  }, [toast, isInitialized]);
  
  // Optimize saving to localStorage with debounce
  useEffect(() => {
    if (!isInitialized || students.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      safeJSONSave('students', students);
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [students, isInitialized]);

  // Save supplements to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized || supplements.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      console.log('Saving supplements to localStorage:', supplements);
      safeJSONSave('supplements', supplements);
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [supplements, isInitialized]);

  // Optimized delete function
  const handleDelete = useCallback((id: number) => {
    setStudents(prevStudents => {
      const newStudents = prevStudents.filter(student => student.id !== id);
      safeJSONSave('students', newStudents);
      return newStudents;
    });
    
    toast({
      title: "حذف موفق",
      description: "شاگرد مورد نظر با موفقیت حذف شد",
    });
  }, [toast]);

  // Optimized save function
  const handleSave = useCallback((data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => {
    let updatedStudents: Student[];
    
    if (selectedStudent) {
      updatedStudents = students.map(s => s.id === selectedStudent.id 
        ? { 
            ...s, 
            ...data, 
            exercises: s.exercises || [], 
            exercisesDay1: s.exercisesDay1 || [],
            exercisesDay2: s.exercisesDay2 || [],
            exercisesDay3: s.exercisesDay3 || [],
            exercisesDay4: s.exercisesDay4 || [],
            meals: s.meals || [], 
            supplements: s.supplements || [], 
            vitamins: s.vitamins || [] 
          } 
        : s
      );
      
      setStudents(updatedStudents);
      safeJSONSave('students', updatedStudents);
      
      toast({
        title: "ویرایش موفق",
        description: "اطلاعات شاگرد با موفقیت ویرایش شد"
      });
    } else {
      const newStudent = {
        ...data,
        id: Math.max(0, ...students.map(s => s.id)) + 1,
        exercises: [],
        exercisesDay1: [],
        exercisesDay2: [],
        exercisesDay3: [],
        exercisesDay4: [],
        meals: [],
        supplements: [],
        vitamins: []
      };
      
      updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      safeJSONSave('students', updatedStudents);
      
      toast({
        title: "افزودن موفق",
        description: "شاگرد جدید با موفقیت اضافه شد"
      });
    }
    
    // Notify other tabs about the change
    notifyDataChange('students');
    
    return true;
  }, [students, toast]);

  return {
    students,
    exercises,
    meals, 
    supplements,
    setStudents,
    setSupplements,
    handleDelete,
    handleSave
  };
};
