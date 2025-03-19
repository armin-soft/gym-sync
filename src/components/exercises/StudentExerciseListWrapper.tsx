
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "60vh"
}) => {
  return (
    <ScrollArea className={`${className} pr-4`} style={{ maxHeight }}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {children}
      </div>
    </ScrollArea>
  );
};
