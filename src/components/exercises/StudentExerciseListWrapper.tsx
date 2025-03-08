
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
  maxHeight = "400px"
}) => {
  return (
    <ScrollArea className={`${className} pr-4`} style={{ maxHeight }}>
      <div className="w-full">{children}</div>
    </ScrollArea>
  );
};
