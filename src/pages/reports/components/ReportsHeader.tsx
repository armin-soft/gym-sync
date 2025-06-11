
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePersianDate } from "@/hooks/usePersianDate";

export const ReportsHeader = () => {
  const persianDate = usePersianDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* بخش عنوان */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="p-4 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-2xl text-white shadow-lg"
            >
              <BarChart3 className="h-8 w-8" />
            </motion.div>
            
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent"
              >
                گزارشات و تحلیل‌ها
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                {persianDate}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
