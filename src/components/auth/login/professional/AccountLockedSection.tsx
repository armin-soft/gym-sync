
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, AlertTriangle, Ban, Shield, Timer } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface AccountLockedSectionProps {
  timeLeft: string;
  lockExpiry: Date | null;
  variants: any;
}

export const AccountLockedSection = ({ 
  timeLeft, 
  lockExpiry, 
  variants 
}: AccountLockedSectionProps) => {
  return (
    <motion.div
      variants={variants}
      className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-emerald-600/10 border border-emerald-300/30 dark:border-emerald-700/30 rounded-2xl shadow-2xl responsive-p-md"
      dir="rtl"
    >
      {/* نماد قفل مرکزی */}
      <motion.div 
        className="text-center responsive-m-sm"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="relative mx-auto responsive-m-sm responsive-w-lg responsive-h-lg flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-2xl opacity-90 blur-sm"></div>
          <div className="relative bg-gradient-to-br from-emerald-600 to-sky-700 rounded-2xl responsive-p-sm shadow-2xl">
            <Lock className="responsive-w-md responsive-h-md text-white" />
          </div>
          
          {/* نشان‌های هشدار */}
          <motion.div
            className="absolute -top-1 -right-1 responsive-w-sm responsive-h-sm bg-amber-500 rounded-full p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="responsive-w-xs responsive-h-xs text-white" />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-1 responsive-w-sm responsive-h-sm bg-emerald-600 rounded-full p-1"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Ban className="responsive-w-xs responsive-h-xs text-white" />
          </motion.div>
        </div>

        {/* عنوان و توضیحات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="responsive-text-lg font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 bg-clip-text text-transparent">
            حساب کاربری موقتاً مسدود شده
          </h1>
          
          <p className="text-slate-700 dark:text-slate-200 responsive-text-xs leading-relaxed">
            دسترسی شما به دلیل تلاش‌های ناموفق متعدد محدود شده است
          </p>

          {/* خط جداکننده */}
          <motion.div
            className="mx-auto mt-2 h-px w-16 xs:w-20 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>
      </motion.div>

      {/* هشدار امنیتی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="responsive-m-sm"
      >
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm"></div>
          <div className="relative responsive-p-sm border border-emerald-400/30 rounded-xl">
            <div className="flex items-start gap-2 xs:gap-3">
              <div className="flex-shrink-0">
                <div className="responsive-w-sm responsive-h-sm bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="responsive-w-xs responsive-h-xs text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="responsive-text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">هشدار امنیتی</h3>
                <p className="responsive-text-2xs text-emerald-600 dark:text-emerald-400 leading-relaxed">
                  دسترسی موقتاً مسدود شده است. این محدودیت برای حفظ امنیت حساب کاربری شما اعمال شده است.
                </p>
              </div>
            </div>
            
            {/* حاشیه متحرک */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-emerald-400/50"
              animate={{
                borderColor: ["rgba(16, 185, 129, 0.3)", "rgba(16, 185, 129, 0.7)", "rgba(16, 185, 129, 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* زمان‌سنج شمارش معکوس */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200">
          <Timer className="responsive-w-xs responsive-h-xs text-sky-600 dark:text-sky-400 animate-pulse" />
          <p className="font-semibold responsive-text-sm">زمان باقی‌مانده تا رفع محدودیت:</p>
        </div>
        
        <div className="relative">
          {/* پس‌زمینه محو */}
          <div className="absolute inset-0 bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-slate-600/20"></div>
          
          {/* نمایش زمان‌سنج */}
          <div className="relative responsive-p-md text-center">
            <motion.div 
              className="bg-gradient-to-r from-emerald-600/20 to-sky-600/20 rounded-xl responsive-p-sm border border-emerald-400/30"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(16, 185, 129, 0.1)",
                  "0 0 30px rgba(16, 185, 129, 0.3)",
                  "0 0 0 rgba(16, 185, 129, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="responsive-text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {toPersianNumbers(timeLeft)}
              </p>
            </motion.div>
          </div>
          
          {/* نشانگر پیشرفت */}
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 xs:h-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* پیام امنیتی پایانی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="responsive-m-sm text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-1 xs:gap-2 text-slate-600 dark:text-slate-300">
          <Shield className="responsive-w-xs responsive-h-xs text-emerald-600 dark:text-emerald-400" />
          <p className="responsive-text-2xs font-medium">این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
        </div>

        {/* نقاط تزئینی */}
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500/50 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
