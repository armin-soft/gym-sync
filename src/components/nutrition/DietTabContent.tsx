
import React from "react";
import { Utensils, Tag, Info } from "lucide-react";
import { MealCard } from "./MealCard";
import { MealListWrapper } from "./MealListWrapper";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MealViewControls } from "./MealViewControls";

interface DietTabContentProps {
  selectedMeals: number[];
  toggleMeal: (id: number) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredMeals: any[];
  categories: any[];
  handleClearSearch: () => void;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const DietTabContent: React.FC<DietTabContentProps> = ({
  selectedMeals,
  toggleMeal,
  viewMode,
  setViewMode,
  filteredMeals,
  categories,
  handleClearSearch,
  selectedCategoryId,
  toggleSortOrder,
  sortOrder
}) => {
  // Count only selected meals that exist in the filtered meals
  const selectedFilteredMeals = filteredMeals.filter(meal => 
    selectedMeals.includes(meal.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-hidden flex flex-col mt-4 px-6 pb-4"
    >
      <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold bg-green-50/70 text-green-600 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <Utensils className="h-3.5 w-3.5" />
            <span>غذاهای انتخاب شده: {toPersianNumbers(selectedMeals.length)}</span>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white border-gray-800 font-medium">
                <p className="text-xs">با کلیک بر روی هر غذا آن را به لیست اضافه یا از آن حذف کنید</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-full px-3 py-1.5 shadow-sm flex items-center gap-1.5">
            <span className="text-gray-700 text-sm font-bold">{toPersianNumbers(filteredMeals.length)} غذا موجود</span>
          </div>
          
          <MealViewControls 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            toggleSortOrder={toggleSortOrder} 
            sortOrder={sortOrder}
          />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {filteredMeals.length > 0 ? (
          <MealListWrapper 
            maxHeight="calc(85vh - 280px)" 
            className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-lg shadow-sm"
            viewMode={viewMode}
          >
            <AnimatePresence>
              {filteredMeals.map((meal) => {
                const category = categories.find(cat => cat.id === meal.categoryId);
                const isSelected = selectedMeals.includes(meal.id);
                
                return (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    category={category}
                    isSelected={isSelected}
                    viewMode={viewMode}
                    onClick={() => toggleMeal(meal.id)}
                  />
                );
              })}
            </AnimatePresence>
          </MealListWrapper>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-gray-500 bg-white/50 rounded-lg border border-dashed border-gray-200 h-[60vh] shadow-inner"
          >
            <Utensils className="h-16 w-16 text-gray-300 mb-5" />
            <p className="text-center mb-3 text-lg font-bold text-gray-700">
              {selectedCategoryId === null 
                ? "لطفا ابتدا یک دسته‌بندی انتخاب کنید" 
                : "هیچ غذایی یافت نشد"}
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
                <span>برای مشاهده غذاها، یک دسته‌بندی را انتخاب کنید</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
