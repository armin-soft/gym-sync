
import { useState, useEffect } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface UseExercisesStageProps {
  categoryId: string;
  typeId: string;
}

export const useExercisesStage = ({ categoryId, typeId }: UseExercisesStageProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseData();
  const [showQuickSpeech, setShowQuickSpeech] = useState(false);
  
  // State for managing dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [formData, setFormData] = useState({ name: "", categoryId: parseInt(categoryId) || 0 });
  const [quickSpeechText, setQuickSpeechText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Update form data when category changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, categoryId: parseInt(categoryId) || 0 }));
  }, [categoryId]);
  
  // Filter exercises based on selected category
  const filteredExercises = exercises
    .filter(ex => ex.categoryId.toString() === categoryId)
    .filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // Find selected category and type
  const selectedCategory = categories.find(cat => cat.id.toString() === categoryId);
  const selectedType = exerciseTypes.find(type => type.id === typeId);
  const exerciseCount = filteredExercises.length;
  
  // Navigation
  const handleBack = () => {
    // Logic to navigate back
    console.log("Navigate back to categories");
  };
  
  // Delete exercises
  const handleDeleteExercise = (id: number) => {
    setSelectedExerciseIds([id]);
    setIsDeleteDialogOpen(true);
  };
  
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

  // Dialog management
  const handleExerciseDialogOpen = () => setIsAddDialogOpen(true);
  const handleExerciseDialogClose = () => {
    setIsAddDialogOpen(false);
    setSelectedExercise(undefined);
  };
  
  // View exercise details
  const handleViewExercise = (exercise: Exercise) => {
    console.log("View exercise:", exercise);
    // Implement view logic
  };

  // Save new or edited exercise
  const handleSubmit = async (data: { name: string; categoryId: number }) => {
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

    handleSubmit({
      name: quickSpeechText.trim(),
      categoryId: parseInt(categoryId) || 0
    }).then(() => {
      setQuickSpeechText("");
      setShowQuickSpeech(false);
    });
  };

  // Dialog state flags
  const isAddExerciseDialogOpen = isAddDialogOpen;
  const isEditExerciseDialogOpen = isAddDialogOpen && !!selectedExercise;
  const activeExercise = selectedExercise;

  return {
    // Data
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedType,
    exerciseCount,
    
    // State
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    showQuickSpeech,
    setShowQuickSpeech,
    
    // Dialog state
    isAddExerciseDialogOpen,
    isEditExerciseDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    activeExercise,
    formData,
    setFormData,
    
    // Navigation
    handleBack,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Quick speech
    quickSpeechText,
    setQuickSpeechText,
    
    // Dialog handlers
    handleExerciseDialogOpen,
    handleExerciseDialogClose,
    
    // Handlers
    handleDeleteExercise,
    handleDeleteExercises,
    handleSubmit,
    handleEditExercise,
    handleViewExercise,
    handleQuickAdd
  };
};

export default useExercisesStage;
