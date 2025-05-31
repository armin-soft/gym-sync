
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { setLocalStorageItem, getLocalStorageItem } from "@/utils/localStorage";

interface UseExerciseCRUDProps {
  exercises: Exercise[];
}

export const useExerciseCRUD = ({ exercises }: UseExerciseCRUDProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add/Update exercise mutation
  const saveExerciseMutation = useMutation({
    mutationFn: async ({ formData, selectedExercise }: { 
      formData: { name: string; categoryId: number },
      selectedExercise: Exercise | null 
    }) => {
      const currentExercises = getLocalStorageItem<Exercise[]>("exercises", []);
      
      if (selectedExercise) {
        // Update existing exercise
        const updatedExercises = currentExercises.map(ex => 
          ex.id === selectedExercise.id 
            ? { ...ex, ...formData }
            : ex
        );
        setLocalStorageItem("exercises", updatedExercises);
        return updatedExercises;
      } else {
        // Add new exercise
        const newExercise: Exercise = {
          id: Date.now(),
          name: formData.name,
          categoryId: formData.categoryId,
        };
        const updatedExercises = [...currentExercises, newExercise];
        setLocalStorageItem("exercises", updatedExercises);
        return updatedExercises;
      }
    },
    onSuccess: (updatedExercises, { selectedExercise }) => {
      // Update query cache
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      toast({
        title: selectedExercise ? "تمرین به‌روزرسانی شد" : "تمرین جدید اضافه شد",
        description: selectedExercise 
          ? "تغییرات با موفقیت ذخیره شد"
          : "تمرین جدید به لیست اضافه شد"
      });
    },
    onError: (error) => {
      console.error("Error saving exercise:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین پیش آمد"
      });
    }
  });

  // Delete exercises mutation
  const deleteExercisesMutation = useMutation({
    mutationFn: async (exerciseIds: number[]) => {
      const currentExercises = getLocalStorageItem<Exercise[]>("exercises", []);
      const updatedExercises = currentExercises.filter(ex => !exerciseIds.includes(ex.id));
      setLocalStorageItem("exercises", updatedExercises);
      return updatedExercises;
    },
    onSuccess: (updatedExercises, exerciseIds) => {
      // Update query cache
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      toast({
        title: "تمرین‌ها حذف شدند",
        description: `${exerciseIds.length} تمرین با موفقیت حذف شد`
      });
    },
    onError: (error) => {
      console.error("Error deleting exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در حذف",
        description: "مشکلی در حذف تمرین‌ها پیش آمد"
      });
    }
  });

  const handleExerciseSave = (
    formData: { name: string; categoryId: number },
    selectedExercise: Exercise | null = null
  ) => {
    saveExerciseMutation.mutate({ formData, selectedExercise });
    return !saveExerciseMutation.isError;
  };

  const handleDeleteExercises = (exerciseIds: number[]) => {
    deleteExercisesMutation.mutate(exerciseIds);
    return !deleteExercisesMutation.isError;
  };

  const updateExercises = (newExercises: Exercise[]) => {
    queryClient.setQueryData(["exercises"], newExercises);
    setLocalStorageItem("exercises", newExercises);
  };

  return {
    handleExerciseSave,
    handleDeleteExercises,
    updateExercises,
    isLoading: saveExerciseMutation.isPending || deleteExercisesMutation.isPending
  };
};
