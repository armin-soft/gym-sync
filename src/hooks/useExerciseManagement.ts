
import { useState, useEffect, useCallback } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

export const useExerciseManagement = () => {
  const { toast } = useToast();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [exerciseFormData, setExerciseFormData] = useState({ name: "", categoryId: 0 });
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  // بارگذاری اطلاعات از localStorage
  useEffect(() => {
    try {
      const savedExercises = localStorage.getItem("exercises");
      const exs = savedExercises ? JSON.parse(savedExercises) : [];
      setExercises(exs);
    } catch (error) {
      console.error("Error loading exercises from localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در بارگذاری اطلاعات تمرین‌ها"
      });
    }
  }, []);

  // ذخیره اطلاعات در localStorage
  useEffect(() => {
    try {
      localStorage.setItem("exercises", JSON.stringify(exercises));
    } catch (error) {
      console.error("Error saving exercises to localStorage:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی اطلاعات تمرین‌ها"
      });
    }
  }, [exercises]);

  // مرتب‌سازی حرکات
  const handleSort = useCallback(() => {
    setIsAscending(!isAscending);
  }, [isAscending]);

  // افزودن یا ویرایش حرکت
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

      if (selectedExercise) {
        const updatedExercises = exercises.map(ex =>
          ex.id === selectedExercise.id ? { ...ex, ...formData } : ex
        );
        setExercises(updatedExercises);
        setIsExerciseDialogOpen(false);
        
        toast({
          title: "موفقیت",
          description: "حرکت با موفقیت ویرایش شد"
        });
      } else {
        const timestamp = Date.now();
        const newExercise: Exercise = {
          id: timestamp,
          ...formData
        };
        setExercises(prev => [...prev, newExercise]);
        setIsExerciseDialogOpen(false);
        
        toast({
          title: "موفقیت",
          description: "حرکت جدید با موفقیت اضافه شد"
        });
      }
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
  }, [exercises, selectedExercise]);

  // حذف حرکات
  const handleDeleteExercises = useCallback((selectedIds: number[]) => {
    setExercises(prevExercises => prevExercises.filter(ex => !selectedIds.includes(ex.id)));
    toast({
      title: "موفقیت",
      description: selectedIds.length > 1 
        ? "حرکت های انتخاب شده با موفقیت حذف شدند" 
        : "حرکت با موفقیت حذف شد"
    });
  }, []);

  return {
    exercises,
    setExercises,
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    isAscending,
    handleSort,
    handleExerciseSave,
    handleDeleteExercises
  };
};

export default useExerciseManagement;
