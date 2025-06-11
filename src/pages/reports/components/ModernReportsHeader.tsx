
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import { usePersianDate } from "@/hooks/usePersianDate";

export const ModernReportsHeader = () => {
  const persianDate = usePersianDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-6"
    >
      <div className="relative overflow-hidden">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Title Section */}
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-xl shadow-md">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              </motion.div>
              
              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-800 bg-clip-text text-transparent"
                >
                  گزارشات تحلیلی پیشرفته
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                >
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm lg:text-base font-medium">{persianDate}</span>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-slate-500 dark:text-slate-400 text-sm lg:text-base max-w-md"
                >
                  آنالیز جامع عملکرد، آمار دقیق و گزارشات تخصصی سیستم مدیریت باشگاه
                </motion.p>
              </div>
            </div>

            {/* Status Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-sky-100 dark:from-emerald-900/30 dark:to-sky-900/30 rounded-full">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="text-xs lg:text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  عملکرد عالی
                </span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-sky-500/10 rounded-full -translate-x-12 -translate-y-12" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-sky-400/10 to-emerald-500/10 rounded-full translate-x-10 translate-y-10" />
        </div>
      </div>
    </motion.div>
  );
};
