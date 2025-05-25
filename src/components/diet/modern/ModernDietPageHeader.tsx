
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Utensils, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernDietPageHeaderProps {
  onAddMeal: () => void;
}

export const ModernDietPageHeader = ({ onAddMeal }: ModernDietPageHeaderProps) => {
  return (
    <div className="relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-violet-500/10 rounded-3xl blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl shadow-blue-500/10"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Header Content */}
          <div className="flex items-center gap-6">
            {/* Icon Container */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Utensils className="w-10 h-10 text-white" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-yellow-900" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Title and Description */}
            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-700 dark:from-white dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent"
              >
                برنامه‌های غذایی هوشمند
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 dark:text-gray-300 font-medium max-w-2xl"
              >
                طراحی و مدیریت برنامه‌های تغذیه تخصصی با رویکرد علمی و مدرن
              </motion.p>
              
              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 mt-4"
              >
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                    {toPersianNumbers(25)}+ وعده متنوع
                  </span>
                </div>
                
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    هفت روز هفته
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              onClick={onAddMeal} 
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl shadow-emerald-500/25 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              
              <div className="relative flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="w-6 h-6" />
                </motion.div>
                <span>افزودن وعده جدید</span>
              </div>
            </Button>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
};
