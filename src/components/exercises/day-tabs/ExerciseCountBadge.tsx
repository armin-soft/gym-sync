
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface ExerciseCountBadgeProps {
  count: number;
}

export const ExerciseCountBadge: React.FC<ExerciseCountBadgeProps> = ({ count }) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 border border-indigo-100 dark:border-indigo-900",
        deviceInfo.isMobile ? "text-xs" : "text-sm"
      )}
    >
      <Dumbbell className={cn(
        "text-indigo-600 dark:text-indigo-400",
        deviceInfo.isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
      )} />
      <span className="font-medium text-indigo-700 dark:text-indigo-300">
        {count} تمرین انتخاب شده
      </span>
    </motion.div>
  );
};

export default ExerciseCountBadge;
