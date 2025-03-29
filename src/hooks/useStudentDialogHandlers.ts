
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
    const success = onSave(data, selectedStudent);
    if (success) {
      setIsDialogOpen(false);
    }
  };

  const handleSaveExercisesWrapper = (exerciseIds: number[], dayNumber?: number): boolean => {
    if (!selectedStudentForExercise) return false;
    
    try {
      const success = onSaveExercises(exerciseIds, selectedStudentForExercise.id, dayNumber);
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
    if (!selectedStudentForDiet) return false;
    
    try {
      const success = onSaveDiet(mealIds, selectedStudentForDiet.id);
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
    if (!selectedStudentForSupplement) return false;
    
    try {
      console.log("Saving supplements and vitamins for student:", selectedStudentForSupplement.id);
      console.log("Supplements to save:", data.supplements);
      console.log("Vitamins to save:", data.vitamins);
      
      const success = onSaveSupplements(data, selectedStudentForSupplement.id);
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
