
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "70vh"
}) => {
  return (
    <Card className={`border border-slate-200 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all ${className}`}>
      <ScrollArea className="pr-4" style={{ maxHeight }}>
        <div className="p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {children}
        </div>
      </ScrollArea>
    </Card>
  );
};
