
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/Students/StudentTypes";

export const useStudentSupplements = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveSupplements = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    try {
      console.log(`Saving supplements for student ${studentId}:`, data);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            supplements: data.supplements,
            vitamins: data.vitamins
          };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "افزودن موفق",
        description: "مکمل‌ها و ویتامین‌ها با موفقیت به شاگرد اضافه شدند"
      });
      return true;
    } catch (error) {
      console.error("Error saving supplements:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی مکمل‌ها و ویتامین‌ها پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { handleSaveSupplements };
};
