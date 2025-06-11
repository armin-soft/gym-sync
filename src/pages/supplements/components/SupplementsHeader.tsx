
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Star, Sparkles } from "lucide-react";

export const SupplementsHeader: React.FC = () => {
  return (
    <div className="relative min-h-[350px] bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 overflow-hidden" dir="rtl">
      {/* Background animated elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-cyan-300/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px] px-6 text-white text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
            <Pill className="w-12 h-12 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-l from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent"
        >
          مکمل‌ها و ویتامین‌ها
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl leading-relaxed"
        >
          سیستم مدیریت کامل و هوشمند مکمل‌های غذایی و ویتامین‌های ورزشی
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-100">مکمل‌های غذایی</div>
              <div className="text-lg font-bold">مدیریت پیشرفته</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
            <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-100">ویتامین‌ها</div>
              <div className="text-lg font-bold">کنترل هوشمند</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-100">کیفیت بالا</div>
              <div className="text-lg font-bold">استاندارد جهانی</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
