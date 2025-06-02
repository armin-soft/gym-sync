
import React from "react";
import { motion } from "framer-motion";

export const HeaderTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="space-y-4 sm:space-y-6"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
        <span className="bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent">
          سیستم مدیریت
        </span>
        <br />
        <span className="bg-gradient-to-l from-sky-700 via-emerald-700 to-sky-800 bg-clip-text text-transparent">
          برنامه
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
        انتخاب نوع دسترسی و ورود به پلتفرم مدیریت پیشرفته
      </p>
    </motion.div>
  );
};
