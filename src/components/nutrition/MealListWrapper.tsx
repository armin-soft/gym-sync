
import React from "react";
import { cn } from "@/lib/utils";

interface MealListWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  viewMode?: "grid" | "list";
}

export const MealListWrapper: React.FC<MealListWrapperProps> = ({
  children,
  maxHeight = "600px",
  className,
  viewMode = "grid"
}) => {
  return (
    <div 
      className={cn(
        "overflow-y-auto overflow-x-hidden scrollbar-thin",
        className
      )}
      style={{ maxHeight }}
    >
      <div 
        className={cn(
          "p-3",
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" 
            : "flex flex-col space-y-2"
        )}
      >
        {children}
      </div>
    </div>
  );
};
