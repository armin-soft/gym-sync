
import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { ExerciseCard } from "./ExerciseCard";
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface ExerciseTabContentProps {
  selectedExercises: number[];
  toggleExercise: (id: number) => void;
  dayNumber: number;
  tabValue: string;
  viewMode: "grid" | "list";
  filteredExercises: Exercise[];
  categories: ExerciseCategory[];
  handleClearSearch: () => void;
  handleSaveExercises: (exerciseIds: number[], dayNumber?: number) => boolean;
}

export const ExerciseTabContent: React.FC<ExerciseTabContentProps> = ({
  selectedExercises,
  toggleExercise,
  dayNumber,
  tabValue,
  viewMode,
  filteredExercises,
  categories,
  handleClearSearch,
  handleSaveExercises
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
          
          <div className="flex border rounded overflow-hidden shadow-sm">
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-8 w-8 p-0 rounded-none ${viewMode === "grid" ? "bg-gray-100" : ""}`}
              onClick={() => {}}
              title="نمایش گرید"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-8 w-8 p-0 rounded-none ${viewMode === "list" ? "bg-gray-100" : ""}`}
              onClick={() => {}}
              title="نمایش لیست"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
            </Button>
          </div>
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
          <p className="text-center mb-2">هیچ تمرینی یافت نشد</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearSearch}
            className="mt-2"
          >
            پاک کردن فیلترها
          </Button>
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
