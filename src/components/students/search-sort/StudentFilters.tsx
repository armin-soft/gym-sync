
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  StudentFiltersProps, 
  ExerciseTypeFilterProps, 
  CategoryFilterProps 
} from "./StudentSearchSortTypes";
import { cn } from "@/lib/utils";

// Exercise Type Filter Component
export const ExerciseTypeFilter = ({
  selectedExerciseType,
  setSelectedExerciseType,
  exerciseTypes,
}: ExerciseTypeFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "h-full md:w-auto gap-2 py-2.5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-gray-900",
            selectedExerciseType && "border-indigo-500 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
          )}
        >
          <Filter className="h-4 w-4" />
          <span className="font-medium">نوع تمرین</span>
          {selectedExerciseType && (
            <span className="flex items-center gap-1 text-xs bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
              {selectedExerciseType}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => setSelectedExerciseType(null)}
          className="gap-2 font-medium"
        >
          همه انواع تمرین
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {exerciseTypes && exerciseTypes.map((type: any) => (
          <DropdownMenuItem 
            key={type.id}
            onClick={() => setSelectedExerciseType(type.name)}
            className={`gap-2 ${selectedExerciseType === type.name ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
          >
            {type.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Category Filter Component
export const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedExerciseType,
}: CategoryFilterProps) => {
  // فیلتر کردن دسته‌بندی‌ها بر اساس نوع تمرین انتخاب شده
  const filteredCategories = useMemo(() => {
    if (!selectedExerciseType) return categories;
    
    return categories.filter((cat: any) => cat.type === selectedExerciseType);
  }, [categories, selectedExerciseType]);

  if (!selectedExerciseType) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "h-full md:w-auto gap-2 py-2.5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-gray-900",
            selectedCategory && "border-indigo-500 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
          )}
        >
          <Filter className="h-4 w-4" />
          <span className="font-medium">دسته‌بندی</span>
          {selectedCategory && (
            <span className="flex items-center gap-1 text-xs bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
              {filteredCategories.find((cat: any) => cat.id === selectedCategory)?.name || ""}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => setSelectedCategory(null)}
          className="gap-2 font-medium"
        >
          همه دسته‌بندی‌ها
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {filteredCategories.map((category: any) => (
          <DropdownMenuItem 
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`gap-2 ${selectedCategory === category.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
          >
            {category.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Main Filters Component
export const StudentFilters = ({
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategory,
  setSelectedCategory,
  exerciseTypes,
  categories,
}: StudentFiltersProps) => {
  return (
    <div className="flex items-center gap-2">
      <ExerciseTypeFilter 
        selectedExerciseType={selectedExerciseType}
        setSelectedExerciseType={setSelectedExerciseType}
        exerciseTypes={exerciseTypes}
      />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        selectedExerciseType={selectedExerciseType}
      />
    </div>
  );
};
