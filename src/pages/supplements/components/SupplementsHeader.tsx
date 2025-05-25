
import { motion } from "framer-motion";
import { FlaskConical, Pill, Star, Shield, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

export const SupplementsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden mb-8"
      dir="rtl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
      
      <Card className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-emerald-200/30 dark:border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
        {/* Top Decorative Border */}
        <div className="h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500"></div>
        
        <div className="p-8 md:p-12">
          {/* Main Header */}
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
            {/* Icon Section */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl"></div>
                <FlaskConical className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" />
                <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-80"
              ></motion.div>
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-70"
              ></motion.div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-right">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 mb-4">
                مدیریت مکمل‌ها و ویتامین‌ها
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                سامانه هوشمند مدیریت و سازماندهی مکمل‌های غذایی و ویتامین‌ها با امکانات پیشرفته
              </p>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-emerald-200/30 dark:border-emerald-700/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">مکمل‌های غذایی</h3>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                مدیریت حرفه‌ای انواع مکمل‌های غذایی و پروتئین‌ها
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-700/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">ویتامین‌ها</h3>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                کنترل و نظارت بر مصرف انواع ویتامین‌ها و مواد معدنی
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-6 border border-purple-200/30 dark:border-purple-700/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">سلامت و تناسب</h3>
              </div>
              <p className="text-purple-600 dark:text-purple-400 text-sm">
                بهینه‌سازی برنامه تغذیه‌ای و مکمل‌یاری ورزشکاران
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Decorative Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-50/50 to-transparent dark:from-slate-800/50 pointer-events-none"></div>
        <div className="absolute bottom-4 right-8 opacity-10 dark:opacity-5">
          <Heart className="w-24 h-24 text-emerald-500" />
        </div>
      </Card>
    </motion.div>
  );
};
