
import React from "react";
import { motion } from "framer-motion";
import { Pill, Sparkles } from "lucide-react";

export const SupplementsHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          dir="rtl"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-xl sm:rounded-2xl lg:rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Pill className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-800" />
              </motion.div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-3 sm:mb-4 leading-tight">
            مدیریت مکمل‌ها و ویتامین‌ها
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            مدیریت حرفه‌ای مکمل‌های غذایی و ویتامین‌ها با امکانات پیشرفته دسته‌بندی و جستجو
          </p>
        </motion.div>
      </div>
    </div>
  );
};
