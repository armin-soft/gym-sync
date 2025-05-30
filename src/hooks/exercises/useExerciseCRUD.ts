
import { useCallback } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { safeJSONSave, notifyDataChange } from "@/utils/database";

interface UseExerciseCRUDProps {
  exercises: Exercise[];
}

export const useExerciseCRUD = ({ exercises }: UseExerciseCRUDProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // افزودن یا ویرایش حرکت با مدیریت خطای بهتر
  const handleExerciseSave = useCallback(async (
    formData: { name: string; categoryId: number }, 
    selectedExercise?: Exercise
  ) => {
    try {
      // بررسی تکراری بودن نام حرکت
      const exerciseExists = exercises.some(ex => 
        ex.name.toLowerCase() === formData.name.toLowerCase() && 
        (selectedExercise ? ex.id !== selectedExercise.id : true)
      );
      
      if (exerciseExists) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این حرکت قبلاً اضافه شده است"
        });
        return Promise.reject("نام تکراری");
      }

      let updatedExercises;
      
      if (selectedExercise) {
        // ویرایش حرکت موجود
        updatedExercises = exercises.map(ex =>
          ex.id === selectedExercise.id ? { ...ex, ...formData } : ex
        );
        
        toast({
          title: "موفقیت",
          description: "حرکت با موفقیت ویرایش شد"
        });
      } else {
        // افزودن حرکت جدید
        const timestamp = Date.now();
        const newExercise: Exercise = {
          id: timestamp,
          ...formData
        };
        updatedExercises = [...exercises, newExercise];
        
        toast({
          title: "موفقیت",
          description: "حرکت جدید با موفقیت اضافه شد"
        });
      }
      
      // ذخیره در localStorage و به‌روزرسانی کش react-query
      safeJSONSave("exercises", updatedExercises);
      notifyDataChange("exercises");
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی حرکت"
      });
      return Promise.reject(error);
    }
  }, [exercises, queryClient, toast]);

  // حذف حرکات با مدیریت خطای بهتر
  const handleDeleteExercises = useCallback((selectedIds: number[]) => {
    try {
      const updatedExercises = exercises.filter(ex => !selectedIds.includes(ex.id));
      
      safeJSONSave("exercises", updatedExercises);
      notifyDataChange("exercises");
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      toast({
        title: "موفقیت",
        description: selectedIds.length > 1 
          ? "حرکت های انتخاب شده با موفقیت حذف شدند" 
          : "حرکت با موفقیت حذف شد"
      });
      return true;
    } catch (error) {
      console.error('Error deleting exercises:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف حرکت‌ها"
      });
      return false;
    }
  }, [exercises, queryClient, toast]);

  const updateExercises = useCallback((newExercises: Exercise[]) => {
    safeJSONSave("exercises", newExercises);
    notifyDataChange("exercises");
    queryClient.setQueryData(["exercises"], newExercises);
  }, [queryClient]);

  return {
    handleExerciseSave,
    handleDeleteExercises,
    updateExercises
  };
};
