
import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  viewMode?: "grid" | "list";
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  maxHeight = "auto",
  className = "",
  viewMode = "grid"
}) => {
  return (
    <ScrollArea
      className={cn(
        "flex-1 overflow-auto",
        className
      )}
      style={{ maxHeight }}
    >
      <div
        className={cn(
          "w-full", 
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4" 
            : "flex flex-col space-y-4 p-4"
        )}
      >
        {children}
      </div>
    </ScrollArea>
  );
};

export default StudentExerciseListWrapper;
