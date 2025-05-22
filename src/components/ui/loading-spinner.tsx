
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md",
  className,
  text
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-16 w-16 border-4"
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2
        className={cn(
          "animate-spin",
          sizeClasses[size],
          size === "sm" ? "text-slate-600" : "text-primary",
          className
        )}
      />
      {(text || size === "lg") && (
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          {text || "در حال بارگذاری..."}
        </p>
      )}
    </div>
  );
};
