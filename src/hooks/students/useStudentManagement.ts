
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
      // Load all data from localStorage
      const studentsData = safeJSONParse(localStorage.getItem('students'), []);
      const exercisesData = safeJSONParse(localStorage.getItem('exercises'), []);
      const mealsData = safeJSONParse(localStorage.getItem('meals'), []);
      const supplementsData = safeJSONParse(localStorage.getItem('supplements'), []);
      
      console.log('Loaded data:', { 
        students: studentsData, 
        exercises: exercisesData, 
        meals: mealsData, 
        supplements: supplementsData 
      });
      
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
          vitamins: student.vitamins || [],
          progress: student.progress || 0
        }));
        
        setStudents(processedStudents);
      }
      
      if (Array.isArray(exercisesData)) setExercises(exercisesData);
      if (Array.isArray(mealsData)) setMeals(mealsData);
      if (Array.isArray(supplementsData)) setSupplements(supplementsData);
      
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
      localStorage.setItem('students', JSON.stringify(students));
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [students, isInitialized]);

  // Create a helper function to generate mock data for testing
  const generateMockData = useCallback(() => {
    // Generate mock exercises if none exist
    if (exercises.length === 0) {
      const mockExercises = [
        { id: 1, name: "پرس سینه", category: "سینه", description: "تمرین اصلی برای عضلات سینه" },
        { id: 2, name: "اسکوات", category: "پا", description: "تمرین ترکیبی برای تقویت پاها" },
        { id: 3, name: "جلو بازو هالتر", category: "بازو", description: "تمرین برای عضلات جلو بازو" }
      ];
      setExercises(mockExercises);
      localStorage.setItem('exercises', JSON.stringify(mockExercises));
    }
    
    // Generate mock supplements if none exist
    if (supplements.length === 0) {
      const mockSupplements = [
        { id: 1, name: "پروتئین وی", category: "پروتئین", dosage: "30 گرم", timing: "بعد از تمرین", type: "supplement", description: "برای بازسازی عضلات" },
        { id: 2, name: "کراتین", category: "قدرت", dosage: "5 گرم", timing: "روزانه", type: "supplement", description: "برای افزایش قدرت و عملکرد" },
        { id: 3, name: "ویتامین D", category: "ویتامین", dosage: "2000 IU", timing: "صبح", type: "vitamin", description: "برای سلامت استخوان‌ها" },
        { id: 4, name: "امگا 3", category: "اسید چرب", dosage: "1000 میلی‌گرم", timing: "با غذا", type: "supplement", description: "برای سلامت قلب" }
      ];
      setSupplements(mockSupplements);
      localStorage.setItem('supplements', JSON.stringify(mockSupplements));
    }
    
    // Generate mock meals if none exist
    if (meals.length === 0) {
      const mockMeals = [
        { id: 1, name: "صبحانه پروتئینی", category: "صبحانه", description: "تخم مرغ، نان تست و آووکادو" },
        { id: 2, name: "ناهار پروتئینی", category: "ناهار", description: "مرغ گریل، برنج قهوه‌ای و سبزیجات" },
        { id: 3, name: "میان وعده", category: "میان وعده", description: "بادام و میوه" }
      ];
      setMeals(mockMeals);
      localStorage.setItem('meals', JSON.stringify(mockMeals));
    }
    
    toast({
      title: "داده‌های نمونه ایجاد شد",
      description: "داده‌های نمونه برای تمرین‌ها، مکمل‌ها و غذاها با موفقیت ایجاد شد"
    });
  }, [exercises.length, supplements.length, meals.length, setExercises, setSupplements, setMeals, toast]);

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
          vitamins: [],
          progress: 0
        }
      ]);
      
      toast({
        title: "افزودن موفق",
        description: "شاگرد جدید با موفقیت اضافه شد"
      });
    }
    
    return true;
  }, [toast]);

  // Add function to handle saving exercises
  const handleSaveExercises = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          if (dayNumber !== undefined) {
            const dayKey = `exercisesDay${dayNumber}` as keyof typeof updatedStudent;
            updatedStudent[dayKey] = exerciseIds as unknown as never;
          } else {
            updatedStudent.exercises = exerciseIds;
          }
          
          // Calculate progress
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      })
    );
    
    return true;
  }, []);

  // Add function to handle saving diet plans
  const handleSaveDiet = useCallback((mealIds: number[], studentId: number) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, meals: mealIds };
          
          // Calculate progress
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      })
    );
    
    return true;
  }, []);

  // Add function to handle saving supplements
  const handleSaveSupplements = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    console.log('Saving supplements and vitamins:', data, 'for student ID:', studentId);
    
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedStudent = {
            ...student,
            supplements: data.supplements,
            vitamins: data.vitamins
          };
          
          // Calculate progress
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      })
    );
    
    return true;
  }, []);

  return {
    students,
    exercises,
    meals, 
    supplements,
    setStudents,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    generateMockData
  };
};
