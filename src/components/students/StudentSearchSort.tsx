
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { StudentSearchSortProps } from "./search-sort/StudentSearchSortTypes";
import { StudentSearch } from "./search-sort/StudentSearch";
import { StudentSort } from "./search-sort/StudentSort";
import { StudentFilters } from "./search-sort/StudentFilters";

export const StudentSearchSort = ({
  searchQuery,
  setSearchQuery,
  sortField,
  sortOrder,
  toggleSort,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategory,
  setSelectedCategory,
  exerciseTypes,
  categories,
  showExerciseFilters = false,
}: StudentSearchSortProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 p-1.5">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <StudentSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          
          <div className="flex items-center gap-2 ms-auto flex-wrap">
            {showExerciseFilters && selectedExerciseType !== undefined && exerciseTypes && categories && (
              <StudentFilters 
                selectedExerciseType={selectedExerciseType}
                setSelectedExerciseType={setSelectedExerciseType!}
                selectedCategory={selectedCategory!}
                setSelectedCategory={setSelectedCategory!}
                exerciseTypes={exerciseTypes}
                categories={categories}
              />
            )}
            
            <StudentSort 
              sortField={sortField}
              sortOrder={sortOrder}
              toggleSort={toggleSort}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
