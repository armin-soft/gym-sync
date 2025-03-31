
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StudentAvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withBorder?: boolean;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  name,
  image,
  size = "md",
  className,
  withBorder = true,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-20 w-20 text-lg",
  };
  
  const borderClasses = withBorder 
    ? "border-2 border-white dark:border-gray-800 shadow-sm" 
    : "";

  // Get first character for fallback or first characters of each word
  const getFallbackText = () => {
    const words = name.split(" ");
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Avatar className={cn(
        sizeClasses[size],
        borderClasses,
        className
      )}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-semibold">
          {getFallbackText()}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};
