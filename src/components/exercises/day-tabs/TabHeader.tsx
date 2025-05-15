
import React from "react";
import { TabsList } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid, List, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";
import DayTabTrigger from "./DayTabTrigger";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const deviceInfo = useDeviceInfo();
  
  const getSelectedCount = (tabId: string) => {
    switch(tabId) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      default: return 0;
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-3 mb-4",
      deviceInfo.isMobile ? "flex-col" : "flex-row justify-between"
    )}>
      <TabsList className={cn(
        "bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm h-12",
        deviceInfo.isMobile ? "w-full" : ""
      )}>
        {dayTabs.map((tabId) => (
          <DayTabTrigger
            key={tabId}
            tabId={tabId}
            count={getSelectedCount(tabId)}
            isActive={activeTab === tabId}
          />
        ))}
      </TabsList>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSortOrder}
          className="h-9 w-9 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm"
        >
          {sortOrder === "asc" ? (
            <SortAsc className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <SortDesc className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </Button>
        
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md flex items-center p-1 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={cn(
              "h-7 px-2 rounded",
              viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""
            )}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={cn(
              "h-7 px-2 rounded",
              viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""
            )}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TabHeader;
