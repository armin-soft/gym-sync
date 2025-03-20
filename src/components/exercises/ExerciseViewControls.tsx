
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Grid, List } from "lucide-react";
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
              className={`h-8 w-8 p-0 rounded-none ${viewMode === "grid" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
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
              className={`h-8 w-8 p-0 rounded-none ${viewMode === "list" ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
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
              className="h-8 w-8 p-0 rounded-none"
              onClick={toggleSortOrder}
            >
              {sortOrder === "asc" ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
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
