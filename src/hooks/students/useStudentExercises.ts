
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

export const useStudentExercises = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveExercises = (exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      // Validation checks
      if (!Array.isArray(exerciseIds)) {
        console.error("Invalid exerciseIds format:", exerciseIds);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "فرمت داده‌های تمرین معتبر نیست"
        });
        return false;
      }
      
      if (!studentId) {
        console.error("Invalid studentId:", studentId);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "شناسه شاگرد معتبر نیست"
        });
        return false;
      }
      
      // Create a deep copy of students to avoid reference issues
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          if (!dayNumber) {
            updatedStudent.exercises = [...exerciseIds];
            return updatedStudent;
          }
          
          switch (dayNumber) {
            case 1:
              updatedStudent.exercisesDay1 = [...exerciseIds];
              break;
            case 2:
              updatedStudent.exercisesDay2 = [...exerciseIds];
              break;
            case 3:
              updatedStudent.exercisesDay3 = [...exerciseIds];
              break;
            case 4:
              updatedStudent.exercisesDay4 = [...exerciseIds];
              break;
            default:
              // No change if dayNumber is invalid
              break;
          }
          
          return updatedStudent;
        }
        return student;
      });
      
      // Update state and localStorage
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      const dayText = dayNumber 
        ? (dayNumber === 1 ? 'روز اول' : 
           dayNumber === 2 ? 'روز دوم' : 
           dayNumber === 3 ? 'روز سوم' : 'روز چهارم') 
        : '';
      
      console.log(`Successfully saved exercises for student ${studentId}, day ${dayNumber}:`, exerciseIds);
      
      toast({
        title: "افزودن موفق",
        description: `برنامه تمرینی ${dayText} با موفقیت به شاگرد اضافه شد`
      });
      
      return true;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین‌ها پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { handleSaveExercises };
};
