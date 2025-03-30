
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { useToast } from '@/hooks/use-toast';

export const useStudentManagement = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [supplements, setSupplements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load students from localStorage
    const savedStudents = localStorage.getItem('students');
    
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(parsedStudents);
      } catch (error) {
        console.error('Error loading students from localStorage:', error);
        setStudents([]);
      }
    } else {
      setStudents([]);
    }
    
    // Load exercises from localStorage
    const savedExercises = localStorage.getItem('exercises');
    if (savedExercises) {
      try {
        setExercises(JSON.parse(savedExercises));
      } catch (error) {
        console.error('Error loading exercises from localStorage:', error);
        setExercises([]);
      }
    }
    
    // Load meals from localStorage
    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
      try {
        setMeals(JSON.parse(savedMeals));
      } catch (error) {
        console.error('Error loading meals from localStorage:', error);
        setMeals([]);
      }
    }
    
    // Load supplements from localStorage
    const savedSupplements = localStorage.getItem('supplements');
    if (savedSupplements) {
      try {
        setSupplements(JSON.parse(savedSupplements));
      } catch (error) {
        console.error('Error loading supplements from localStorage:', error);
        setSupplements([]);
      }
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save students to localStorage whenever it changes
    if (!loading) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students, loading]);

  const handleSave = (data: any, selectedStudent?: Student) => {
    try {
      if (selectedStudent) {
        // Editing existing student
        const updatedStudents = students.map(student => 
          student.id === selectedStudent.id 
            ? { ...student, ...data } 
            : student
        );
        setStudents(updatedStudents);
        toast({
          title: "ویرایش موفق",
          description: `اطلاعات ${data.name} با موفقیت بروزرسانی شد`,
        });
      } else {
        // Adding new student
        const newStudent: Student = {
          id: Date.now(),
          ...data,
          progress: 0,
        };
        
        setStudents(prevStudents => [...prevStudents, newStudent]);
        toast({
          title: "افزودن موفق",
          description: `${data.name} با موفقیت به لیست شاگردان اضافه شد`,
        });
      }
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: "خطا",
        description: "مشکلی در ذخیره اطلاعات رخ داد",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDelete = (id: number) => {
    try {
      const studentToDelete = students.find(student => student.id === id);
      if (!studentToDelete) return;
      
      const updatedStudents = students.filter(student => student.id !== id);
      setStudents(updatedStudents);
      
      toast({
        title: "حذف موفق",
        description: `${studentToDelete.name} با موفقیت از لیست شاگردان حذف شد`,
      });
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "خطا",
        description: "مشکلی در حذف شاگرد رخ داد",
        variant: "destructive",
      });
    }
  };

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    handleSave,
    handleDelete
  };
};
