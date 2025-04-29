
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, LayoutGrid, LayoutList } from "lucide-react";
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
  sortOrder
}) => {
  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex rounded-md overflow-hidden border shadow-sm bg-white"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-none ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">نمایش گرید</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-none ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">نمایش لیست</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-none"
              onClick={toggleSortOrder}
            >
              {sortOrder === "asc" ? <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{sortOrder === "asc" ? "مرتب‌سازی نزولی" : "مرتب‌سازی صعودی"}</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  );
};

export default ExerciseViewControls;
