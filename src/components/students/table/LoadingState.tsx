
import React from "react";
import { motion } from "framer-motion";

export const LoadingState = () => {
  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      key="loading"
      variants={loadingVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-700 opacity-20"></div>
          <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-500 animate-spin"></div>
          <div className="absolute w-10 h-10 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.7s' }}></div>
          <div className="absolute w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
        </div>
        <motion.p 
          className="mt-6 text-slate-600 dark:text-slate-300 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          در حال بارگذاری اطلاعات...
        </motion.p>
      </div>
    </motion.div>
  );
};
