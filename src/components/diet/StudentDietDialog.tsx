
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useStudentDietDialog } from "./hooks/useStudentDietDialog";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  initialMeals?: number[];
  onSave: (mealIds: number[]) => boolean;
}

export const StudentDietDialog: React.FC<StudentDietDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  initialMeals = [],
  onSave,
}) => {
  const {
    selectedMeals,
    toggleMeal,
    isMealSelected,
    filteredMeals,
    meals,
    handleSave,
    searchQuery,
    setSearchQuery,
    mealsLoaded,
    sortOrder,
    toggleSortOrder,
    selectedMealType,
    setSelectedMealType,
    mealTypes,
    showFilters,
    setShowFilters,
  } = useStudentDietDialog(initialMeals, onSave);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col">
        <DialogTitle className="sr-only">
          انتخاب برنامه غذایی برای {studentName}
        </DialogTitle>
        
        <header className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="container mx-auto flex items-center justify-between">
            <h2 className="text-lg font-bold">انتخاب برنامه غذایی</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-green-700"
              onClick={() => onOpenChange(false)}
            >
              بستن
            </Button>
          </div>
        </header>
        
        <div className="p-4 flex-1 overflow-hidden flex flex-col">
          {/* Search and filter controls would go here */}
          <ScrollArea className="flex-1 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
              {filteredMeals.map((meal) => (
                <div 
                  key={meal.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    isMealSelected(meal.id) 
                      ? "bg-green-100 dark:bg-green-900 border-2 border-green-500" 
                      : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700"
                  }`}
                  onClick={() => toggleMeal(meal.id)}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{meal.name}</h3>
                    {isMealSelected(meal.id) && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {meal.description?.substring(0, 100)}
                    {meal.description?.length > 100 ? '...' : ''}
                  </p>
                  <span className="inline-block px-2 py-1 mt-2 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                    {meal.type}
                  </span>
                </div>
              ))}
              
              {filteredMeals.length === 0 && (
                <div className="col-span-full p-8 text-center text-gray-500 dark:text-gray-400">
                  هیچ غذایی یافت نشد.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedMeals.length} غذا انتخاب شده
            </p>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              ذخیره برنامه غذایی
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
