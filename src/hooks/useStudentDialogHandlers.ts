
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";

export interface DialogHandlerOptions {
  onSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean;
  onSaveExercises: (exerciseIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}, studentId: number) => boolean;
  selectedStudent?: Student;
  selectedStudentForExercise: Student | null;
  selectedStudentForDiet: Student | null;
  selectedStudentForSupplement: Student | null;
  setIsExerciseDialogOpen: (open: boolean) => void;
  setIsDietDialogOpen: (open: boolean) => void;
  setIsSupplementDialogOpen: (open: boolean) => void;
  setIsDialogOpen: (open: boolean) => void;
}

export const useStudentDialogHandlers = ({
  onSave,
  onSaveExercises,
  onSaveDiet, 
  onSaveSupplements,
  selectedStudent,
  selectedStudentForExercise,
  selectedStudentForDiet,
  selectedStudentForSupplement,
  setIsExerciseDialogOpen,
  setIsDietDialogOpen,
  setIsSupplementDialogOpen,
  setIsDialogOpen
}: DialogHandlerOptions) => {
  const { toast } = useToast();

  const handleSaveWrapper = (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">) => {
    try {
      const success = onSave(data, selectedStudent);
      if (success) {
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error saving student:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی اطلاعات دانش‌آموز پیش آمد. لطفا مجدد تلاش کنید."
      });
    }
  };

  const handleSaveExercisesWrapper = (exerciseIds: number[], dayNumber?: number): boolean => {
    if (!selectedStudentForExercise) {
      console.error("No student selected for exercise");
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "شاگردی برای ذخیره‌سازی تمرین‌ها انتخاب نشده است."
      });
      return false;
    }
    
    try {
      // Ensure exerciseIds is a valid array
      const validExerciseIds = Array.isArray(exerciseIds) ? exerciseIds : [];
      
      console.log("Saving exercises for student:", selectedStudentForExercise.id);
      console.log("Exercise IDs:", validExerciseIds);
      console.log("Day number:", dayNumber);
      
      const success = onSaveExercises(validExerciseIds, selectedStudentForExercise.id, dayNumber);
      
      // Only close the dialog if we're not saving for a specific day or if success is false
      if (success && dayNumber === undefined) {
        setIsExerciseDialogOpen(false);
      }
      
      return success;
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
  
  const handleSaveDietWrapper = (mealIds: number[]): boolean => {
    if (!selectedStudentForDiet) {
      console.error("No student selected for diet");
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "شاگردی برای ذخیره‌سازی برنامه غذایی انتخاب نشده است."
      });
      return false;
    }
    
    try {
      // Ensure mealIds is a valid array
      const validMealIds = Array.isArray(mealIds) ? mealIds : [];
      
      console.log("Saving diet for student:", selectedStudentForDiet.id);
      console.log("Meal IDs:", validMealIds);
      
      const success = onSaveDiet(validMealIds, selectedStudentForDiet.id);
      if (success) {
        setIsDietDialogOpen(false);
      }
      return success;
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
  
  const handleSaveSupplementsWrapper = (data: {supplements: number[], vitamins: number[]}): boolean => {
    if (!selectedStudentForSupplement) {
      console.error("No student selected for supplements");
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "شاگردی برای ذخیره‌سازی مکمل‌ها انتخاب نشده است."
      });
      return false;
    }
    
    try {
      // Ensure supplements and vitamins are valid arrays
      const validData = {
        supplements: Array.isArray(data.supplements) ? data.supplements : [],
        vitamins: Array.isArray(data.vitamins) ? data.vitamins : []
      };
      
      console.log("Saving supplements and vitamins for student:", selectedStudentForSupplement.id);
      console.log("Supplements to save:", validData.supplements);
      console.log("Vitamins to save:", validData.vitamins);
      
      const success = onSaveSupplements(validData, selectedStudentForSupplement.id);
      if (success) {
        setIsSupplementDialogOpen(false);
      }
      return success;
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

  return {
    handleSaveWrapper,
    handleSaveExercisesWrapper,
    handleSaveDietWrapper,
    handleSaveSupplementsWrapper
  };
};
