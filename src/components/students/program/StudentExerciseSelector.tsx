
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
import { cn } from "@/lib/utils";

interface StudentExerciseSelectorProps {
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
  exercises: any[]; 
  dayLabel?: string;
  noScroll?: boolean;
}

const StudentExerciseSelector: React.FC<StudentExerciseSelectorProps> = ({
  selectedExercises,
  setSelectedExercises,
  dayNumber,
  exercises,
  dayLabel,
  noScroll = false,
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
      case 5: return "روز پنجم";
      default: return `روز ${toPersianNumbers(dayNumber)}`;
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-right" dir="rtl">در حال بارگذاری...</div>;
  }

  return (
    <div className={cn(
      "space-y-4 text-right",
      noScroll ? "h-full flex flex-col" : ""
    )} dir="rtl">
      {/* نمایش منوی سلسله مراتبی انتخاب */}
      <div className="text-right" dir="rtl">
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
      </div>
      
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-4 text-right",
        noScroll ? "flex-1 overflow-auto" : ""
      )} dir="rtl">
        <Card className="shadow-sm text-right" dir="rtl">
          <CardContent className="p-4 text-right" dir="rtl">
            <h4 className="font-medium mb-3 flex items-center gap-2 justify-start text-right" dir="rtl">
              <Dumbbell className="h-4 w-4 text-indigo-500" />
              <span className="text-right">تمرین‌های انتخاب شده برای {getDayLabel()}</span>
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full h-5 min-w-[20px] px-1.5">
                {toPersianNumbers(selectedExercises.length)}
              </span>
            </h4>
            
            {selectedExercises.length > 0 ? (
              <div className="text-right" dir="rtl">
                <SelectedExercisesList
                  selectedExercises={selectedExercises}
                  exercises={exercises}
                  dayLabel={getDayLabel()}
                  toggleExercise={toggleExercise}
                  handleSetsChange={handleSetsChange}
                  handleRepsChange={handleRepsChange}
                />
              </div>
            ) : (
              <div className="text-center p-4 text-right" dir="rtl">
                <p className="text-muted-foreground text-right">هیچ تمرینی انتخاب نشده است</p>
                <p className="text-sm text-muted-foreground mt-1 text-right">از لیست سمت راست تمرین را انتخاب کنید</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-sm text-right" dir="rtl">
          <CardContent className="p-4 text-right" dir="rtl">
            <h4 className="font-medium mb-3 text-right">لیست تمرین‌ها</h4>
            
            {filteredExercises.length > 0 ? (
              <div className="text-right" dir="rtl">
                <ExerciseListDisplay
                  filteredExercises={filteredExercises}
                  selectedExercises={selectedExercises}
                  selectedType={selectedType}
                  selectedCategoryId={selectedCategoryId}
                  toggleExercise={toggleExercise}
                  viewMode={viewMode}
                />
              </div>
            ) : (
              <div className="text-center p-4 text-right" dir="rtl">
                <p className="text-muted-foreground text-right">هیچ تمرینی برای نمایش وجود ندارد</p>
                <p className="text-sm text-muted-foreground mt-1 text-right">لطفا یک دسته‌بندی انتخاب کنید</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentExerciseSelector;
