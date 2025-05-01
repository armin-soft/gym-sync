
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ActiveFilterTagsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  categories: any[];
  activeFilterCount: number;
  handleClearSearch: () => void;
}

export const ActiveFilterTags: React.FC<ActiveFilterTagsProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
  activeFilterCount,
  handleClearSearch,
}) => {
  if (activeFilterCount === 0) return null;

  const getCategoryName = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    return category?.name || "دسته‌بندی";
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      {selectedExerciseType && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs text-indigo-700"
        >
          <span className="ml-1">نوع:</span>
          <span>{selectedExerciseType}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-1 p-0 hover:bg-indigo-100"
            onClick={() => setSelectedExerciseType(null)}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </motion.div>
      )}

      {selectedCategoryId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700"
        >
          <span className="ml-1">دسته‌بندی:</span>
          <span>{getCategoryName(selectedCategoryId)}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-1 p-0 hover:bg-purple-100"
            onClick={() => setSelectedCategoryId(null)}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </motion.div>
      )}

      {searchQuery && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
        >
          <span className="ml-1">جستجو:</span>
          <span>{searchQuery}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 ml-1 p-0 hover:bg-blue-100"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        </motion.div>
      )}

      {activeFilterCount > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearSearch}
          className="text-xs h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          پاک کردن همه
        </Button>
      )}
    </motion.div>
  );
};
