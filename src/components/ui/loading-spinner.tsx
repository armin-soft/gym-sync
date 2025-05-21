
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md",
  className 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-16 w-16 border-4"
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "rounded-full border-t-transparent animate-spin",
          sizeClasses[size],
          size === "sm" ? "border-slate-600" : "border-primary",
          className
        )}
      />
      {size === "lg" && (
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          در حال بارگذاری...
        </p>
      )}
    </div>
  );
};
