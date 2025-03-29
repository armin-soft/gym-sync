
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentManagement = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);

  // Load data from localStorage
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
  
  // Save students to localStorage when they change
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
