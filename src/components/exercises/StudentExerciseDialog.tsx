
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { useExerciseFiltering } from "@/hooks/useExerciseFiltering";
import { useToast } from "@/hooks/use-toast";
import ExerciseDialogHeader from "./dialogs/ExerciseDialogHeader";
import ExerciseDialogFooter from "./dialogs/ExerciseDialogFooter";
import { ExerciseDialogContent } from "./dialogs/ExerciseDialogContent";
import { useExerciseDialogState } from "./dialogs/use-exercise-dialog-state";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => boolean;
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
  
  const {
    activeTab,
    setActiveTab,
    savedState,
    setSavedState,
    getActiveTabSelectedExercises
  } = useExerciseDialogState(open, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4);

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

  const {
    selectedExercisesDay1,
    selectedExercisesDay2,
    selectedExercisesDay3,
    selectedExercisesDay4,
    toggleExerciseDay1,
    toggleExerciseDay2,
    toggleExerciseDay3,
    toggleExerciseDay4,
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

  const handleSave = () => {
    const selectedExercises = getActiveTabSelectedExercises(
      selectedExercisesDay1,
      selectedExercisesDay2,
      selectedExercisesDay3,
      selectedExercisesDay4
    );
    const dayNumber = parseInt(activeTab.replace("day", ""));
    
    try {
      const success = onSave(selectedExercises, dayNumber);
      
      if (success) {
        setSavedState(prev => ({
          ...prev,
          [activeTab]: true
        }));
        
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های ${dayNumber === 1 ? 'روز اول' : 
                         dayNumber === 2 ? 'روز دوم' : 
                         dayNumber === 3 ? 'روز سوم' : 'روز چهارم'} با موفقیت ذخیره شدند`,
        });
        
        if (activeTab !== "day4") {
          const nextTab = `day${dayNumber + 1}`;
          setActiveTab(nextTab);
        } else {
          const allSaved = savedState.day1 && savedState.day2 && savedState.day3 && true;
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

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        <ExerciseDialogHeader studentName={studentName} />

        <ExerciseDialogContent
          isLoading={isLoading}
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
          handleSaveExercises={onSave}
        />

        <ExerciseDialogFooter
          activeTab={activeTab}
          selectedExercisesCount={getActiveTabSelectedExercises(
            selectedExercisesDay1,
            selectedExercisesDay2,
            selectedExercisesDay3,
            selectedExercisesDay4
          ).length}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
