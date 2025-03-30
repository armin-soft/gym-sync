
import { useToast } from "@/hooks/use-toast";
import { Student } from "@/components/students/StudentTypes";

export const useStudentExercises = (
  students: Student[], 
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveExercises = (exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          if (!dayNumber) {
            return {
              ...student,
              exercises: exerciseIds,
              progress: calculateProgress(student, { exerciseUpdated: true })
            };
          }
          
          switch (dayNumber) {
            case 1:
              return {
                ...student,
                exercisesDay1: exerciseIds,
                progress: calculateProgress(student, { exerciseUpdated: true })
              };
            case 2:
              return {
                ...student,
                exercisesDay2: exerciseIds,
                progress: calculateProgress(student, { exerciseUpdated: true })
              };
            case 3:
              return {
                ...student,
                exercisesDay3: exerciseIds,
                progress: calculateProgress(student, { exerciseUpdated: true })
              };
            case 4:
              return {
                ...student,
                exercisesDay4: exerciseIds,
                progress: calculateProgress(student, { exerciseUpdated: true })
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

  // Calculate progress for student
  const calculateProgress = (student: Student, updates: { 
    exerciseUpdated?: boolean, 
    mealUpdated?: boolean, 
    supplementUpdated?: boolean 
  } = {}) => {
    let total = 0;
    let completed = 0;
    
    // Check exercises
    total += 1;
    if (updates.exerciseUpdated || student.exercises?.length || student.exercisesDay1?.length || 
        student.exercisesDay2?.length || student.exercisesDay3?.length || 
        student.exercisesDay4?.length) {
      completed += 1;
    }
    
    // Check meals
    total += 1;
    if (updates.mealUpdated || student.meals?.length) completed += 1;
    
    // Check supplements
    total += 1;
    if (updates.supplementUpdated || student.supplements?.length || student.vitamins?.length) completed += 1;
    
    return Math.round((completed / total) * 100);
  };

  return { handleSaveExercises, calculateProgress };
};
