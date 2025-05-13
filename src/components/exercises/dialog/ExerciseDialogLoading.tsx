
import React from "react";
import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

const ExerciseDialogLoading = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <motion.div 
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="h-16 w-16 rounded-full border-4 border-indigo-200 dark:border-indigo-900/50"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-r-4 border-indigo-600 dark:border-indigo-400"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dumbbell className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </motion.div>
        
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            در حال بارگذاری تمرین‌ها
          </h3>
          <p className="text-sm text-muted-foreground">
            لطفاً چند لحظه صبر کنید...
          </p>
        </div>
        
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <motion.div 
            className="h-2 bg-indigo-200 dark:bg-indigo-900/30 rounded-full overflow-hidden"
            initial={{ width: "20%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExerciseDialogLoading;
