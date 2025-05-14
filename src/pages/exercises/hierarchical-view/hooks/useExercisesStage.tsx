
import { useState, useEffect } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface UseExercisesStageProps {
  categoryId: string;
}

export const useExercisesStage = ({ categoryId }: UseExercisesStageProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { exercises, categories, isLoading } = useExerciseData();
  const [showQuickSpeech, setShowQuickSpeech] = useState(false);
  
  // State for managing dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [formData, setFormData] = useState({ name: "", categoryId: parseInt(categoryId) || 0 });
  const [quickSpeechText, setQuickSpeechText] = useState("");

  // Update form data when category changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, categoryId: parseInt(categoryId) || 0 }));
  }, [categoryId]);
  
  // Filter exercises based on selected category
  const filteredExercises = exercises.filter(ex => ex.categoryId.toString() === categoryId);
  
  // Delete exercises
  const handleDeleteExercises = () => {
    try {
      const updatedExercises = exercises.filter(ex => !selectedExerciseIds.includes(ex.id));
      localStorage.setItem("exercises", JSON.stringify(updatedExercises));
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      toast({
        title: "موفقیت",
        description: selectedExerciseIds.length > 1 
          ? "حرکت های انتخاب شده با موفقیت حذف شدند" 
          : "حرکت با موفقیت حذف شد"
      });
      
      setSelectedExerciseIds([]);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting exercises:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف حرکت‌ها"
      });
    }
  };

  // Save new or edited exercise
  const handleSaveExercise = async (data: { name: string; categoryId: number }) => {
    try {
      // Check for duplicate exercise name
      const exerciseExists = exercises.some(ex => 
        ex.name.toLowerCase() === data.name.toLowerCase() && 
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
        // Edit existing exercise
        updatedExercises = exercises.map(ex =>
          ex.id === selectedExercise.id ? { ...ex, ...data } : ex
        );
        
        toast({
          title: "موفقیت",
          description: "حرکت با موفقیت ویرایش شد"
        });
      } else {
        // Add new exercise
        const timestamp = Date.now();
        const newExercise: Exercise = {
          id: timestamp,
          ...data
        };
        updatedExercises = [...exercises, newExercise];
        
        toast({
          title: "موفقیت",
          description: "حرکت جدید با موفقیت اضافه شد"
        });
      }
      
      // Save to localStorage and update react-query cache
      localStorage.setItem("exercises", JSON.stringify(updatedExercises));
      queryClient.setQueryData(["exercises"], updatedExercises);
      
      setIsAddDialogOpen(false);
      setSelectedExercise(undefined);
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
  };

  // Edit exercise
  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
    setIsAddDialogOpen(true);
  };

  // Add new exercise
  const handleAddExercise = () => {
    setSelectedExercise(undefined);
    setFormData({
      name: "",
      categoryId: parseInt(categoryId) || 0
    });
    setIsAddDialogOpen(true);
  };

  // Quick add with speech
  const handleQuickAdd = () => {
    if (!quickSpeechText.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام حرکت را وارد کنید"
      });
      return;
    }

    handleSaveExercise({
      name: quickSpeechText.trim(),
      categoryId: parseInt(categoryId) || 0
    }).then(() => {
      setQuickSpeechText("");
      setShowQuickSpeech(false);
    });
  };

  // Find selected category
  const selectedCategory = categories.find(cat => cat.id.toString() === categoryId);

  return {
    // Data
    isLoading,
    filteredExercises,
    selectedCategory,
    
    // State
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    showQuickSpeech,
    setShowQuickSpeech,
    
    // Dialog state
    isAddDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    formData,
    setFormData,
    
    // Quick speech
    quickSpeechText,
    setQuickSpeechText,
    
    // Handlers
    handleDeleteExercises,
    handleSaveExercise,
    handleEditExercise,
    handleAddExercise,
    handleQuickAdd
  };
};

export default useExercisesStage;
