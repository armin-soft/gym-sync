
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

export const useStudentDiet = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveDiet = (mealIds: number[], studentId: number) => {
    try {
      console.log(`Saving meals for student ${studentId}:`, mealIds);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          // Calculate progress
          let progressCount = 0;
          if (student.exercises?.length) progressCount++;
          if (student.exercisesDay1?.length || student.exercisesDay2?.length || 
              student.exercisesDay3?.length || student.exercisesDay4?.length) {
            progressCount++;
          }
          if (mealIds.length) progressCount++;
          if (student.supplements?.length || student.vitamins?.length) progressCount++;
          
          const progress = Math.round((progressCount / 4) * 100);
          
          // Create a new object to ensure React detects the change
          return {
            ...student,
            meals: [...mealIds], // Create a new array to ensure React detects the change
            progress
          };
        }
        return student;
      });
      
      console.log("Updated students:", updatedStudents);
      
      // Update state
      setStudents(updatedStudents);
      
      // Ensure we're saving to localStorage correctly
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "افزودن موفق",
        description: "برنامه غذایی با موفقیت به شاگرد اضافه شد"
      });
      return true;
    } catch (error) {
      console.error("Error saving diet:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { handleSaveDiet };
};
