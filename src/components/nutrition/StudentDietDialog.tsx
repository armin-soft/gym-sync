
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { DietDialogHeader } from "./DietDialogHeader";
import { DietSearchFilters } from "./DietSearchFilters";
import { DietTabContent } from "./DietTabContent";
import { DietDialogFooter } from "./DietDialogFooter";
import { useMealSelection } from "@/hooks/useMealSelection";
import { useMealFiltering } from "@/hooks/useMealFiltering";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => boolean;
  initialMeals?: number[];
}

export const StudentDietDialog: React.FC<StudentDietDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
}) => {
  const { toast } = useToast();
  const { data: meals = [], isLoading: mealsLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: () => {
      const mealsData = localStorage.getItem("meals");
      return mealsData ? JSON.parse(mealsData) : [];
    },
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["mealCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("mealCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });

  const {
    selectedMeals,
    toggleMeal
  } = useMealSelection(initialMeals);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredMeals,
    filteredCategories,
    handleClearSearch,
  } = useMealFiltering(meals, categories);

  const handleSave = () => {
    try {
      const success = onSave(selectedMeals);
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: "برنامه غذایی با موفقیت ذخیره شد",
        });
        
        onOpenChange(false);
      }
      return success;
    } catch (error) {
      console.error("Error saving meals:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  const isLoading = mealsLoading || categoriesLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        <DietDialogHeader studentName={studentName} />

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
              <DietSearchFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
                categories={categories}
                filteredCategories={filteredCategories}
                handleClearSearch={handleClearSearch}
                toggleSortOrder={toggleSortOrder}
                sortOrder={sortOrder}
              />

              <DietTabContent 
                selectedMeals={selectedMeals} 
                toggleMeal={toggleMeal}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filteredMeals={filteredMeals}
                categories={categories}
                handleClearSearch={handleClearSearch}
                selectedCategoryId={selectedCategoryId}
                toggleSortOrder={toggleSortOrder}
                sortOrder={sortOrder}
              />
            </motion.div>
          </AnimatePresence>
        )}

        <DietDialogFooter
          selectedMealsCount={selectedMeals.length}
          onCancel={() => onOpenChange(false)}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};
