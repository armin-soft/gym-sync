
import React from "react";
import { motion } from "framer-motion";
import { Download, Shield, Database } from "lucide-react";

export function BackupHeader() {
  return (
    <div className="relative p-8 pb-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-emerald-500/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-sky-600/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-3xl flex items-center justify-center shadow-2xl">
              <Download className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-sky-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
          پشتیبان‌گیری امن
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-md mx-auto">
          تمام اطلاعات شما به صورت امن و یکپارچه پشتیبان‌گیری می‌شود
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span>ذخیره محلی</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>رمزگذاری شده</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
