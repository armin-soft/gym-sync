
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, Search, RefreshCw } from "lucide-react";

interface StudentEmptyStateProps {
  searchQuery: string;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const StudentEmptyState = ({ 
  searchQuery, 
  onAddStudent, 
  onClearSearch 
}: StudentEmptyStateProps) => {
  // Different content based on if it's a search result or empty state
  const isSearchResult = searchQuery.trim().length > 0;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-10">
      <motion.div 
        className="max-w-md w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isSearchResult ? (
          // Search with no results found
          <>
            <motion.div variants={childVariants} className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 rounded-full shadow-inner border border-indigo-100 dark:border-indigo-900/50">
                <Search className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
              </div>
            </motion.div>
            <motion.h3 variants={childVariants} className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              نتیجه‌ای یافت نشد
            </motion.h3>
            <motion.p variants={childVariants} className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              هیچ شاگردی با عبارت "<span className="font-bold text-gray-700 dark:text-gray-300">{searchQuery}</span>" پیدا نشد.
            </motion.p>
            <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="outline" onClick={onClearSearch} className="gap-2 min-w-[120px]">
                <RefreshCw className="h-4 w-4" />
                پاک کردن جستجو
              </Button>
              <Button onClick={onAddStudent} className="gap-2 min-w-[120px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20">
                <UserPlus className="h-4 w-4" />
                افزودن شاگرد
              </Button>
            </motion.div>
          </>
        ) : (
          // Empty state, no students
          <>
            <motion.div variants={childVariants} className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl"></div>
              <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/40 dark:to-violet-900/40 rounded-full shadow-inner border border-indigo-100 dark:border-indigo-900/50">
                <Users className="h-10 w-10 text-indigo-500 dark:text-indigo-400" />
              </div>
              
              {/* Animated circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute inset-0 rounded-full border border-indigo-200 dark:border-indigo-800"
                  animate={{ 
                    scale: [1, 1.5, 1], 
                    opacity: [0.5, 0, 0.5] 
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.7,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
            <motion.h3 variants={childVariants} className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              شاگردی یافت نشد
            </motion.h3>
            <motion.p variants={childVariants} className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-[260px] mx-auto">
              هنوز هیچ شاگردی در سیستم ثبت نشده است. برای شروع، اولین شاگرد خود را اضافه کنید.
            </motion.p>
            <motion.div variants={childVariants}>
              <Button 
                onClick={onAddStudent}
                size="lg"
                className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-500/20 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <UserPlus className="h-5 w-5 relative z-10" />
                <span className="relative z-10">افزودن شاگرد جدید</span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};
