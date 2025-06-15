
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const StudentNavigationHeader: React.FC = () => {
  return (
    <motion.div
      className="relative mb-4 p-3 rounded-xl bg-gradient-to-br from-emerald-50/80 to-sky-50/60 dark:from-emerald-900/30 dark:to-sky-900/20 border border-emerald-200/30 dark:border-emerald-700/30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
        <Sparkles className="h-4 w-4" />
        <span className="text-sm font-medium">منوی اصلی</span>
      </div>
    </motion.div>
  );
};
