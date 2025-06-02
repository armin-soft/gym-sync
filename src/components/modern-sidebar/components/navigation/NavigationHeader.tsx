
import React from "react";
import { motion } from "framer-motion";

export const NavigationHeader: React.FC = () => {
  return (
    <motion.div
      className="mb-4 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h4 className="text-sm font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent mb-1">
        پنل مدیریت حرفه‌ای
      </h4>
      <p className="text-2xs text-emerald-600/70 dark:text-emerald-400/70">
        دسترسی سریع به تمام بخش‌های سیستم
      </p>
      
      <motion.div
        className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full mx-auto mt-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
    </motion.div>
  );
};
