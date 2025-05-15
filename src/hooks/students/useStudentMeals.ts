
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { Dispatch, SetStateAction } from 'react';

export const useStudentMeals = (
  students: Student[], 
  setStudents: Dispatch<SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveMeals = (meals: any[], studentId: number) => {
    try {
      console.log(`Saving meals for student ${studentId}:`, meals);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          // Calculate student progress
          let progressCount = 0;
          if (student.exercises?.length) progressCount++;
          if (student.exercisesDay1?.length || student.exercisesDay2?.length || 
              student.exercisesDay3?.length || student.exercisesDay4?.length) {
            progressCount++;
          }
          if (meals.length) progressCount++;
          if (student.supplements?.length || student.vitamins?.length) progressCount++;
          
          const progress = Math.round((progressCount / 4) * 100);
          
          // Debug info
          console.log('Updated student meals:', meals);
          
          return {
            ...student,
            meals,
            progress
          };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "افزودن موفق",
        description: "برنامه غذایی با موفقیت به شاگرد اضافه شد"
      });
      return true;
    } catch (error) {
      console.error("Error saving meals:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { 
    handleSaveMeals 
  };
};
