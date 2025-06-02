
import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, Zap, Shield } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface LoadingContentProps {
  gymName: string;
  systemInfo: {
    version: string;
    totalComponents: number;
    loadedComponents: number;
  };
}

export const LoadingContent = ({ gymName, systemInfo }: LoadingContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full mb-8 sm:mb-10 md:mb-12">
      {/* آیکون اصلی */}
      <motion.div
        initial={{ scale: 0, rotate: -360 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        className="relative mb-6 sm:mb-8"
      >
        <div className="relative">
          {/* دایره اصلی */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center"
          >
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="currentColor" />
          </motion.div>
          
          {/* آیکون‌های چرخشی */}
          {[Sparkles, Zap, Shield].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 15 + index * 5, 
                repeat: Infinity, 
                ease: "linear"
              }}
              className="absolute inset-0"
            >
              <div 
                className="absolute w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                style={{
                  top: `${20 + index * 30}%`,
                  right: `${-10 - index * 5}%`,
                  transform: 'translate(50%, -50%)'
                }}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          <span className="block mb-2">جیم سینک</span>
          <span className="text-lg sm:text-xl md:text-2xl font-medium opacity-90">
            سیستم مدیریت هوشمند ورزشی
          </span>
        </h1>
        
        {gymName && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg rounded-full px-4 py-2 sm:px-5 sm:py-3 border border-white/20"
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
            <span className="text-white font-medium text-sm sm:text-base">{gymName}</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* اطلاعات سیستم */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md mb-6"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">
            {toPersianNumbers(systemInfo.version)}
          </div>
          <div className="text-xs sm:text-sm text-white/70">نسخه</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">
            {toPersianNumbers(systemInfo.totalComponents.toString())}
          </div>
          <div className="text-xs sm:text-sm text-white/70">کامپوننت</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">
            {toPersianNumbers(systemInfo.loadedComponents.toString())}
          </div>
          <div className="text-xs sm:text-sm text-white/70">بارگذاری</div>
        </div>
      </motion.div>
      
      {/* پیام انگیزشی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          همراه شما در مسیر موفقیت ورزشی
        </p>
      </motion.div>
    </div>
  );
};
