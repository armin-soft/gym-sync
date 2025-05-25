
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 backdrop-blur-sm border border-white/60 shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/3 to-blue-500/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-xl" />
        
        <div className="relative z-10 p-4 md:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            {/* Icon and Title Section */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Pill className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-2 h-2 text-white" />
                  </motion.div>
                </motion.div>
                
                <div className="text-right">
                  <motion.h1 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-l from-purple-700 via-indigo-700 to-blue-700 bg-clip-text text-transparent mb-1"
                  >
                    مکمل‌ها و ویتامین‌ها
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm md:text-base text-slate-600 font-medium"
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
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  سیستم پیشرفته مدیریت و دسته‌بندی مکمل‌های غذایی و ویتامین‌ها
                </p>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="flex flex-row lg:flex-col gap-3"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/40 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-700">{toPersianNumbers(24)}</div>
                    <div className="text-xs text-slate-600">مکمل فعال</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/40 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">{toPersianNumbers(12)}</div>
                    <div className="text-xs text-slate-600">ویتامین</div>
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
