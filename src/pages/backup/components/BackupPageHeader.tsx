
import React from "react";
import { motion } from "framer-motion";
import { Database, Shield } from "lucide-react";
import { useBackupStats } from "../hooks/useBackupStats";

export const BackupPageHeader = () => {
  const { lastRefresh, isRefreshing } = useBackupStats();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div 
      className="text-center mb-8 sm:mb-12 relative z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/40 to-indigo-500/40 blur-xl opacity-70" />
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 relative z-10">
            <Database className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
        پشتیبان‌گیری و بازیابی
      </h1>
      
      <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4">
        داده‌های خود را ایمن نگه دارید و در صورت نیاز بازیابی کنید
      </p>

      {/* نشانگر وضعیت بروزرسانی */}
      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`} />
        <span>
          {isRefreshing ? 'در حال بروزرسانی...' : `آخرین بروزرسانی: ${formatTime(lastRefresh)}`}
        </span>
        <Shield className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
};
