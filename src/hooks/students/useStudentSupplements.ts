
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
  
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
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
          
          // اگر روز مشخص شده است، ذخیره برنامه روزانه
          if (data.day) {
            const supplementDayKey = `supplementsDay${data.day}`;
            const vitaminDayKey = `vitaminsDay${data.day}`;
            
            console.log(`Saving day ${data.day} specific supplements and vitamins`);
            console.log('Updated student supplements day:', data.supplements);
            console.log('Updated student vitamins day:', data.vitamins);
            
            return {
              ...student,
              [supplementDayKey]: data.supplements,
              [vitaminDayKey]: data.vitamins,
              supplements: student.supplements || data.supplements,
              vitamins: student.vitamins || data.vitamins,
              progress
            };
          } else {
            // ذخیره کلی (بدون مشخص کردن روز)
            console.log('Updated student supplements (general):', data.supplements);
            console.log('Updated student vitamins (general):', data.vitamins);
            
            return {
              ...student,
              supplements: data.supplements,
              vitamins: data.vitamins,
              progress
            };
          }
        }
        return student;
      });
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "افزودن موفق",
        description: data.day 
          ? `برنامه مکمل و ویتامین روز ${data.day} با موفقیت به شاگرد اضافه شد`
          : "برنامه مکمل و ویتامین با موفقیت به شاگرد اضافه شد"
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
  
  // دریافت مکمل‌ها و ویتامین‌های روزانه
  const getDailySupplements = (student: Student, day: number) => {
    const supplementDayKey = `supplementsDay${day}`;
    const vitaminDayKey = `vitaminsDay${day}`;
    
    return {
      supplements: student[supplementDayKey] || student.supplements || [],
      vitamins: student[vitaminDayKey] || student.vitamins || []
    };
  };

  return { 
    handleSaveSupplements,
    getSupplementInfo,
    getDailySupplements,
    supplements 
  };
};
