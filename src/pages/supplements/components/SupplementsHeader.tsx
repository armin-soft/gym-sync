
import React from "react";
import { motion } from "framer-motion";
import { Pill, FlaskConical, Sparkles } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const SupplementsHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-l from-orange-600 via-orange-500 to-gold-500 dark:from-orange-800 dark:via-orange-700 dark:to-gold-600" dir="rtl">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* آیکون اصلی */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <FlaskConical className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-black" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Pill className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -left-1 w-6 h-6 bg-gradient-to-r from-gold-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-black" />
              </motion.div>
            </motion.div>
          </div>

          {/* عنوان اصلی */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
          >
            مدیریت مکمل‌ها و ویتامین‌ها
          </motion.h1>

          {/* توضیحات */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            سیستم جامع مدیریت مکمل‌ها و ویتامین‌ها با امکان دسته‌بندی، تنظیم دوز مصرف و زمان مصرف
          </motion.p>

          {/* نمایش آمار */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 flex items-center justify-center gap-6 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>مکمل‌های ورزشی</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              <span>ویتامین‌ها</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>دسته‌بندی هوشمند</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="h-4 bg-gradient-to-b from-transparent to-white/10"></div>
    </div>
  );
};
