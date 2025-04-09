
import React from "react";
import { Weight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppIconProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

export const AppIcon = ({ 
  size = "md", 
  className, 
  animated = false 
}: AppIconProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-full bg-primary/10 p-2",
      size === "sm" ? "p-1.5" : size === "md" ? "p-2" : size === "lg" ? "p-3" : "p-4",
      className
    )}>
      <Weight className={cn(
        sizeClasses[size],
        "text-primary",
        animated && "animate-pulse"
      )} />
    </div>
  );
};
