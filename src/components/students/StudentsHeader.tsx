
import React from "react";
import { Plus, RotateCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShamsiDate } from "@/hooks/useShamsiDate";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface StudentsHeaderProps {
  onAddStudent: () => void;
  onRefresh?: () => void;
  lastRefreshTime?: Date;
}

export const StudentsHeader: React.FC<StudentsHeaderProps> = ({ 
  onAddStudent,
  onRefresh,
  lastRefreshTime
}) => {
  const { dateInfo, isLoading } = useShamsiDate();
  
  const formatLastRefreshTime = () => {
    if (!lastRefreshTime) return null;
    
    try {
      const hours = lastRefreshTime.getHours();
      const minutes = lastRefreshTime.getMinutes();
      const seconds = lastRefreshTime.getSeconds();
      
      const formattedTime = `${toPersianNumbers(hours.toString().padStart(2, '0'))}:${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(seconds.toString().padStart(2, '0'))}`;
      
      // Get time context (morning, noon, evening, night)
      let timeContext = "صبح";
      if (hours >= 12 && hours < 17) {
        timeContext = "ظهر";
      } else if (hours >= 17 && hours < 20) {
        timeContext = "عصر";
      } else if (hours >= 20 || hours < 4) {
        timeContext = "شب";
      }
      
      return (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 p-2.5 pr-3.5 rounded-xl bg-gradient-to-br from-slate-50/80 to-white/60 dark:from-slate-900/80 dark:to-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-sm"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 shadow-inner border border-indigo-100/60 dark:border-indigo-800/20">
            <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          </div>
          
          <div className="flex flex-col">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5 flex items-center">
              آخرین بروزرسانی
            </div>
            
            {dateInfo && (
              <div className="flex flex-col space-y-0.5 text-sm">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{dateInfo.Shamsi_Date}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{dateInfo.Season}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-xl leading-none">{dateInfo.Season_Emoji}</span>
                  <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{formattedTime}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-800/20">{timeContext}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      );
    } catch (error) {
      console.error('Error formatting date:', error);
      return "";
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
      <div className="flex flex-col items-center sm:items-start">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-primary bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-200 bg-clip-text text-transparent"
        >
          شاگردان
        </motion.h1>
      </div>
      
      <div className="flex items-center gap-3">
        {lastRefreshTime && formatLastRefreshTime()}
        
        <div className="flex gap-2">
          {onRefresh && (
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              className="flex items-center gap-1.5 border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800/60"
            >
              <RotateCw className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-400" />
              <span>بروزرسانی</span>
            </Button>
          )}
          
          <Button
            size="sm"
            onClick={onAddStudent}
            className="flex items-center gap-1.5 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>افزودن شاگرد</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
