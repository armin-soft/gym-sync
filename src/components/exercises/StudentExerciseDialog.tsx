
import React, { useState } from "react";
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

  const handleSaveExercises = (exerciseIds: number[], dayNumber?: number) => {
    return onSave(exerciseIds, dayNumber);
  };

  const getActiveTabSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  const handleSave = () => {
    let success = false;
    const selectedExercises = getActiveTabSelectedExercises();
    const dayNumber = parseInt(activeTab.replace("day", ""));
    success = handleSaveExercises(selectedExercises, dayNumber);
    if (success) onOpenChange(false);
  };

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] w-full max-h-[90vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col">
        <ExerciseDialogHeader studentName={studentName} />

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
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
