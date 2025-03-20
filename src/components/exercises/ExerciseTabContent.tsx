
import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Tag } from "lucide-react";
import { ExerciseCard } from "./ExerciseCard";
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseViewControls } from "./ExerciseViewControls";

interface ExerciseTabContentProps {
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  dayNumber: number;
  tabValue: string;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
  categories: ExerciseCategory[];
  handleClearSearch: () => void;
  handleSaveExercises: (exerciseIds: number[], dayNumber?: number) => boolean;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const ExerciseTabContent: React.FC<ExerciseTabContentProps> = ({
  selectedExercises,
  toggleExercise,
  dayNumber,
  tabValue,
  viewMode,
  setViewMode,
  filteredExercises,
  categories,
  handleClearSearch,
  handleSaveExercises,
  selectedCategoryId,
  toggleSortOrder,
  sortOrder
}) => {
  const getActiveTabContentColor = (tab: string) => {
    switch (tab) {
      case "day1": return "bg-blue-50 text-blue-600";
      case "day2": return "bg-purple-50 text-purple-600";
      case "day3": return "bg-pink-50 text-pink-600";
      case "day4": return "bg-amber-50 text-amber-600";
      default: return "bg-slate-50 text-slate-600";
    }
  };

  const getBtnGradient = (tab: string) => {
    switch (tab) {
      case "day1": return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700";
      case "day2": return "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700";
      case "day3": return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "day4": return "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700";
      default: return "";
    }
  };

  const activeColorClass = getActiveTabContentColor(tabValue);
  const btnGradient = getBtnGradient(tabValue);

  return (
    <div className="flex-1 overflow-hidden flex flex-col mt-4">
      <div className="mb-4 p-3 rounded-md flex flex-wrap gap-2 justify-between items-center bg-gray-50 border border-gray-100 shadow-sm">
        <div className={`text-sm font-medium ${activeColorClass} px-3 py-1 rounded-full shadow-sm`}>
          تمرین‌های انتخاب شده: {toPersianNumbers(selectedExercises.length)}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-full px-3 py-1 shadow-sm">
            <span className="text-gray-700 text-sm">{toPersianNumbers(filteredExercises.length)} تمرین موجود</span>
          </div>
          
          <ExerciseViewControls 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            toggleSortOrder={toggleSortOrder} 
            sortOrder={sortOrder}
          />
        </div>
      </div>
      
      {filteredExercises.length > 0 ? (
        <StudentExerciseListWrapper 
          maxHeight="calc(85vh - 260px)" 
          className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg shadow-sm"
          viewMode={viewMode}
        >
          {filteredExercises.map((exercise) => {
            const category = categories.find(cat => cat.id === exercise.categoryId);
            return (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                category={category}
                isSelected={selectedExercises.includes(exercise.id)}
                viewMode={viewMode}
                onClick={() => toggleExercise(exercise.id)}
              />
            );
          })}
        </StudentExerciseListWrapper>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 h-[60vh] shadow-inner">
          <Dumbbell className="h-12 w-12 text-gray-300 mb-3" />
          <p className="text-center mb-2">
            {selectedCategoryId === null 
              ? "لطفا ابتدا یک دسته‌بندی انتخاب کنید" 
              : "هیچ تمرینی یافت نشد"}
          </p>
          {selectedCategoryId !== null && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearSearch}
              className="mt-2"
            >
              پاک کردن فیلترها
            </Button>
          )}
          {selectedCategoryId === null && (
            <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
              <Tag className="h-4 w-4 mr-1" />
              <span>برای مشاهده تمرین‌ها، یک دسته‌بندی را انتخاب کنید</span>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={() => handleSaveExercises(selectedExercises, dayNumber)} 
          className={`${btnGradient} shadow-md hover:shadow-lg transition-all`}
        >
          ذخیره تمرین‌های روز {toPersianNumbers(dayNumber)}
        </Button>
      </div>
    </div>
  );
};
