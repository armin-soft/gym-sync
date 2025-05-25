
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getMealTypeIcon, getMealTypeStyle } from "../MealTypeUtils";
import type { MealType } from "@/types/meal";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface ModernMealTypeHeaderProps {
  type: MealType;
  count: number;
}

export const ModernMealTypeHeader = ({ type, count }: ModernMealTypeHeaderProps) => {
  const styles = getMealTypeStyle(type);
  
  return (
    <div className="relative p-6 bg-gradient-to-r from-white/80 via-white/60 to-white/40 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/40 border-b border-white/30 dark:border-gray-700/30 backdrop-blur-sm">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-violet-500/5"></div>
      
      <div className="relative flex items-center gap-4 justify-between">
        
        {/* Left side - Icon and Title */}
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ 
              rotate: [0, -5, 5, -5, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm",
              "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-200/50 dark:border-emerald-700/50"
            )}
          >
            <div className="text-emerald-600 dark:text-emerald-400 scale-125">
              {getMealTypeIcon(type)}
            </div>
          </motion.div>
          
          <div className="text-right">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {type}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {toPersianNumbers(count)} وعده غذایی
            </p>
          </div>
        </div>
        
        {/* Right side - Count Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge 
            variant="outline" 
            className={cn(
              "text-base font-bold px-4 py-2 rounded-xl shadow-md backdrop-blur-sm",
              "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30",
              "border-emerald-200/50 dark:border-emerald-700/50",
              "text-emerald-700 dark:text-emerald-300"
            )}
          >
            {toPersianNumbers(count)} مورد
          </Badge>
        </motion.div>
        
      </div>
    </div>
  );
};
