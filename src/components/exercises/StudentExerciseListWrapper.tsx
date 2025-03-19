
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  fullScreen?: boolean;
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "60vh",
  fullScreen = false
}) => {
  return (
    <Card className={`border border-slate-100 bg-white/80 backdrop-blur-sm ${fullScreen ? "h-full" : ""}`}>
      <ScrollArea 
        className={`${className} pr-4`} 
        style={{ maxHeight: fullScreen ? "100%" : maxHeight }}
      >
        <div className="p-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {children}
        </div>
      </ScrollArea>
    </Card>
  );
};
