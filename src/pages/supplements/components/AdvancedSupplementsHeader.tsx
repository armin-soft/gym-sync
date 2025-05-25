
import React from "react";
import { motion } from "framer-motion";
import { Pill, Sparkles, TrendingUp, Users } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const AdvancedSupplementsHeader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
      dir="rtl"
    >
      {/* Main Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 backdrop-blur-sm border border-white/60 shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/3 to-blue-500/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            {/* Icon and Title Section */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Pill className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
                
                <div className="text-right">
                  <motion.h1 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-l from-purple-700 via-indigo-700 to-blue-700 bg-clip-text text-transparent mb-2"
                  >
                    مکمل‌ها و ویتامین‌ها
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl text-slate-600 font-medium"
                  >
                    مدیریت حرفه‌ای مکمل‌های غذایی و ویتامین‌ها
                  </motion.p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-right"
              >
                <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                  سیستم پیشرفته مدیریت و دسته‌بندی مکمل‌های غذایی و ویتامین‌ها برای بهینه‌سازی برنامه‌های تغذیه‌ای
                </p>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="flex flex-row lg:flex-col gap-4"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-700">{toPersianNumbers(156)}</div>
                    <div className="text-sm text-slate-600">مکمل فعال</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">{toPersianNumbers(89)}</div>
                    <div className="text-sm text-slate-600">ویتامین</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
