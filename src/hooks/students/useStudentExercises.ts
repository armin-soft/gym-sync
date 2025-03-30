
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

export const useStudentExercises = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveExercises = (exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      if (!Array.isArray(exerciseIds)) {
        console.error("Invalid exerciseIds:", exerciseIds);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "داده‌های تمرین نامعتبر هستند. لطفا مجدد تلاش کنید."
        });
        return false;
      }
      
      console.log(`Saving exercises for student ${studentId}, day ${dayNumber || 'general'}:`, exerciseIds);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          if (!dayNumber) {
            return {
              ...student,
              exercises: exerciseIds
            };
          }
          
          switch (dayNumber) {
            case 1:
              return {
                ...student,
                exercisesDay1: exerciseIds
              };
            case 2:
              return {
                ...student,
                exercisesDay2: exerciseIds
              };
            case 3:
              return {
                ...student,
                exercisesDay3: exerciseIds
              };
            case 4:
              return {
                ...student,
                exercisesDay4: exerciseIds
              };
            default:
              return student;
          }
        }
        return student;
      });
      
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
