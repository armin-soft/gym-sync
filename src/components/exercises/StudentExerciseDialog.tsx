
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExerciseSelection } from "@/hooks/useExerciseSelection";
import { useExerciseFiltering } from "@/hooks/useExerciseFiltering";
import { Dumbbell } from "lucide-react";
import { ExerciseSearchFilters } from "./ExerciseSearchFilters";
import ExerciseDayTabs from "./ExerciseDayTabs";
import ExerciseDialogFooter from "./ExerciseDialogFooter";

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
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });

  const { data: exerciseTypes = [] } = useQuery({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] w-full max-h-[98vh] p-0 overflow-hidden">
        <DialogHeader className="pb-4 border-b p-6">
          <DialogTitle className="text-xl flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span>مدیریت تمرین‌های {studentName}</span>
          </DialogTitle>
          <DialogDescription>
            تمرین‌های مورد نظر را انتخاب کنید تا به برنامه تمرینی شاگرد اضافه شوند
          </DialogDescription>
        </DialogHeader>

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
          filteredExercises={filteredExercises}
          categories={categories}
          handleClearSearch={handleClearSearch}
          handleSaveExercises={handleSaveExercises}
          selectedCategoryId={selectedCategoryId}
        />

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
