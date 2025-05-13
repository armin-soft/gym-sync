
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import ExerciseHeader from "./ExerciseHeader";
import ExercisesList from "./ExercisesList";
import ExerciseDialogs from "./ExerciseDialogs";
import QuickSpeechAdd from "./QuickSpeechAdd";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
  onBack: () => void;
  onExerciseSelect: (exerciseId: string) => void;
}

const ExercisesStage: React.FC<ExercisesStageProps> = ({
  categoryId,
  typeId,
  onBack,
  onExerciseSelect
}) => {
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
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">در حال بارگذاری تمرین‌ها...</p>
        </div>
      </div>
    );
  }

  // Find selected category
  const selectedCategory = categories.find(cat => cat.id.toString() === categoryId);

  return (
    <motion.div 
      className="h-full flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          بازگشت به دسته‌بندی‌ها
        </Button>
      </div>

      <ExerciseHeader 
        exerciseCount={filteredExercises.length}
        selectedExerciseIds={selectedExerciseIds}
        onDeleteClick={() => setIsDeleteDialogOpen(true)}
        onAddExercise={handleAddExercise}
        showQuickSpeech={showQuickSpeech}
        toggleQuickSpeech={() => setShowQuickSpeech(!showQuickSpeech)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Quick speech add component */}
      {showQuickSpeech && (
        <QuickSpeechAdd
          quickSpeechText={quickSpeechText}
          setQuickSpeechText={setQuickSpeechText}
          onQuickAdd={handleQuickAdd}
        />
      )}

      {/* Exercise list component */}
      <ExercisesList
        filteredExercises={filteredExercises}
        selectedCategory={selectedCategory}
        selectedExerciseIds={selectedExerciseIds}
        setSelectedExerciseIds={setSelectedExerciseIds}
        viewMode={viewMode}
        onEditExercise={handleEditExercise}
        onDeleteExercise={(exerciseId) => {
          setSelectedExerciseIds([exerciseId]);
          setIsDeleteDialogOpen(true);
        }}
        onAddExercise={handleAddExercise}
      />

      {/* Dialogs */}
      <ExerciseDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        categories={categories}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveExercise}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        onDelete={handleDeleteExercises}
        selectedExerciseIds={selectedExerciseIds}
      />
    </motion.div>
  );
};

export default ExercisesStage;
