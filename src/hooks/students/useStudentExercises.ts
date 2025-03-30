import { Student } from '@/components/students/StudentTypes';
import { useToast } from '@/hooks/use-toast';
import { Dispatch, SetStateAction } from 'react';

export const useStudentExercises = (
  students: Student[], 
  setStudents: Dispatch<SetStateAction<Student[]>>
) => {
  const { toast } = useToast();
  
  const handleSaveExercises = (exerciseIds: number[], studentId: number, dayNumber?: number) => {
    try {
      console.log(`Saving exercises for student ${studentId} day ${dayNumber || 'general'}:`, exerciseIds);
      
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student };
          
          // If dayNumber is provided, update the specific day's exercises
          if (dayNumber !== undefined) {
            switch(dayNumber) {
              case 1:
                updatedStudent.exercisesDay1 = exerciseIds;
                break;
              case 2:
                updatedStudent.exercisesDay2 = exerciseIds;
                break;
              case 3:
                updatedStudent.exercisesDay3 = exerciseIds;
                break;
              case 4:
                updatedStudent.exercisesDay4 = exerciseIds;
                break;
            }
          } else {
            // Otherwise update the general exercises
            updatedStudent.exercises = exerciseIds;
          }
          
          // Calculate progress
          let progressCount = 0;
          if (updatedStudent.exercises?.length) progressCount++;
          if (updatedStudent.exercisesDay1?.length || updatedStudent.exercisesDay2?.length || 
              updatedStudent.exercisesDay3?.length || updatedStudent.exercisesDay4?.length) {
            progressCount++;
          }
          if (updatedStudent.meals?.length) progressCount++;
          if (updatedStudent.supplements?.length || updatedStudent.vitamins?.length) progressCount++;
          
          updatedStudent.progress = Math.round((progressCount / 4) * 100);
          
          return updatedStudent;
        }
        return student;
      });
      
      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      toast({
        title: "افزودن موفق",
        description: "برنامه تمرینی با موفقیت به شاگرد اضافه شد"
      });
      return true;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return { handleSaveExercises };
};
