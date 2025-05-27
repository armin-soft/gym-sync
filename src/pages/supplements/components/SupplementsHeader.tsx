
import React from "react";
import { motion } from "framer-motion";
import { Pill, Activity } from "lucide-react";

export const SupplementsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-2 sm:px-3 md:px-4 lg:px-6 pt-2 sm:pt-3 md:pt-4 lg:pt-6 pb-3 sm:pb-4 md:pb-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 shadow-sm">
            <Pill className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              مکمل‌ها و ویتامین‌ها
            </h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              مدیریت مکمل‌ها و ویتامین‌های ورزشی
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
