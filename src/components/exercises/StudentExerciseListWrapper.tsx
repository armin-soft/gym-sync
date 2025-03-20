
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExerciseViewControls } from "./ExerciseViewControls";
import { motion } from "framer-motion";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "70vh",
  viewMode = "list",
  setViewMode,
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  return (
    <Card className={cn(
      "border border-slate-200 dark:border-slate-800 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all text-gray-900 dark:text-white relative overflow-hidden group",
      className
    )}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500/50 via-blue-500/50 to-indigo-500/50 opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      {showControls && setViewMode && toggleSortOrder && (
        <div className="p-2 border-b border-slate-200 dark:border-slate-800 relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <ExerciseViewControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
          />
        </div>
      )}
      <ScrollArea className="w-full overflow-auto relative z-10" style={{ maxHeight }}>
        <motion.div
          layout
          className={cn(
            "p-4 w-full", 
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" 
              : "flex flex-col space-y-3"
          )}
        >
          {children}
        </motion.div>
      </ScrollArea>
    </Card>
  );
};

export default StudentExerciseListWrapper;
