
import React from "react";
import { motion } from "framer-motion";
import { Crown, Star, Shield, Zap, User, Award, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernTrainerProfileHeaderProps {
  completionPercentage: number;
}

export const ModernTrainerProfileHeader = ({ completionPercentage }: ModernTrainerProfileHeaderProps) => {
  return (
    <motion.div 
      className="text-center space-y-8 mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* نشان حرفه‌ای */}
      <motion.div
        className="inline-flex items-center gap-4 bg-gradient-to-l from-emerald-600 to-sky-600 text-white rounded-full px-8 py-4 shadow-2xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Crown className="h-6 w-6 text-yellow-300" fill="currentColor" />
        </motion.div>
        <span className="font-bold text-lg">مربی حرفه‌ای معتمد</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          ))}
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent leading-tight">
          پروفایل مربی
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
          مدیریت کامل اطلاعات حرفه‌ای و ایجاد پروفایل جامع مربیگری
        </p>
      </motion.div>

      {/* ویژگی‌ها */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { icon: Shield, text: "امنیت بالا", gradient: "from-emerald-600 to-emerald-700" },
          { icon: Zap, text: "به‌روزرسانی لحظه‌ای", gradient: "from-sky-600 to-sky-700" },
          { icon: Award, text: "استاندارد حرفه‌ای", gradient: "from-emerald-500 to-sky-600" },
          { icon: TrendingUp, text: "پیشرفت مداوم", gradient: "from-sky-500 to-emerald-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-3 bg-gradient-to-l ${feature.gradient} text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <feature.icon className="h-5 w-5" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* نوار پیشرفت کلی */}
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 mb-3">
          <span className="font-medium">تکمیل پروفایل</span>
          <span className="font-bold">{toPersianNumbers(completionPercentage.toString())}%</span>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-l from-emerald-600 to-sky-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </div>
      </motion.div>

      {/* خط تزیینی */}
      <motion.div
        className="flex items-center justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="h-px bg-gradient-to-l from-transparent via-emerald-400 to-transparent flex-1 max-w-32" />
        <div className="w-4 h-4 bg-gradient-to-l from-emerald-500 to-sky-500 rounded-full" />
        <div className="h-px bg-gradient-to-l from-transparent via-sky-400 to-transparent flex-1 max-w-32" />
      </motion.div>
    </motion.div>
  );
};
