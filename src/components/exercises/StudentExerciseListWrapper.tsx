
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <Card className={cn(
      "border border-slate-200 rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all",
      className
    )}>
      <ScrollArea className="p-1 mx-auto" style={{ maxHeight }}>
        <div className="p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {children}
        </div>
      </ScrollArea>
    </Card>
  );
};
