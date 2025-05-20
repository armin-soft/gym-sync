
import React from "react";
import { Progress } from "@/components/ui/progress";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StudentProgressBarProps {
  progress: number;
}

export const StudentProgressBar: React.FC<StudentProgressBarProps> = ({ progress }) => {
  // Determine color based on progress
  const getProgressColor = () => {
    if (progress < 30) return "text-red-500 dark:text-red-400";
    if (progress < 70) return "text-amber-500 dark:text-amber-400";
    return "text-emerald-500 dark:text-emerald-400";
  };
  
  // Determine background color based on progress
  const getProgressBgColor = () => {
    if (progress < 30) return "bg-gradient-to-r from-red-500 to-red-400";
    if (progress < 70) return "bg-gradient-to-r from-amber-500 to-amber-400";
    return "bg-gradient-to-r from-emerald-500 to-emerald-400";
  };
  
  const variants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.3 }
    }
  };

  return (
    <div className="mb-3 mt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          پیشرفت برنامه
        </span>
        <span className={`text-xs font-bold ${getProgressColor()}`}>
          {toPersianNumbers(progress)}٪
        </span>
      </div>
      
      <div className="relative h-2 bg-slate-200/70 dark:bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className={`absolute top-0 left-0 h-full ${getProgressBgColor()} rounded-full`}
        />
        
        {/* Animated glow effect for loading */}
        {progress < 100 && (
          <motion.div
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 h-full w-20 bg-white/20 skew-x-12"
          />
        )}
        
        {/* Animated shine effect for completed progress */}
        {progress === 100 && (
          <motion.div
            animate={{
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white/30 rounded-full"
          />
        )}
      </div>
    </div>
  );
};
