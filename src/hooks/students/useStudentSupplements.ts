
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";
import { Dispatch, SetStateAction } from 'react';

export const useStudentSupplements = (
  students: Student[], 
  setStudents: Dispatch<SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    try {
      console.log(`Saving supplements for student ${studentId}:`, data);
      console.log("Supplements to save:", data.supplements);
      console.log("Vitamins to save:", data.vitamins);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          // Calculate progress
          let progressCount = 0;
          if (student.exercises?.length) progressCount++;
          if (student.exercisesDay1?.length || student.exercisesDay2?.length || 
              student.exercisesDay3?.length || student.exercisesDay4?.length) {
            progressCount++;
          }
          if (student.meals?.length) progressCount++;
          if (data.supplements.length || data.vitamins.length) progressCount++;
          
          const progress = Math.round((progressCount / 4) * 100);
          
          return {
            ...student,
            supplements: data.supplements,
            vitamins: data.vitamins,
            progress
          };
        }
        return student;
      });
      
      console.log("Updated students after saving supplements:", updatedStudents);
      
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

  return { handleSaveSupplements };
};
