
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface ActiveFilterTagsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
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
  handleClearSearch
}) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="mt-3 flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        {searchQuery && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="px-2 py-1 flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/15 transition-all duration-300"
            >
              <span className="text-xs">جستجو: {searchQuery}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 rounded-full p-0 hover:bg-primary/20" 
                onClick={() => setSearchQuery("")}
              >
                <X className="h-2.5 w-2.5" />
                <span className="sr-only">حذف جستجو</span>
              </Button>
            </Badge>
          </motion.div>
        )}
        
        {selectedExerciseType && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="px-2 py-1 flex items-center gap-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/15 transition-all duration-300"
            >
              <span className="text-xs">نوع: {selectedExerciseType}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 rounded-full p-0 hover:bg-indigo-500/20" 
                onClick={() => setSelectedExerciseType("")}
              >
                <X className="h-2.5 w-2.5" />
                <span className="sr-only">حذف نوع</span>
              </Button>
            </Badge>
          </motion.div>
        )}
        
        {selectedCategoryId && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="px-2 py-1 flex items-center gap-1.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/15 transition-all duration-300"
            >
              <span className="text-xs">دسته‌بندی: {categories.find((c) => c.id === selectedCategoryId)?.name}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 rounded-full p-0 hover:bg-violet-500/20" 
                onClick={() => setSelectedCategoryId(null)}
              >
                <X className="h-2.5 w-2.5" />
                <span className="sr-only">حذف دسته‌بندی</span>
              </Button>
            </Badge>
          </motion.div>
        )}
        
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="h-6 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <X className="h-3 w-3 mr-1" />
              پاک کردن همه
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
