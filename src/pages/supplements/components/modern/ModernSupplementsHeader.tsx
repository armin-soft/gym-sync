
import React from "react";
import { motion } from "framer-motion";
import { Pill, Heart, Sparkles, Shield } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const ModernSupplementsHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-600" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      
      <div className="relative z-10 px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center space-y-6">
            {/* Main Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                  <Pill className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-5xl font-black text-white mb-2">
                مدیریت مکمل‌ها و ویتامین‌ها
              </h1>
              <p className="text-xl text-white/90 font-medium">
                سیستم پیشرفته مدیریت تغذیه تکمیلی ورزشکاران
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Pill className="w-6 h-6 text-green-900" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">مکمل‌های غذایی</h3>
                <p className="text-white/80 text-sm">مدیریت حرفه‌ای مکمل‌های ورزشی</p>
              </div>
              
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-purple-900" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">ویتامین‌ها</h3>
                <p className="text-white/80 text-sm">کنترل ویتامین‌های ضروری</p>
              </div>
              
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-900" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">نظارت کامل</h3>
                <p className="text-white/80 text-sm">پایش و کنترل دقیق مصرف</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
