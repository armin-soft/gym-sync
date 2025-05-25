
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ModernDietPageHeaderProps {
  onAddMeal: () => void;
}

export const ModernDietPageHeader = ({ onAddMeal }: ModernDietPageHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-white/90 via-white/95 to-blue-50/90 dark:from-gray-900/90 dark:via-gray-900/95 dark:to-blue-950/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl shadow-blue-500/10"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-xl" />
      
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Header Content */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="relative"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Utensils className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </motion.div>
            </motion.div>
            
            <div className="text-right flex-1">
              <motion.h1 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
              >
                برنامه‌های غذایی پیشرفته
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2 font-medium"
              >
                مدیریت هوشمند و حرفه‌ای وعده‌های غذایی روزانه
              </motion.p>
            </div>
          </div>
          
          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button 
              onClick={onAddMeal} 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              افزودن وعده جدید
            </Button>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
};
