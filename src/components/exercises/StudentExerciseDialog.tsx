
import React, { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exerciseIds: number[], dayNumber?: number) => boolean;
  initialExercises: number[];
  initialExercisesDay1: number[];
  initialExercisesDay2: number[];
  initialExercisesDay3: number[];
  initialExercisesDay4: number[];
  exercises: Exercise[];
  categories: ExerciseCategory[];
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
  exercises = [],
}) => {
  const { toast } = useToast();
  
  // فچ کردن دسته‌بندی‌ها از localStorage
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      try {
        const categoriesData = localStorage.getItem("exerciseCategories");
        return categoriesData ? JSON.parse(categoriesData) : [];
      } catch(error) {
        console.error("Error loading exercise categories:", error);
        return [];
      }
    },
  });

  // فچ کردن انواع تمرین از localStorage
  const { data: exerciseTypes = [], isLoading: typesLoading } = useQuery({
    queryKey: ["exerciseTypes"],
    queryFn: () => {
      try {
        const typesData = localStorage.getItem("exerciseTypes");
        return typesData ? JSON.parse(typesData) : [];
      } catch(error) {
        console.error("Error loading exercise types:", error);
        return [];
      }
    },
  });

  const [activeTab, setActiveTab] = useState<string>("day1");
  
  // پیگیری وضعیت ذخیره‌سازی هر روز
  const [savedState, setSavedState] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false
  });

  // تنظیم دسته‌بندی براساس تمرین‌های ذخیره شده
  useEffect(() => {
    if (open && !categoriesLoading && categories.length > 0 && exercises.length > 0) {
      // بررسی تمرین‌های انتخاب شده در تب فعال
      let selectedExercises: number[] = [];
      switch(activeTab) {
        case "day1": selectedExercises = initialExercisesDay1; break;
        case "day2": selectedExercises = initialExercisesDay2; break;
        case "day3": selectedExercises = initialExercisesDay3; break;
        case "day4": selectedExercises = initialExercisesDay4; break;
        default: selectedExercises = initialExercises;
      }
      
      // یافتن دسته‌بندی اولین تمرین انتخاب شده (اگر وجود دارد)
      if (selectedExercises.length > 0) {
        const firstExerciseId = selectedExercises[0];
        const firstExercise = exercises.find(ex => ex.id === firstExerciseId);
        
        if (firstExercise && firstExercise.categoryId) {
          setSelectedCategoryId(firstExercise.categoryId);
          
          // یافتن نوع تمرین برای این دسته‌بندی
          const category = categories.find(cat => cat.id === firstExercise.categoryId);
          if (category && category.type) {
            setSelectedExerciseType(category.type);
          }
        }
      }
    }
  }, [open, activeTab, categories, exercises, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4, categoriesLoading]);

  // ریست کردن وضعیت ذخیره‌سازی هنگام باز شدن دیالوگ
  useEffect(() => {
    if (open) {
      setSavedState({
        day1: false,
        day2: false,
        day3: false,
        day4: false
      });
    }
  }, [open]);

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

  // گرفتن تمرین‌های انتخاب شده برای تب فعال
  const getActiveTabSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      default: return [];
    }
  };

  // ذخیره‌سازی تمرین‌ها
  const handleSave = () => {
    const selectedExercises = getActiveTabSelectedExercises();
    const dayNumber = parseInt(activeTab.replace("day", ""));
    
    try {
      const success = onSave(selectedExercises, dayNumber);
      
      if (success) {
        // بروزرسانی وضعیت ذخیره‌سازی برای تب فعلی
        setSavedState(prev => ({
          ...prev,
          [activeTab]: true
        }));
        
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های ${dayNumber === 1 ? 'روز اول' : 
                         dayNumber === 2 ? 'روز دوم' : 
                         dayNumber === 3 ? 'روز سوم' : 'روز چهارم'} با موفقیت ذخیره شدند`,
        });
        
        // تغییر خودکار به تب روز بعدی (اگر در روز چهارم نیستیم)
        if (activeTab !== "day4") {
          const nextTab = `day${dayNumber + 1}`;
          setActiveTab(nextTab);
        } else {
          // اگر همه روزها ذخیره شده‌اند، دیالوگ را ببند
          const allSaved = savedState.day1 && savedState.day2 && savedState.day3 && true;
          if (allSaved) {
            onOpenChange(false);
          }
        }
      }
      return success;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین‌ها پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  // wrapper برای ذخیره‌سازی تمرین‌ها
  const handleSaveExercises = (exerciseIds: number[], dayNumber?: number) => {
    return onSave(exerciseIds, dayNumber);
  };

  const isLoading = categoriesLoading || typesLoading;

  // اگر دیالوگ باز نیست، چیزی نمایش نده
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
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
