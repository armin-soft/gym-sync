
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Sparkles, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const SupplementsHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-md"></div>
      </div>
      
      <div className="relative px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Main Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 shadow-2xl"
            >
              <div className="relative">
                <Pill className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse">
                  <Sparkles className="w-3 h-3 text-yellow-600 m-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-l from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            >
              مکمل‌ها و ویتامین‌ها
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              مدیریت کامل و حرفه‌ای مکمل‌ها و ویتامین‌های مورد نیاز برای سلامتی و تناسب اندام
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">مکمل‌ها</div>
                  <div className="text-lg font-bold">مدیریت کامل</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">ویتامین‌ها</div>
                  <div className="text-lg font-bold">دسته‌بندی هوشمند</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-100">پیشرفته</div>
                  <div className="text-lg font-bold">رابط کاربری</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
