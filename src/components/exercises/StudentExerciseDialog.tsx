
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { useExerciseFiltering } from "@/hooks/useExerciseFiltering";
import { ExerciseSearchFilters } from "./ExerciseSearchFilters";
import ExerciseDayTabs from "./ExerciseDayTabs";
import ExerciseDialogFooter from "./ExerciseDialogFooter";
import ExerciseDialogHeader from "./ExerciseDialogHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
}

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
}) => {
  const { toast } = useToast();
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });

  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      const typesData = localStorage.getItem("exerciseTypes");
      return typesData ? JSON.parse(typesData) : [];
    },
  });

  const [activeTab, setActiveTab] = useState<string>("day1");
  
  // Track if exercises have been saved for each day
  const [savedState, setSavedState] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false
  });

  // Auto-select category based on saved exercises
  useEffect(() => {
    if (open && !categoriesLoading && !exercisesLoading && categories.length > 0 && exercises.length > 0) {
      // Get the active tab's selected exercises
      let selectedExercises: number[] = [];
      switch(activeTab) {
        case "day1": selectedExercises = initialExercisesDay1; break;
        case "day2": selectedExercises = initialExercisesDay2; break;
        case "day3": selectedExercises = initialExercisesDay3; break;
        case "day4": selectedExercises = initialExercisesDay4; break;
        default: selectedExercises = initialExercises;
      }
      
      // Find category of first selected exercise if there are any
      if (selectedExercises.length > 0) {
        const firstExerciseId = selectedExercises[0];
        const firstExercise = exercises.find(ex => ex.id === firstExerciseId);
        
        if (firstExercise && firstExercise.categoryId) {
          console.log("Auto-selecting category:", firstExercise.categoryId);
          setSelectedCategoryId(firstExercise.categoryId);
          
          // Get exercise type for this category
          const category = categories.find(cat => cat.id === firstExercise.categoryId);
          if (category && category.type) {
            console.log("Auto-selecting exercise type:", category.type);
            setSelectedExerciseType(category.type);
          }
        }
      }
    }
  }, [open, activeTab, categories, exercises, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4, categoriesLoading, exercisesLoading]);

  useEffect(() => {
    // Reset saved state when dialog opens
    if (open) {
      setSavedState({
        day1: false,
        day2: false,
        day3: false,
        day4: false
      });
    }
  }, [open]);

  const {
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    toggleExerciseDay1,
    toggleExerciseDay2,
    toggleExerciseDay3,
    toggleExerciseDay4,
    exerciseSetsDay1,
    exerciseSetsDay2,
    exerciseSetsDay3,
    exerciseSetsDay4,
    handleSetsChangeDay1,
    handleSetsChangeDay2,
    handleSetsChangeDay3,
    handleSetsChangeDay4,
    exerciseRepsDay1,
    exerciseRepsDay2,
    exerciseRepsDay3,
    exerciseRepsDay4,
    handleRepsChangeDay1,
    handleRepsChangeDay2,
    handleRepsChangeDay3,
    handleRepsChangeDay4,
    getSelectedExercisesWithSetsDay1,
    getSelectedExercisesWithSetsDay2,
    getSelectedExercisesWithSetsDay3,
    getSelectedExercisesWithSetsDay4
  } = useExerciseSelection(
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4
  );

  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
  } = useExerciseFiltering(exercises, categories);

  const getActiveTabSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  const getActiveTabSelectedExercisesWithSets = () => {
    switch(activeTab) {
      case "day1": return getSelectedExercisesWithSetsDay1();
      case "day2": return getSelectedExercisesWithSetsDay2();
      case "day3": return getSelectedExercisesWithSetsDay3();
      case "day4": return getSelectedExercisesWithSetsDay4();
      default: return [];
    }
  };

  const handleSave = () => {
    const selectedExercisesWithSets = getActiveTabSelectedExercisesWithSets();
    const dayNumber = parseInt(activeTab.replace("day", ""));
    
    try {
      const success = onSave(selectedExercisesWithSets, dayNumber);
      
      if (success) {
        // Update saved state for the current tab
        setSavedState(prev => ({
          ...prev,
          [activeTab]: true
        }));
        
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های ${dayNumber === 1 ? 'روز اول' : 
                         dayNumber === 2 ? 'روز دوم' : 
                         dayNumber === 3 ? 'روز سوم' : 'روز چهارم'} با موفقیت ذخیره شدند`,
          variant: "default",
        });
        
        // Automatically switch to the next day tab if not on day4
        if (activeTab !== "day4") {
          const nextTab = `day${dayNumber + 1}`;
          setActiveTab(nextTab);
        } else {
          // If all days have been saved, close the dialog
          const allSaved = savedState.day1 && savedState.day2 && savedState.day3 && true; // day4 is saved now
          if (allSaved) {
            onOpenChange(false);
          }
        }
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

  const handleSaveExercises = (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => {
    return onSave(exercisesWithSets, dayNumber);
  };

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        <ExerciseDialogHeader studentName={studentName} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 font-medium"
            >
              در حال بارگذاری تمرین‌ها...
            </motion.p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.5, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <ExerciseSearchFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedExerciseType={selectedExerciseType}
                setSelectedExerciseType={setSelectedExerciseType}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
                exerciseTypes={exerciseTypes}
                categories={categories}
                filteredCategories={filteredCategories}
                handleClearSearch={handleClearSearch}
                toggleSortOrder={toggleSortOrder}
                sortOrder={sortOrder}
              />

              <ExerciseDayTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedExercisesDay1={selectedExercisesDay1}
                selectedExercisesDay2={selectedExercisesDay2}
                selectedExercisesDay3={selectedExercisesDay3}
                selectedExercisesDay4={selectedExercisesDay4}
                toggleExerciseDay1={toggleExerciseDay1}
                toggleExerciseDay2={toggleExerciseDay2}
                toggleExerciseDay3={toggleExerciseDay3}
                toggleExerciseDay4={toggleExerciseDay4}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filteredExercises={filteredExercises}
                categories={categories}
                handleClearSearch={handleClearSearch}
                handleSaveExercises={handleSaveExercises}
                selectedCategoryId={selectedCategoryId}
                toggleSortOrder={toggleSortOrder}
                sortOrder={sortOrder}
                exerciseSetsDay1={exerciseSetsDay1}
                exerciseSetsDay2={exerciseSetsDay2}
                exerciseSetsDay3={exerciseSetsDay3}
                exerciseSetsDay4={exerciseSetsDay4}
                handleSetsChangeDay1={handleSetsChangeDay1}
                handleSetsChangeDay2={handleSetsChangeDay2}
                handleSetsChangeDay3={handleSetsChangeDay3}
                handleSetsChangeDay4={handleSetsChangeDay4}
                exerciseRepsDay1={exerciseRepsDay1}
                exerciseRepsDay2={exerciseRepsDay2}
                exerciseRepsDay3={exerciseRepsDay3}
                exerciseRepsDay4={exerciseRepsDay4}
                handleRepsChangeDay1={handleRepsChangeDay1}
                handleRepsChangeDay2={handleRepsChangeDay2}
                handleRepsChangeDay3={handleRepsChangeDay3}
                handleRepsChangeDay4={handleRepsChangeDay4}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <ExerciseDialogFooter
          activeTab={activeTab}
          selectedExercisesCount={getActiveTabSelectedExercises().length}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
