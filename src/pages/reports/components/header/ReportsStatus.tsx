
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export const ReportsStatus = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="flex items-center gap-4"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full">
        <TrendingUp className="h-5 w-5 text-green-600" />
        <span className="text-sm font-semibold text-green-700 dark:text-green-400">
          عملکرد عالی
        </span>
      </div>
    </motion.div>
  );
};
