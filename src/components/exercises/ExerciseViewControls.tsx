
import React from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, Grid3X3, ArrowDownUp, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExerciseViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const ExerciseViewControls: React.FC<ExerciseViewControlsProps> = ({
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSortOrder}
              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50"
            >
              {sortOrder === "asc" ? (
                <ArrowDownUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <ArrowUpDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gray-900 text-white dark:bg-black border-gray-800 text-xs p-2">
            {sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-0.5">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-7 rounded-full px-2.5 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
                }`}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-7 rounded-full px-2.5 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-700/70"
                }`}
              >
                <ListFilter className="h-3.5 w-3.5" />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gray-900 text-white dark:bg-black border-gray-800 text-xs p-2">
            تغییر نمایش
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
};

export default ExerciseViewControls;
