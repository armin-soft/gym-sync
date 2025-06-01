
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";

interface ModernSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export const ModernSearchBar: React.FC<ModernSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-6"
    >
      <Card className="p-1 bg-gradient-to-l from-white via-gray-50/50 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 border-gray-200/60 dark:border-slate-700/60 shadow-md">
        <div className="relative flex items-center">
          
          {/* Search Icon */}
          <div className="absolute right-4 text-gray-400 dark:text-gray-500">
            <Search className="h-5 w-5" />
          </div>
          
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجوی شاگردان بر اساس نام، شماره تلفن و..."
            className="w-full pr-12 pl-4 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-lg"
          />
          
          {/* Clear Button */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute left-4"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearSearch}
                className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
