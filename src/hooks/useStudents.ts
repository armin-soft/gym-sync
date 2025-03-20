import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudents = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);

  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      console.log('Loading students from localStorage:', savedStudents);
      
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        console.log('Successfully parsed students:', parsedStudents);
        
        if (Array.isArray(parsedStudents)) {
          const processedStudents = parsedStudents.map((student: any) => ({
            id: student.id || Math.random(),
            name: student.name || '',
            phone: student.phone || '',
            height: student.height || '',
            weight: student.weight || '',
            image: student.image || '/placeholder.svg',
            payment: student.payment || '', // Ensure payment is always initialized
            exercises: student.exercises || [],
            exercisesDay1: student.exercisesDay1 || [],
            exercisesDay2: student.exercisesDay2 || [],
            exercisesDay3: student.exercisesDay3 || [],
            exercisesDay4: student.exercisesDay4 || [],
            meals: student.meals || [],
            supplements: student.supplements || [],
            vitamins: student.vitamins || []
          }));
          
          console.log('Processed students:', processedStudents);
          setStudents(processedStudents);
        } else {
          console.error('Parsed students is not an array:', parsedStudents);
          setStudents([]);
        }
      }

      const savedExercises = localStorage.getItem('exercises');
      if (savedExercises) {
        setExercises(JSON.parse(savedExercises));
      }

      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }

      const savedSupplements = localStorage.getItem('supplements');
      if (savedSupplements) {
        setSupplements(JSON.parse(savedSupplements));
      }
    } catch (error) {
      console.error('Error loading students:', error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات شاگردان پیش آمده است"
      });
      setStudents([]);
    }
  }, []);
  
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
      console.log('Saved students to localStorage:', students);
    }
  }, [students]);

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    
    toast({
      title: "حذف موفق",
      description: "شاگرد مورد نظر با موفقیت حذف شد",
    });
  };

  const handleSave = (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => {
    let updatedStudents: Student[];
    
    if (selectedStudent) {
      updatedStudents = students.map((s) =>
        s.id === selectedStudent.id ? { 
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
        } : s
      );
      toast({
        title: "ویرایش موفق",
        description: "اطلاعات شاگرد با موفقیت ویرایش شد"
      });
    } else {
      const newStudent: Student = {
        ...data,
        id: Math.max(0, ...students.map((s) => s.id)) + 1,
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
      toast({
        title: "افزودن موفق",
        description: "شاگرد جدید با موفقیت اضافه شد"
      });
    }
    
    setStudents(updatedStudents);
    return true;
  };
  
  const handleSaveExercises = (exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          if (!dayNumber) {
            return {
              ...student,
              exercises: exerciseIds
            };
          }
          
          switch (dayNumber) {
            case 1:
              return {
                ...student,
                exercisesDay1: exerciseIds
              };
            case 2:
              return {
                ...student,
                exercisesDay2: exerciseIds
              };
            case 3:
              return {
                ...student,
                exercisesDay3: exerciseIds
              };
            case 4:
              return {
                ...student,
                exercisesDay4: exerciseIds
              };
            default:
              return student;
          }
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      const dayText = dayNumber 
        ? (dayNumber === 1 ? 'روز اول' : 
           dayNumber === 2 ? 'روز دوم' : 
           dayNumber === 3 ? 'روز سوم' : 'روز چهارم') 
        : '';
      
      console.log(`Successfully saved exercises for student ${studentId}, day ${dayNumber}:`, exerciseIds);
      
      return true;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین‌ها پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };
  
  const handleSaveDiet = (mealIds: number[], studentId: number) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          meals: mealIds
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    toast({
      title: "افزودن موفق",
      description: "برنامه غذایی با موفقیت به شاگرد اضافه شد"
    });
    return true;
  };
  
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
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
    
    setStudents(updatedStudents);
    toast({
      title: "افزودن موفق",
      description: "مکمل‌ها و ویتامین‌ها با موفقیت به شاگرد اضافه شدند"
    });
    return true;
  };

  return {
    students,
    exercises,
    meals,
    supplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  };
};
