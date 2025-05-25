
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SortAsc, SortDesc, Filter, BarChart3 } from "lucide-react";
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
      className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-6 shadow-xl shadow-blue-500/5"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
        
        {/* Search Section */}
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" />
            <Input 
              placeholder="جستجو در وعده‌های غذایی، مواد غذایی، کالری..." 
              className="pr-12 pl-4 h-14 text-lg bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all duration-300 text-right font-medium placeholder:text-gray-400"
              value={searchQuery} 
              onChange={e => onSearchChange(e.target.value)} 
            />
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-3">
          
          {/* Results Count */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-4 py-3 rounded-xl border border-blue-200/50 dark:border-blue-700/30"
          >
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              {toPersianNumbers(mealsCount)} وعده
            </span>
          </motion.div>
          
          {/* Sort Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-6 bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-600/50 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 rounded-xl transition-all duration-300 group"
              onClick={onSortOrderChange}
            >
              <motion.div
                animate={{ rotate: sortOrder === "asc" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <SortDesc className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                )}
              </motion.div>
              <span className="mr-2 font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                مرتب‌سازی
              </span>
            </Button>
          </motion.div>
          
          {/* Filter Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-6 bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-600/50 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 dark:hover:from-violet-900/20 dark:hover:to-purple-900/20 rounded-xl transition-all duration-300 group"
            >
              <Filter className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <span className="mr-2 font-medium text-gray-700 dark:text-gray-300 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                فیلتر
              </span>
            </Button>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
};
