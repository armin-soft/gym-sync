
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils } from "lucide-react";
import { motion } from "framer-motion";

interface ModernDietPageHeaderProps {
  onAddMeal: () => void;
}

export const ModernDietPageHeader = ({ onAddMeal }: ModernDietPageHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        
        {/* Header Content */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          
          <div className="text-right flex-1 sm:flex-initial">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              برنامه‌های غذایی
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              مدیریت وعده‌های غذایی روزانه
            </p>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          onClick={onAddMeal} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          افزودن وعده جدید
        </Button>
        
      </div>
    </motion.div>
  );
};
