
import React from "react";
import { History, Trash, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface HistoryHeaderProps {
  entriesCount: number;
  isHistoryEmpty: boolean;
  onClearHistory: () => void;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({
  entriesCount,
  isHistoryEmpty,
  onClearHistory
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-2xl blur-sm" />
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20">
            <History className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </motion.div>
        
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 dark:from-emerald-400 dark:via-sky-400 dark:to-emerald-500 bg-clip-text text-transparent"
          >
            تاریخچه فعالیت‌ها
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300" style={{ direction: 'rtl' }}>
                {toPersianNumbers(entriesCount)} فعالیت
              </span>
            </div>
            
            {entriesCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 dark:bg-sky-900/20 rounded-full border border-sky-200 dark:border-sky-800"
              >
                <TrendingUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                  فعال
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <Button
          variant="outline"
          size="lg"
          className={`
            group relative overflow-hidden border-2 transition-all duration-300
            ${isHistoryEmpty 
              ? 'border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed' 
              : 'border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20'
            }
          `}
          onClick={onClearHistory}
          disabled={isHistoryEmpty}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-red-500/10 transition-all duration-300" />
          <Trash className="h-5 w-5 ml-2 transition-transform group-hover:scale-110" />
          <span className="font-medium">پاک کردن تاریخچه</span>
        </Button>
      </motion.div>
    </div>
  );
};
