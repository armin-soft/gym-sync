
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Sparkles, TrendingUp, Shield, Activity } from "lucide-react";

export const SupplementsHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-l from-blue-600 via-indigo-700 to-purple-800" dir="rtl">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      <motion.div 
        className="absolute top-20 right-20 text-white/10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Pill className="h-16 w-16" />
      </motion.div>

      <motion.div 
        className="absolute bottom-20 left-20 text-white/10"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Heart className="h-20 w-20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-8 shadow-2xl border border-white/10"
            >
              <div className="relative">
                <Sparkles className="w-12 h-12 text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse">
                  <Activity className="w-3 h-3 text-yellow-800 m-1" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            >
              مکمل‌ها و ویتامین‌ها
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              سیستم مدیریت حرفه‌ای و کامل مکمل‌های غذایی و ویتامین‌های ضروری برای سلامتی و عملکرد بهینه ورزشکاران
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-l from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">مکمل‌های غذایی</h3>
                <p className="text-blue-100 text-sm">مدیریت کامل انواع مکمل‌های ورزشی و تغذیه‌ای</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-l from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">ویتامین‌ها</h3>
                <p className="text-blue-100 text-sm">کنترل و نظارت بر مصرف ویتامین‌های ضروری</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-l from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">ایمنی و کیفیت</h3>
                <p className="text-blue-100 text-sm">اطمینان از کیفیت و ایمنی محصولات</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
