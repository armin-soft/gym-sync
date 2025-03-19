
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
      "border border-slate-200 rounded-xl bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-all",
      className
    )}>
      <ScrollArea className="w-full overflow-auto" style={{ maxHeight }}>
        <div className="p-4 w-full flex flex-col space-y-4">
          {children}
        </div>
      </ScrollArea>
    </Card>
  );
};
