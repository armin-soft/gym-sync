
import React from "react";
import { ExerciseWithSets } from "@/types/exercise";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, List, Grid3X3 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import ExerciseTypeCategory from "./selectors/ExerciseTypeCategory";
import SelectedExercisesList from "./selectors/SelectedExercisesList";
import ExerciseListDisplay from "./selectors/ExerciseListDisplay";
import { useExerciseSelector } from "./hooks/useExerciseSelector";

interface StudentExerciseSelectorProps {
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
  exercises: any[]; 
  dayLabel?: string;
}

const StudentExerciseSelector: React.FC<StudentExerciseSelectorProps> = ({
  selectedExercises,
  setSelectedExercises,
  dayNumber,
  exercises,
  dayLabel,
}) => {
  // دریافت داده‌ها از دیتابیس محلی
  const { categories, exerciseTypes, isLoading } = useExerciseData();
  
  const {
    selectedType,
    setSelectedType,
    selectedCategoryId,
    setSelectedCategoryId,
    viewMode,
    setViewMode,
    filteredCategories,
    filteredExercises,
    toggleExercise,
    handleSetsChange,
    handleRepsChange,
    clearFilters
  } = useExerciseSelector({
    exercises,
    categories,
    exerciseTypes,
    selectedExercises,
    setSelectedExercises,
    dayNumber
  });

  const getDayLabel = () => {
    if (dayLabel) return dayLabel;
    
    switch (dayNumber) {
      case 1: return "روز اول";
      case 2: return "روز دوم";
      case 3: return "روز سوم";
      case 4: return "روز چهارم";
      default: return `روز ${toPersianNumbers(dayNumber)}`;
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-4 rtl">
      {/* نمایش منوی سلسله مراتبی انتخاب */}
      <ExerciseTypeCategory
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        exerciseTypes={exerciseTypes}
        filteredCategories={filteredCategories}
        filteredExercises={filteredExercises}
        clearFilters={clearFilters}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2 justify-center">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              <span>تمرین‌های انتخاب شده برای {getDayLabel()}</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full h-5 min-w-[20px] px-1.5">
                {toPersianNumbers(selectedExercises.length)}
              </span>
            </h4>
            
            <SelectedExercisesList
              selectedExercises={selectedExercises}
              exercises={exercises}
              dayLabel={getDayLabel()}
              toggleExercise={toggleExercise}
              handleSetsChange={handleSetsChange}
              handleRepsChange={handleRepsChange}
            />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-right">لیست تمرین‌ها</h4>
            
            <ExerciseListDisplay
              filteredExercises={filteredExercises}
              selectedExercises={selectedExercises}
              selectedType={selectedType}
              selectedCategoryId={selectedCategoryId}
              toggleExercise={toggleExercise}
              viewMode={viewMode}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentExerciseSelector;
