
import { useState, useEffect, useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

// Utility function to safely parse JSON
const safeJSONParse = (data: string | null, fallback: any = []) => {
  if (!data) return fallback;
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('JSON parse error:', error);
    return fallback;
  }
};

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
      // Load all data in parallel using Promise.all for better performance
      Promise.all([
        Promise.resolve(safeJSONParse(localStorage.getItem('students'))),
        Promise.resolve(safeJSONParse(localStorage.getItem('exercises'))),
        Promise.resolve(safeJSONParse(localStorage.getItem('meals'))),
        Promise.resolve(safeJSONParse(localStorage.getItem('supplements')))
      ]).then(([studentsData, exercisesData, mealsData, supplementsData]) => {
        // Process students data
        if (Array.isArray(studentsData)) {
          const processedStudents = studentsData.map((student: any) => ({
            id: student.id || Date.now() + Math.random(),
            name: student.name || '',
            phone: student.phone || '',
            height: student.height || '',
            weight: student.weight || '',
            image: student.image || '/placeholder.svg',
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
        if (Array.isArray(supplementsData)) setSupplements(supplementsData);
        
        setIsInitialized(true);
      });
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
      localStorage.setItem('students', JSON.stringify(students));
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [students, isInitialized]);

  // Optimized delete function
  const handleDelete = useCallback((id: number) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
    
    toast({
      title: "حذف موفق",
      description: "شاگرد مورد نظر با موفقیت حذف شد",
    });
  }, [toast]);

  // Optimized save function
  const handleSave = useCallback((data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => {
    if (selectedStudent) {
      setStudents(prevStudents => 
        prevStudents.map(s => s.id === selectedStudent.id 
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
        )
      );
      
      toast({
        title: "ویرایش موفق",
        description: "اطلاعات شاگرد با موفقیت ویرایش شد"
      });
    } else {
      setStudents(prevStudents => [
        ...prevStudents, 
        {
          ...data,
          id: Math.max(0, ...prevStudents.map(s => s.id)) + 1,
          exercises: [],
          exercisesDay1: [],
          exercisesDay2: [],
          exercisesDay3: [],
          exercisesDay4: [],
          meals: [],
          supplements: [],
          vitamins: []
        }
      ]);
      
      toast({
        title: "افزودن موفق",
        description: "شاگرد جدید با موفقیت اضافه شد"
      });
    }
    
    return true;
  }, [toast]);

  return {
    students,
    exercises,
    meals, 
    supplements,
    setStudents,
    handleDelete,
    handleSave
  };
};
