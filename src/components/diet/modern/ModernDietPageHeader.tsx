
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
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between gap-6">
        
        {/* Header Content */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Utensils className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              برنامه‌های غذایی
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              مدیریت وعده‌های غذایی روزانه
            </p>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          onClick={onAddMeal} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-3"
        >
          <Plus className="w-5 h-5 ml-2" />
          افزودن وعده جدید
        </Button>
        
      </div>
    </motion.div>
  );
};
