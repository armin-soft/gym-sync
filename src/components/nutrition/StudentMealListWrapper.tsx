
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StudentMealListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
}

const StudentMealListWrapper: React.FC<StudentMealListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "calc(100vh - 280px)",
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  return (
    <div className={cn("border-0 rounded-none bg-white/95 backdrop-blur-sm transition-all text-gray-900 dark:text-white overflow-hidden h-full w-full", className)}>
      {showControls && (
        <div className="flex items-center justify-end gap-2 p-3 bg-muted/20 border-b">
          {/* Sort button removed */}
        </div>
      )}
      <ScrollArea 
        className="w-full h-full" 
        style={{ maxHeight }}
        orientation="both"
      >
        <motion.div 
          layout 
          className="p-4 w-full flex flex-col space-y-3"
        >
          {children}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default StudentMealListWrapper;
