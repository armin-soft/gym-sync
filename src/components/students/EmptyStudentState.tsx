
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, UserRound, UsersRound, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export interface EmptyStudentStateProps {
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
        className="flex flex-col items-center justify-center text-center space-y-6 py-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="relative">
          <div className="absolute inset-0 bg-amber-500/5 animate-ping rounded-full opacity-75" />
          <div className="relative flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-400/20 to-amber-600/20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-400/30 to-amber-600/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <XCircle className="h-9 w-9 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={item} className="space-y-3 max-w-md">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            نتیجه‌ای یافت نشد
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            با معیارهای جستجوی فعلی هیچ شاگردی پیدا نشد. لطفاً معیارهای جستجو را تغییر دهید.
          </p>
        </motion.div>
        <motion.div variants={item}>
          <Button
            variant="outline"
            onClick={onClearSearch}
            className="px-6 py-2 h-14 rounded-full border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow gap-2"
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
      className="flex flex-col items-center justify-center text-center space-y-8 py-16"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="relative">
        <div className="absolute inset-0 bg-indigo-500/5 animate-pulse rounded-full opacity-75" />
        <div className="relative flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400/30 to-indigo-600/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <UsersRound className="h-9 w-9 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div variants={item} className="space-y-4 max-w-md">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
          هیچ شاگردی یافت نشد
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          برای شروع، اولین شاگرد خود را اضافه کنید
        </p>
      </motion.div>
      <motion.div 
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onAddStudent}
          className="px-8 py-7 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/25 text-lg font-medium relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          <div className="relative flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            افزودن شاگرد جدید
          </div>
        </Button>
      </motion.div>
    </motion.div>
  );
};
