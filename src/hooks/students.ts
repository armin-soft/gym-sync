
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { Exercise } from '@/types/exercise';
import { Meal } from '@/types/meal';
import { Supplement } from '@/types/supplement';
import { useToast } from '@/hooks/use-toast';
import { safeJSONParse } from '@/utils/database/index';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const { toast } = useToast();

  // بارگذاری اولیه داده‌ها
  useEffect(() => {
    try {
      // بارگذاری شاگردان
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = safeJSONParse(savedStudents, []);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        }
      }

      // بارگذاری تمرینات
      const savedExercises = localStorage.getItem('exercises');
      if (savedExercises) {
        const parsedExercises = safeJSONParse(savedExercises, []);
        if (Array.isArray(parsedExercises)) {
          setExercises(parsedExercises);
        }
      }

      // بارگذاری وعده‌ها
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        const parsedMeals = safeJSONParse(savedMeals, []);
        if (Array.isArray(parsedMeals)) {
          setMeals(parsedMeals);
        }
      }

      // بارگذاری مکمل‌ها
      const savedSupplements = localStorage.getItem('supplements');
      if (savedSupplements) {
        const parsedSupplements = safeJSONParse(savedSupplements, []);
        if (Array.isArray(parsedSupplements)) {
          setSupplements(parsedSupplements);
        }
      }
    } catch (error) {
      console.error('خطا در بارگذاری داده‌ها:', error);
      toast({
        title: "خطا در بارگذاری داده‌ها",
        description: "لطفاً صفحه را رفرش کنید",
        variant: "destructive"
      });
    }
  }, [toast]);

  // ذخیره شاگرد
  const handleSave = (student: Student) => {
    try {
      const existingIndex = students.findIndex(s => s.id === student.id);
      let updatedStudents: Student[];
      
      if (existingIndex >= 0) {
        updatedStudents = [...students];
        updatedStudents[existingIndex] = student;
      } else {
        updatedStudents = [...students, student];
      }
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "موفقیت",
        description: existingIndex >= 0 ? "شاگرد ویرایش شد" : "شاگرد جدید اضافه شد"
      });
    } catch (error) {
      console.error('خطا در ذخیره شاگرد:', error);
      toast({
        title: "خطا",
        description: "امکان ذخیره شاگرد وجود ندارد",
        variant: "destructive"
      });
    }
  };

  // حذف شاگرد
  const handleDelete = (studentId: number) => {
    try {
      const updatedStudents = students.filter(s => s.id !== studentId);
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "موفقیت",
        description: "شاگرد حذف شد"
      });
    } catch (error) {
      console.error('خطا در حذف شاگرد:', error);
      toast({
        title: "خطا",
        description: "امکان حذف شاگرد وجود ندارد",
        variant: "destructive"
      });
    }
  };

  // ذخیره تمرینات شاگرد
  const handleSaveExercises = (studentId: number, exercisesData: any) => {
    try {
      const updatedStudents = students.map(student => 
        student.id === studentId 
          ? { ...student, exercises: exercisesData }
          : student
      );
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "موفقیت",
        description: "تمرینات شاگرد ذخیره شد"
      });
    } catch (error) {
      console.error('خطا در ذخیره تمرینات:', error);
      toast({
        title: "خطا",
        description: "امکان ذخیره تمرینات وجود ندارد",
        variant: "destructive"
      });
    }
  };

  // ذخیره برنامه غذایی شاگرد
  const handleSaveDiet = (studentId: number, dietData: any) => {
    try {
      const updatedStudents = students.map(student => 
        student.id === studentId 
          ? { ...student, diet: dietData }
          : student
      );
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "موفقیت",
        description: "برنامه غذایی شاگرد ذخیره شد"
      });
    } catch (error) {
      console.error('خطا در ذخیره برنامه غذایی:', error);
      toast({
        title: "خطا",
        description: "امکان ذخیره برنامه غذایی وجود ندارد",
        variant: "destructive"
      });
    }
  };

  // ذخیره مکمل‌های شاگرد
  const handleSaveSupplements = (studentId: number, supplementsData: any) => {
    try {
      const updatedStudents = students.map(student => 
        student.id === studentId 
          ? { ...student, supplements: supplementsData }
          : student
      );
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "موفقیت",
        description: "مکمل‌های شاگرد ذخیره شد"
      });
    } catch (error) {
      console.error('خطا در ذخیره مکمل‌ها:', error);
      toast({
        title: "خطا",
        description: "امکان ذخیره مکمل‌ها وجود ندارد",
        variant: "destructive"
      });
    }
  };

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    setSupplements,
    handleSave,
    handleDelete,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  };
};
