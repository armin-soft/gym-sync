
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
    <div className="flex flex-col items-center justify-center text-center w-full mb-6">
      {/* آیکون اصلی - کوچک‌تر شده */}
      <motion.div
        initial={{ scale: 0, rotate: -360 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        className="relative mb-4"
      >
        <div className="relative">
          {/* دایره اصلی - اندازه کوچک‌تر */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center"
          >
            <Crown className="w-8 h-8 text-white" fill="currentColor" />
          </motion.div>
          
          {/* آیکون‌های چرخشی - کوچک‌تر */}
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
                className="absolute w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                style={{
                  top: `${20 + index * 30}%`,
                  right: `${-10 - index * 5}%`,
                  transform: 'translate(50%, -50%)'
                }}
              >
                <Icon className="w-2.5 h-2.5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* عنوان اصلی - متن کوچک‌تر */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-4"
      >
        <h1 className="text-lg font-bold text-white mb-2">
          <span className="block mb-1">جیم سینک</span>
          <span className="text-sm font-medium opacity-90">
            سیستم مدیریت هوشمند ورزشی
          </span>
        </h1>
        
        {gymName && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-lg rounded-full px-3 py-1 border border-white/20"
          >
            <Crown className="w-3 h-3 text-emerald-300" />
            <span className="text-white font-medium text-xs">{gymName}</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* اطلاعات سیستم - کوچک‌تر و یک ردیفه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-3 gap-2 w-full max-w-xs mb-4"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2 border border-white/20 text-center">
          <div className="text-sm font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.version)}
          </div>
          <div className="text-xs text-white/70">نسخه</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2 border border-white/20 text-center">
          <div className="text-sm font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.totalComponents.toString())}
          </div>
          <div className="text-xs text-white/70">کامپوننت</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2 border border-white/20 text-center">
          <div className="text-sm font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.loadedComponents.toString())}
          </div>
          <div className="text-xs text-white/70">بارگذاری</div>
        </div>
      </motion.div>
      
      {/* پیام انگیزشی - کوتاه‌تر */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-white/80 leading-relaxed">
          همراه شما در مسیر موفقیت ورزشی
        </p>
      </motion.div>
    </div>
  );
};
