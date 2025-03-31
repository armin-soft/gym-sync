
import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

export const AnimatedContainer = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className,
  ...props
}: AnimatedContainerProps) => {
  // Map direction to x and y values
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 20, x: 0 };
      case "down":
        return { y: -20, x: 0 };
      case "left":
        return { y: 0, x: 20 };
      case "right":
        return { y: 0, x: -20 };
      default:
        return { y: 20, x: 0 };
    }
  };

  const { x, y } = getDirectionOffset();

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
