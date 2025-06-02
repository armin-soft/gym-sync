
import React from "react";
import { motion } from "framer-motion";
import { Crown, Shield, Users, Sparkles } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const ModernHeader = () => {
  return (
    <div className="text-center px-4 sm:px-6 lg:px-8" dir="rtl">
      {/* لوگو و آیکون اصلی */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative inline-flex items-center justify-center mb-8"
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-emerald-600 via-sky-600 to-emerald-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center"
            whileHover={{ scale: 1.05, rotateY: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white" />
          </motion.div>
          
          {/* نشان‌های کناری */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-3 h-3 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* عنوان اصلی */}
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
            باشگاه هوشمند
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
          انتخاب نوع دسترسی و ورود به پلتفرم مدیریت پیشرفته
        </p>
      </motion.div>

      {/* اطلاعات وضعیت */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-sm sm:text-base text-slate-500 dark:text-slate-400"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-500/30 rounded-full animate-ping"></div>
          </div>
          <span className="font-medium">سیستم آنلاین</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>نسخه {toPersianNumbers("4.2.6")}</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>امنیت بالا</span>
        </div>
      </motion.div>

      {/* خط تزئینی */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
        className="mx-auto mt-8 h-px max-w-md bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"
      />
    </div>
  );
};
