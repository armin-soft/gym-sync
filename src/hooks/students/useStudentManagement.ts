
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
          exercises: student.exercises || [],
          exercisesDay1: student.exercisesDay1 || [],
          exercisesDay2: student.exercisesDay2 || [],
          exercisesDay3: student.exercisesDay3 || [],
          exercisesDay4: student.exercisesDay4 || [],
          meals: student.meals || [],
          supplements: student.supplements || [],
          vitamins: student.vitamins || [],
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
        safeJSONSave('supplements', supplementsData);
      } else {
        console.warn('Supplement data is not an array, initializing empty array');
        setSupplements([]);
      }
      
      // Ensure supplementCategories exist in localStorage
      if (Array.isArray(supplementCategoriesData) && supplementCategoriesData.length > 0) {
        console.log(`Found ${supplementCategoriesData.length} supplement categories in localStorage`);
        // Save to localStorage to ensure consistency
        safeJSONSave('supplementCategories', supplementCategoriesData);
      } else {
        console.warn('No supplement categories found or not an array');
      }
      
      setIsInitialized(true);
      console.log('Student data initialization complete');
    } catch (error) {
      console.error('Error loading student data:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات پیش آمده است. لطفا صفحه را مجدد بارگذاری کنید."
      });
    }
  }, [toast, isInitialized]);
  
  // Improved save to localStorage with proper error handling
  useEffect(() => {
    if (!isInitialized || students.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        console.log(`Saving ${students.length} students to localStorage`);
        safeJSONSave('students', students);
      } catch (error) {
        console.error('Error saving students to localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره اطلاعات پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [students, isInitialized, toast]);

  // Save supplements to localStorage whenever they change with error handling
  useEffect(() => {
    if (!isInitialized || supplements.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        console.log(`Saving ${supplements.length} supplements to localStorage`);
        safeJSONSave('supplements', supplements);
      } catch (error) {
        console.error('Error saving supplements to localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره اطلاعات مکمل‌ها پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [supplements, isInitialized, toast]);

  // Optimized and improved delete function
  const handleDelete = useCallback((id: number) => {
    console.log(`Deleting student with ID: ${id}`);
    setStudents(prevStudents => {
      // Find student first to log what's being deleted
      const studentToDelete = prevStudents.find(s => s.id === id);
      if (studentToDelete) {
        console.log(`Deleting student: ${studentToDelete.name}`);
      } else {
        console.warn(`Student with ID ${id} not found for deletion`);
      }
      
      const newStudents = prevStudents.filter(student => student.id !== id);
      try {
        safeJSONSave('students', newStudents);
        console.log('Student deleted and saved successfully');
        
        // Notify the user
        toast({
          title: "حذف موفق",
          description: `شاگرد ${studentToDelete?.name || 'مورد نظر'} با موفقیت حذف شد`,
        });
      } catch (error) {
        console.error('Error saving students after deletion:', error);
        toast({
          variant: "destructive",
          title: "خطا در حذف",
          description: "مشکلی در حذف شاگرد پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
      return newStudents;
    });
  }, [toast]);

  // Improved save function with better validation and error handling
  const handleSave = useCallback((data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => {
    try {
      let updatedStudents: Student[];
      const timestamp = new Date().toISOString();
      
      if (selectedStudent) {
        console.log(`Updating student: ${selectedStudent.name}`);
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
              vitamins: s.vitamins || [],
              lastUpdate: timestamp
            } 
          : s
        );
        
        setStudents(updatedStudents);
        safeJSONSave('students', updatedStudents);
        
        toast({
          title: "ویرایش موفق",
          description: "اطلاعات شاگرد با موفقیت ویرایش شد"
        });
        console.log('Student updated successfully');
      } else {
        console.log('Creating new student');
        const newId = students.length > 0 
          ? Math.max(...students.map(s => s.id)) + 1 
          : 1;
          
        const newStudent = {
          ...data,
          id: newId,
          exercises: [],
          exercisesDay1: [],
          exercisesDay2: [],
          exercisesDay3: [],
          exercisesDay4: [],
          meals: [],
          supplements: [],
          vitamins: [],
          lastUpdate: timestamp
        };
        
        updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
        safeJSONSave('students', updatedStudents);
        
        toast({
          title: "افزودن موفق",
          description: "شاگرد جدید با موفقیت اضافه شد"
        });
        console.log('New student added successfully');
      }
      
      // Notify other tabs about the change
      notifyDataChange('students');
      
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره اطلاعات شاگرد پیش آمده است. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  }, [students, toast]);

  // Add function to refresh data from localStorage
  const refreshData = useCallback(() => {
    console.log('Manually refreshing student data...');
    try {
      const studentsData = safeJSONParse('students', []);
      if (Array.isArray(studentsData)) {
        setStudents(studentsData);
        console.log(`Refreshed data: found ${studentsData.length} students`);
      }
    } catch (error) {
      console.error('Error refreshing student data:', error);
    }
  }, []);

  return {
    students,
    exercises,
    meals, 
    supplements,
    setStudents,
    setSupplements,
    handleDelete,
    handleSave,
    refreshData
  };
};
