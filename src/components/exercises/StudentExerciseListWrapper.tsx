
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExerciseViewControls } from "./ExerciseViewControls";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  maxHeight = "100%",
  viewMode = "list",
  setViewMode,
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  const isMobile = useIsMobile();
  const calculatedMaxHeight = isMobile ? "calc(100vh - 180px)" : "calc(100vh - 120px)";

  return (
    <Card className={cn(
      "border border-slate-200 rounded-xl bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all text-gray-900 dark:text-white h-full w-full",
      className
    )}>
      {showControls && setViewMode && toggleSortOrder && (
        <div className="p-2 border-b">
          <ExerciseViewControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
          />
        </div>
      )}
      <ScrollArea className="w-full overflow-auto" style={{ height: calculatedMaxHeight }}>
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
