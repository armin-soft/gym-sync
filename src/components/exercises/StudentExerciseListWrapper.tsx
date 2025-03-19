
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  viewMode?: "grid" | "list";
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "70vh",
  viewMode = "grid"
}) => {
  return (
    <Card className={cn(
      "border border-slate-200 rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all",
      className
    )}>
      <ScrollArea className="p-1 mx-auto" style={{ maxHeight }}>
        <div className={cn(
          "p-4 w-full", 
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4" 
            : "flex flex-col space-y-2"
        )}>
          {children}
        </div>
      </ScrollArea>
    </Card>
  );
};
