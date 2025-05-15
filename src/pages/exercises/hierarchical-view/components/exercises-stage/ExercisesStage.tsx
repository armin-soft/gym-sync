
import React, { useState, useEffect } from "react";
import { useExerciseDialogData } from "@/hooks/exercises/useExerciseDialogData";
import { Card } from "@/components/ui/card";
import { Exercise } from "@/types/exercise";
import { motion, AnimatePresence } from "framer-motion";
import { StudentExerciseCard } from "@/components/exercises/StudentExerciseCard";
import { StudentExerciseListWrapper } from "@/components/exercises/StudentExerciseListWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Search, Filter, LayoutGrid, LayoutList, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useExercisesStage } from "../../hooks/useExercisesStage";

interface ExercisesStageProps {
  categoryId: string;
  typeId: string;
}

const ExercisesStage = ({ categoryId, typeId }: ExercisesStageProps) => {
  const deviceInfo = useDeviceInfo();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Use our custom hook for managing exercise state and operations
  const {
    isLoading,
    filteredExercises,
    selectedCategory,
    selectedExerciseIds,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    handleDeleteExercise,
    handleEditExercise,
    handleSubmit
  } = useExercisesStage({ categoryId, typeId });

  // Get categories for this type
  const typeCategories = selectedCategory ? [selectedCategory] : [];

  const toggleExerciseSelection = (id: number) => {
    // If already selected, remove, otherwise add
    if (selectedExerciseIds.includes(id)) {
      const newSelected = selectedExerciseIds.filter(exerciseId => exerciseId !== id);
      setViewMode(viewMode); // Pass the current viewMode to maintain it
    } else {
      const newSelected = [...selectedExerciseIds, id];
      setViewMode(viewMode); // Pass the current viewMode to maintain it
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <Input 
            placeholder="جستجو در تمرین‌ها..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={() => setSearchQuery("")}
          >
            {searchQuery && <div className="text-xs">×</div>}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10 border-primary/20" : ""}
          >
            <Filter size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortOrder}
          >
            {sortOrder === "asc" ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </Button>
          <div className="flex bg-secondary rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className={`h-8 w-8 ${viewMode === "grid" ? "" : "hover:bg-transparent hover:text-primary"}`}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className={`h-8 w-8 ${viewMode === "list" ? "" : "hover:bg-transparent hover:text-primary"}`}
            >
              <LayoutList size={16} />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <Card className="p-4 bg-secondary/30 border-secondary">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(null)}
                  className="text-xs"
                >
                  همه دسته‌بندی‌ها
                </Button>
                {typeCategories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id.toString())}
                    className="text-xs"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative min-h-0">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loading-spinner"></div>
            <span className="ml-2">در حال بارگذاری...</span>
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium mb-1">تمرینی یافت نشد</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {searchQuery 
                ? "تمرینی با معیارهای جستجوی شما یافت نشد. لطفاً معیارهای جستجو را تغییر دهید."
                : "هنوز تمرینی در این دسته‌بندی اضافه نشده است. تمرین جدید اضافه کنید."
              }
            </p>
          </div>
        ) : (
          <StudentExerciseListWrapper viewMode={viewMode}>
            {filteredExercises.map((exercise) => {
              // Find the category for this exercise
              const category = typeCategories.find((c) => c.id === exercise.categoryId);
              return (
                <StudentExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  category={category}
                  isSelected={selectedExerciseIds.includes(exercise.id)}
                  viewMode={viewMode}
                  onClick={() => toggleExerciseSelection(exercise.id)}
                  sets={3}
                  reps="8"
                />
              );
            })}
          </StudentExerciseListWrapper>
        )}
      </div>
    </div>
  );
};

export default ExercisesStage;
