
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StudentMealListWrapperProps {
  children: React.ReactNode;
  className?: string;
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
}

const StudentMealListWrapper: React.FC<StudentMealListWrapperProps> = ({
  children,
  className = "",
  viewMode = "list",
  setViewMode,
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  return (
    <Card className={cn(
      "border border-slate-200 rounded-xl bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all text-gray-900 dark:text-white",
      className
    )}>
      <ScrollArea className="w-full overflow-auto">
        <motion.div
          layout
          className={cn(
            "p-4 w-full", 
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" 
              : "flex flex-col space-y-3"
          )}
          dir="rtl" // Ensure right-to-left direction
        >
          {children}
        </motion.div>
      </ScrollArea>
    </Card>
  );
};

export default StudentMealListWrapper;
