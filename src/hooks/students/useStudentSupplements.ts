
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Supplement } from "@/types/supplement";

export const useStudentSupplements = (
  students: Student[], 
  setStudents: Dispatch<SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  
  // بارگذاری مکمل‌ها و ویتامین‌ها از localStorage هنگام اولین رندر
  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem('supplements');
      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        console.log('Loaded supplements from localStorage in useStudentSupplements:', parsedSupplements);
        setSupplements(parsedSupplements);
      }
    } catch (error) {
      console.error('Error loading supplements from localStorage:', error);
    }
  }, []);
  
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    try {
      console.log(`Saving supplements for student ${studentId}:`, data);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          // محاسبه پیشرفت شاگرد
          let progressCount = 0;
          if (student.exercises?.length) progressCount++;
          if (student.exercisesDay1?.length || student.exercisesDay2?.length || 
              student.exercisesDay3?.length || student.exercisesDay4?.length) {
            progressCount++;
          }
          if (student.meals?.length) progressCount++;
          if (data.supplements.length || data.vitamins.length) progressCount++;
          
          const progress = Math.round((progressCount / 4) * 100);
          
          // نمایش اطلاعات در کنسول برای اشکال‌زدایی
          console.log('Updated student supplements:', data.supplements);
          console.log('Updated student vitamins:', data.vitamins);
          
          return {
            ...student,
            supplements: data.supplements,
            vitamins: data.vitamins,
            progress
          };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "افزودن موفق",
        description: "برنامه مکمل و ویتامین با موفقیت به شاگرد اضافه شد"
      });
      return true;
    } catch (error) {
      console.error("Error saving supplements:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه مکمل و ویتامین پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  // افزودن تابع برای دریافت اطلاعات مکمل‌ها و ویتامین‌ها
  const getSupplementInfo = (supplementId: number) => {
    return supplements.find(item => item.id === supplementId);
  };

  return { 
    handleSaveSupplements,
    getSupplementInfo,
    supplements 
  };
};
