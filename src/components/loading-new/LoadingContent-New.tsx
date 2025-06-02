
import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, Zap, Shield } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface LoadingContentNewProps {
  gymName: string;
  systemInfo: {
    version: string;
    totalComponents: number;
    loadedComponents: number;
  };
}

export const LoadingContentNew = ({ gymName, systemInfo }: LoadingContentNewProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* آیکون اصلی */}
      <motion.div
        initial={{ scale: ۰, rotate: -۳۶۰ }}
        animate={{ scale: ۱, rotate: ۰ }}
        transition={{ 
          duration: ۱.۲,
          type: "spring",
          stiffness: ۲۰۰,
          damping: ۲۰
        }}
        className="relative mb-8 sm:mb-12"
      >
        <div className="relative">
          {/* دایره اصلی */}
          <motion.div
            animate={{ rotate: ۳۶۰ }}
            transition={{ duration: ۲۰, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center"
          >
            <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="currentColor" />
          </motion.div>
          
          {/* آیکون‌های چرخشی */}
          {[Sparkles, Zap, Shield].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ rotate: -۳۶۰ }}
              transition={{ 
                duration: ۱۵ + index * ۵, 
                repeat: Infinity, 
                ease: "linear"
              }}
              className="absolute inset-0"
            >
              <div 
                className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                style={{
                  top: `${۲۰ + index * ۳۰}%`,
                  right: `${-۱۰ - index * ۵}%`,
                  transform: 'translate(50%, -50%)'
                }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: ۰, y: ۳۰ }}
        animate={{ opacity: ۱, y: ۰ }}
        transition={{ delay: ۰.۳, duration: ۰.۸ }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
          <span className="block mb-2">جیم سینک</span>
          <span className="text-lg sm:text-xl lg:text-2xl font-medium opacity-90">
            سیستم مدیریت هوشمند ورزشی
          </span>
        </h1>
        
        {gymName && (
          <motion.div
            initial={{ scale: ۰ }}
            animate={{ scale: ۱ }}
            transition={{ delay: ۰.۶, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20"
          >
            <Crown className="w-4 h-4 text-yellow-300" />
            <span className="text-white font-medium">{gymName}</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* اطلاعات سیستم */}
      <motion.div
        initial={{ opacity: ۰, y: ۲۰ }}
        animate={{ opacity: ۱, y: ۰ }}
        transition={{ delay: ۰.۸, duration: ۰.۶ }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md sm:max-w-2xl mb-8"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-lg sm:text-xl font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.version)}
          </div>
          <div className="text-xs sm:text-sm text-white/70">نسخه سیستم</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-lg sm:text-xl font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.totalComponents.toString())}
          </div>
          <div className="text-xs sm:text-sm text-white/70">کامپوننت سیستم</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-lg sm:text-xl font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.loadedComponents.toString())}
          </div>
          <div className="text-xs sm:text-sm text-white/70">بارگذاری شده</div>
        </div>
      </motion.div>
      
      {/* پیام انگیزشی */}
      <motion.div
        initial={{ opacity: ۰ }}
        animate={{ opacity: ۱ }}
        transition={{ delay: ۱.۲, duration: ۰.۶ }}
        className="text-center"
      >
        <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
          سیستم مدیریت پیشرفته برای مربیان حرفه‌ای و ورزشکاران جدی
        </p>
        <p className="text-xs sm:text-sm text-white/60 mt-2">
          همراه شما در مسیر موفقیت ورزشی
        </p>
      </motion.div>
    </div>
  );
};
