
import { useState, useEffect, useCallback } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { safeJSONParse, safeJSONSave, notifyDataChange } from "@/utils/database";

export const useExerciseManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [exerciseFormData, setExerciseFormData] = useState({ name: "", categoryId: 0 });
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  // بارگذاری اطلاعات از localStorage با استفاده از React Query و خطایابی بهتر
  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      try {
        console.log("Loading exercises in useExerciseManagement");
        return safeJSONParse<Exercise[]>("exercises", []);
      } catch (error) {
        console.error("Error loading exercises from localStorage:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری اطلاعات تمرین‌ها"
        });
        return [];
      }
    }
  });

  // مرتب‌سازی حرکات
  const handleSort = useCallback(() => {
    setIsAscending(!isAscending);
  }, [isAscending]);

  // افزودن یا ویرایش حرکت با مدیریت خطای بهتر
  const handleExerciseSave = useCallback(async (formData: { name: string; categoryId: number }) => {
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
      
      setIsExerciseDialogOpen(false);
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
  }, [exercises, selectedExercise, queryClient, toast]);

  // حذف حرکات با مدیریت خطای بهتر
  const handleDeleteExercises = useCallback((selectedIds: number[]) => {
    try {
      const updatedExercises = exercises.filter(ex => !selectedIds.includes(ex.id));
      
      if (safeJSONSave("exercises", updatedExercises)) {
        notifyDataChange("exercises");
        queryClient.setQueryData(["exercises"], updatedExercises);
        
        toast({
          title: "موفقیت",
          description: selectedIds.length > 1 
            ? "حرکت های انتخاب شده با موفقیت حذف شدند" 
            : "حرکت با موفقیت حذف شد"
        });
        return true;
      }
      return false;
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

  return {
    exercises,
    setExercises: (newExercises: Exercise[]) => {
      safeJSONSave("exercises", newExercises);
      notifyDataChange("exercises");
      queryClient.setQueryData(["exercises"], newExercises);
    },
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    isAscending,
    handleSort,
    handleExerciseSave,
    handleDeleteExercises,
    isLoading
  };
};

export default useExerciseManagement;
