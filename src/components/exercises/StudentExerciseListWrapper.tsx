
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
}

const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({ 
  children,
  maxHeight = "calc(70vh - 200px)" 
}) => {
  return (
    <ScrollArea className="w-full" style={{ maxHeight }}>
      {children}
    </ScrollArea>
  );
};

export default StudentExerciseListWrapper;
