
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: () => void;
  mealsCount: number;
}

export const ModernSearchAndFilters = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  mealsCount
}: ModernSearchAndFiltersProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-3 sm:p-4 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        
        {/* Search */}
        <div className="flex-1 relative order-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="جستجو در وعده‌های غذایی..." 
            className="pr-10 text-right text-sm sm:text-base"
            value={searchQuery} 
            onChange={e => onSearchChange(e.target.value)} 
          />
        </div>
        
        {/* Results Count & Sort - Flex container for responsive layout */}
        <div className="flex items-center justify-between sm:justify-end gap-3 order-2">
          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
            {toPersianNumbers(mealsCount)} وعده
          </div>
          
          {/* Sort Button */}
          <Button
            variant="outline"
            onClick={onSortOrderChange}
            className="px-3 sm:px-4 text-sm"
            size="sm"
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4 ml-1 sm:ml-2" />
            ) : (
              <SortDesc className="h-4 w-4 ml-1 sm:ml-2" />
            )}
            <span className="hidden sm:inline">مرتب‌سازی</span>
            <span className="sm:hidden">مرتب</span>
          </Button>
        </div>
        
      </div>
    </motion.div>
  );
};
