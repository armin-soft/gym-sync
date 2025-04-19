
import { useState, useEffect, useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useToast } from "@/hooks/use-toast";

// Direct implementation without using circular imports
export const useStudents = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const { addHistoryEntry } = useStudentHistory();
  
  // Load students from localStorage
  useEffect(() => {
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
  }, []);

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (students) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  // Handle saving student data
  const handleSave = useCallback((data: any, selectedStudent?: Student) => {
    try {
      if (selectedStudent) {
        // Update existing student
        setStudents(prev => 
          prev.map(s => s.id === selectedStudent.id ? { ...s, ...data } : s)
        );
        toast({
          title: "اطلاعات ذخیره شد",
          description: `اطلاعات ${data.name || selectedStudent.name} با موفقیت بروزرسانی شد`,
        });
      } else {
        // Add new student
        const newStudent = {
          ...data,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          exercises: [],
          meals: [],
          supplements: []
        };
        
        setStudents(prev => [...prev, newStudent]);
        toast({
          title: "شاگرد جدید اضافه شد",
          description: `${data.name} با موفقیت به لیست شاگردان اضافه شد`,
        });
      }
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        title: "خطا در ذخیره اطلاعات",
        description: "متاسفانه مشکلی در ذخیره اطلاعات رخ داد",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  // Handle deleting a student
  const handleDelete = useCallback((studentId: number) => {
    try {
      setStudents(prev => prev.filter(s => s.id !== studentId));
      toast({
        title: "شاگرد حذف شد",
        description: "شاگرد مورد نظر با موفقیت از لیست حذف شد",
      });
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      toast({
        title: "خطا در حذف شاگرد",
        description: "متاسفانه مشکلی در حذف شاگرد رخ داد",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  // Handle saving exercises for a student
  const handleSaveExercises = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      setStudents(prev => 
        prev.map(student => {
          if (student.id === studentId) {
            const exercises = student.exercises || [];
            
            if (dayNumber !== undefined) {
              // For a specific day
              const dayExercises = exercises.filter(ex => ex.day !== dayNumber);
              const newExercises = [
                ...dayExercises,
                ...exerciseIds.map(id => ({ id, day: dayNumber }))
              ];
              return { ...student, exercises: newExercises };
            } else {
              // For all days
              return { ...student, exercises: exerciseIds.map(id => ({ id, day: 1 })) };
            }
          }
          return student;
        })
      );
      
      toast({
        title: "تمرین‌ها ذخیره شدند",
        description: "تمرین‌های انتخاب شده با موفقیت به شاگرد اضافه شدند",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving exercises:', error);
      toast({
        title: "خطا در ذخیره تمرین‌ها",
        description: "متاسفانه مشکلی در ذخیره تمرین‌ها رخ داد",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  // Handle saving diet for a student
  const handleSaveDiet = useCallback((mealIds: number[], studentId: number) => {
    try {
      setStudents(prev => 
        prev.map(student => {
          if (student.id === studentId) {
            return { ...student, meals: mealIds };
          }
          return student;
        })
      );
      
      toast({
        title: "برنامه غذایی ذخیره شد",
        description: "برنامه غذایی با موفقیت به شاگرد اضافه شد",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving diet:', error);
      toast({
        title: "خطا در ذخیره برنامه غذایی",
        description: "متاسفانه مشکلی در ذخیره برنامه غذایی رخ داد",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  // Handle saving supplements for a student
  const handleSaveSupplements = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    try {
      setStudents(prev => 
        prev.map(student => {
          if (student.id === studentId) {
            return { 
              ...student, 
              supplements: data.supplements,
              vitamins: data.vitamins 
            };
          }
          return student;
        })
      );
      
      toast({
        title: "مکمل‌ها و ویتامین‌ها ذخیره شدند",
        description: "مکمل‌ها و ویتامین‌های انتخاب شده با موفقیت به شاگرد اضافه شدند",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving supplements:', error);
      toast({
        title: "خطا در ذخیره مکمل‌ها",
        description: "متاسفانه مشکلی در ذخیره مکمل‌ها رخ داد",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return {
    students,
    exercises: [],
    meals: [],
    supplements: [],
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  };
};
