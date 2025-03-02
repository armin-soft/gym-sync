
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, UserRound } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStudentStateProps {
  isSearching: boolean;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const EmptyStudentState = ({ 
  isSearching, 
  onAddStudent, 
  onClearSearch 
}: EmptyStudentStateProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isSearching) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center text-center space-y-6 py-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="relative w-20 h-20">
          <div className="absolute inset-0 bg-amber-500/10 animate-ping rounded-full opacity-75" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 bg-opacity-20 flex items-center justify-center">
            <Search className="h-10 w-10 text-amber-500" />
          </div>
        </motion.div>
        <motion.div variants={item} className="space-y-3">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            نتیجه‌ای یافت نشد
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            با معیارهای جستجوی فعلی هیچ شاگردی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <Button
            variant="outline"
            onClick={onClearSearch}
            className="px-6 py-2 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 transition-all duration-300 shadow-sm hover:shadow gap-2"
          >
            <Search className="h-4 w-4 mr-2" />
            پاک کردن جستجو
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center space-y-6 py-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="relative w-24 h-24">
        <div className="absolute inset-0 bg-indigo-500/10 animate-pulse rounded-full opacity-75" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 bg-opacity-20 flex items-center justify-center">
          <UserRound className="h-12 w-12 text-indigo-500" />
        </div>
      </motion.div>
      <motion.div variants={item} className="space-y-3">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
          هیچ شاگردی یافت نشد
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          برای افزودن شاگرد جدید روی دکمه «افزودن شاگرد جدید» کلیک کنید
        </p>
      </motion.div>
      <motion.div variants={item}>
        <Button
          onClick={onAddStudent}
          className="px-6 py-6 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1 gap-2"
        >
          <Plus className="h-5 w-5 mr-2" />
          افزودن شاگرد جدید
        </Button>
      </motion.div>
    </motion.div>
  );
};
