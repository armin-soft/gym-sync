
import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedContainer } from "./animated-container";

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover" | "active" | "elevated";
  noBorder?: boolean;
  delay?: number;
}

export const GlassmorphicCard = ({
  children,
  className,
  variant = "default",
  noBorder = false,
  delay = 0,
  ...props
}: GlassmorphicCardProps) => {
  const baseStyles = "backdrop-blur-xl transition-all duration-300";
  
  const variantStyles = {
    default: "bg-white/85 dark:bg-slate-900/85",
    hover: "bg-white/90 dark:bg-slate-900/90 hover:shadow-xl hover:-translate-y-1",
    active: "bg-gradient-to-br from-white/95 to-white/85 dark:from-slate-900/95 dark:to-slate-900/85 hover:shadow-lg",
    elevated: "bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-900/70 shadow-xl",
  };
  
  const borderStyles = noBorder 
    ? "" 
    : "border border-white/20 dark:border-slate-700/30";

  return (
    <AnimatedContainer 
      delay={delay} 
      className={cn(
        baseStyles,
        variantStyles[variant],
        borderStyles,
        "rounded-2xl",
        className
      )} 
      {...props}
    >
      {children}
    </AnimatedContainer>
  );
};
