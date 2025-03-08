
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({ 
  children,
  maxHeight = "calc(70vh - 230px)",
  className
}) => {
  return (
    <ScrollArea 
      className={cn("w-full rounded-lg border border-border/50 bg-background/30 backdrop-blur-sm p-1", className)} 
      style={{ maxHeight }}
    >
      <div className="p-2">
        {children}
      </div>
    </ScrollArea>
  );
};

export default StudentExerciseListWrapper;
