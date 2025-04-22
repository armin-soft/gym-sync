
import React from "react";
import { Dumbbell, Tag, Info } from "lucide-react";
import { ExerciseCard } from "./ExerciseCard";
import { StudentExerciseListWrapper } from "./StudentExerciseListWrapper";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { ExerciseViewControls } from "./ExerciseViewControls";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      case "day1": return "bg-blue-50/70 text-blue-600";
      case "day2": return "bg-purple-50/70 text-purple-600";
      case "day3": return "bg-pink-50/70 text-pink-600";
      case "day4": return "bg-amber-50/70 text-amber-600";
      default: return "bg-slate-50/70 text-slate-600";
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

  // Count only selected exercises that exist in the filtered exercises
  const selectedFilteredExercises = filteredExercises.filter(exercise => 
    selectedExercises.includes(exercise.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-hidden flex flex-col mt-4"
    >
      <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-bold ${activeColorClass} px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5`}>
            <Dumbbell className="h-3.5 w-3.5" />
            <span>تمرین‌های انتخاب شده: {toPersianNumbers(selectedExercises.length)}</span>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white border-gray-800 font-medium">
                <p className="text-xs">با کلیک بر روی هر تمرین آن را به لیست اضافه یا از آن حذف کنید</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-full px-3 py-1.5 shadow-sm flex items-center gap-1.5">
            <span className="text-gray-700 text-sm font-bold">{toPersianNumbers(filteredExercises.length)} تمرین موجود</span>
          </div>
          
          <ExerciseViewControls 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            toggleSortOrder={toggleSortOrder} 
            sortOrder={sortOrder}
          />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {filteredExercises.length > 0 ? (
          <StudentExerciseListWrapper 
            maxHeight="calc(85vh - 280px)" 
            className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg shadow-sm"
            viewMode={viewMode}
          >
            <AnimatePresence>
              {filteredExercises.map((exercise) => {
                const category = categories.find(cat => cat.id === exercise.categoryId);
                const isSelected = selectedExercises.includes(exercise.id);
                
                return (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    category={category}
                    isSelected={isSelected}
                    viewMode={viewMode}
                    onClick={() => toggleExercise(exercise.id)}
                  />
                );
              })}
            </AnimatePresence>
          </StudentExerciseListWrapper>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-gray-500 bg-white/50 rounded-lg border border-dashed border-gray-200 h-[60vh] shadow-inner"
          >
            <Dumbbell className="h-16 w-16 text-gray-300 mb-5" />
            <p className="text-center mb-3 text-lg font-bold text-gray-700">
              {selectedCategoryId === null 
                ? "لطفا ابتدا یک دسته‌بندی انتخاب کنید" 
                : "هیچ تمرینی یافت نشد"}
            </p>
            {selectedCategoryId !== null && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearSearch}
                className="mt-2 font-medium text-gray-700"
              >
                پاک کردن فیلترها
              </Button>
            )}
            {selectedCategoryId === null && (
              <div className="flex items-center justify-center mt-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-full px-4 py-2 shadow-sm">
                <Tag className="h-4 w-4 ml-2" />
                <span>برای مشاهده تمرین‌ها، یک دسته‌بندی را انتخاب کنید</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExerciseTabContent;
