
import { useState } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export const useStudentMeals = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveMeals = (mealIds: number[], studentId: number) => {
    try {
      setIsLoading(true);
      
      // Find the student in the array
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            meals: mealIds
          };
        }
        return student;
      });
      
      // Update students array
      setStudents(updatedStudents);
      
      // Save to localStorage
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      
      // Show success toast
      toast({
        title: "برنامه غذایی ذخیره شد",
        description: "برنامه غذایی با موفقیت برای شاگرد ذخیره شد."
      });
      
      return true;
    } catch (error) {
      console.error("Error saving diet plan:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSaveMeals,
    isLoading
  };
};
