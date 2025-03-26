
import React from "react";
import { motion } from "framer-motion";
import { StudentSearch } from "./search-sort/StudentSearch";
import { StudentSort } from "./search-sort/StudentSort";
import { StudentSearchSortProps } from "./search-sort/StudentSearchSortTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

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
  exerciseTypes = [],
  categories = [],
  showExerciseFilters = false,
}: StudentSearchSortProps) => {
  // فیلتر شده بر اساس نوع انتخاب شده
  const filteredCategories = categories.filter(
    (cat) => !selectedExerciseType || cat.type === selectedExerciseType
  );

  const clearFilters = () => {
    if (setSelectedExerciseType) setSelectedExerciseType(null);
    if (setSelectedCategory) setSelectedCategory(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid sm:grid-cols-[1fr_auto] gap-4"
    >
      <StudentSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="flex flex-col sm:flex-row gap-2">
        {showExerciseFilters && (
          <div className="flex flex-wrap gap-2">
            {exerciseTypes && exerciseTypes.length > 0 && setSelectedExerciseType && (
              <Select
                value={selectedExerciseType || "all_types"}
                onValueChange={(value) => setSelectedExerciseType(value === "all_types" ? null : value)}
              >
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="نوع تمرین" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_types">همه انواع</SelectItem>
                  {exerciseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {filteredCategories.length > 0 && setSelectedCategory && (
              <Select
                value={selectedCategory?.toString() || "all_categories"}
                onValueChange={(value) => setSelectedCategory(value === "all_categories" ? null : parseInt(value))}
              >
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_categories">همه دسته‌ها</SelectItem>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {(selectedExerciseType || selectedCategory) && (
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={clearFilters}
              >
                <X className="mr-1 h-4 w-4" />
                پاک کردن
              </Button>
            )}
          </div>
        )}
        
        <StudentSort
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
        />
      </div>
    </motion.div>
  );
};
