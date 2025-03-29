
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
          return {
            ...student,
            meals: mealIds
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
