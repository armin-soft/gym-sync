
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc, Filter } from "lucide-react";
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
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-white/80 via-white/90 to-gray-50/80 dark:from-gray-900/80 dark:via-gray-900/90 dark:to-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-xl shadow-xl shadow-gray-500/10 p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        
        {/* Search */}
        <div className="flex-1 relative order-1">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
            <Input 
              placeholder="جستجو در وعده‌های غذایی..." 
              className="pr-12 pl-4 h-12 text-right text-base border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300"
              value={searchQuery} 
              onChange={e => onSearchChange(e.target.value)} 
            />
          </div>
        </div>
        
        {/* Results Count & Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-4 order-2">
          {/* Results Count */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 px-4 py-2 rounded-lg text-right border border-blue-200/30 dark:border-blue-700/30"
          >
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {toPersianNumbers(mealsCount)} وعده غذایی
            </span>
          </motion.div>
          
          {/* Sort Button */}
          <Button
            variant="outline"
            onClick={onSortOrderChange}
            className="px-4 py-3 h-12 text-base border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700/80 rounded-xl transition-all duration-300"
            size="sm"
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-5 w-5 ml-2" />
            ) : (
              <SortDesc className="h-5 w-5 ml-2" />
            )}
            <span className="hidden sm:inline font-medium">مرتب‌سازی</span>
            <span className="sm:hidden font-medium">مرتب</span>
          </Button>
        </div>
        
      </div>
    </motion.div>
  );
};
