
import React from "react";
import { TabsList } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SortAsc, SortDesc, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DayTabTrigger from "./DayTabTrigger";

interface TabHeaderProps {
  activeTab: string;
  dayTabs: string[];
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

const TabHeader: React.FC<TabHeaderProps> = ({
  activeTab,
  dayTabs,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  viewMode,
  setViewMode,
  toggleSortOrder,
  sortOrder
}) => {
  const getSelectedCount = (day: string) => {
    switch (day) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      default: return 0;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-3 sm:mb-4">
      <TabsList className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-xl">
        {dayTabs.map((day, index) => (
          <DayTabTrigger
            key={day}
            value={day}
            active={activeTab === day}
            count={getSelectedCount(day)}
            dayNumber={index + 1}
          />
        ))}
      </TabsList>

      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-9 w-9 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm",
                )}
                onClick={toggleSortOrder}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: sortOrder === "asc" ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <SortDesc className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  )}
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sortOrder === "asc" ? "مرتب‌سازی صعودی" : "مرتب‌سازی نزولی"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-9 w-9 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm",
                )}
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? (
                  <Grid className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <List className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{viewMode === "grid" ? "نمایش لیستی" : "نمایش شبکه‌ای"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TabHeader;
