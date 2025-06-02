
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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/30">
      {/* پس‌زمینه مدرن مشابه انتخاب نوع ورود */}
      <div className="absolute inset-0 overflow-hidden">
        {/* گرادیان پس‌زمینه اصلی */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40" />
        
        {/* عناصر هندسی متحرک */}
        <div className="absolute inset-0">
          {/* دایره‌های بزرگ */}
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 40%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.05) 40%, transparent 70%)'
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />

          {/* خطوط هندسی */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-px bg-gradient-to-l from-emerald-400/20 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-48 h-px bg-gradient-to-r from-sky-400/20 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* الگوی نقطه‌ای پیشرفته */}
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.15) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, rgba(14, 165, 233, 0.1) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px, 80px 80px'
          }}
        />

        {/* تأثیر نور */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-black/5 dark:to-black/10" />
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={variants}
          className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-emerald-600/10 border border-emerald-300/30 dark:border-emerald-700/30 rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
          dir="rtl"
        >
          {/* نماد قفل مرکزی */}
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative mx-auto mb-6 w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-3xl opacity-90 blur-sm"></div>
              <div className="relative bg-gradient-to-br from-emerald-600 to-sky-700 rounded-3xl p-5 shadow-2xl">
                <Lock className="h-14 w-14 text-white" />
              </div>
              
              {/* نشان‌های هشدار */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full p-1.5"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-5 w-5 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-600 rounded-full p-1.5"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Ban className="h-5 w-5 text-white" />
              </motion.div>
            </div>

            {/* عنوان و توضیحات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 bg-clip-text text-transparent">
                حساب کاربری موقتاً مسدود شده
              </h1>
              
              <p className="text-slate-700 dark:text-slate-200 text-base leading-relaxed">
                دسترسی شما به دلیل تلاش‌های ناموفق متعدد محدود شده است
              </p>

              {/* خط جداکننده */}
              <motion.div
                className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>

          {/* هشدار امنیتی */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm"></div>
              <div className="relative p-5 border border-emerald-400/30 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-300 mb-2">هشدار امنیتی</h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 leading-relaxed">
                      دسترسی موقتاً مسدود شده است. این محدودیت برای حفظ امنیت حساب کاربری شما اعمال شده است.
                    </p>
                  </div>
                </div>
                
                {/* حاشیه متحرک */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50"
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
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 text-slate-700 dark:text-slate-200">
              <Timer className="h-6 w-6 text-sky-600 dark:text-sky-400 animate-pulse" />
              <p className="font-semibold text-lg">زمان باقی‌مانده تا رفع محدودیت:</p>
            </div>
            
            <div className="relative">
              {/* پس‌زمینه محو */}
              <div className="absolute inset-0 bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-600/20"></div>
              
              {/* نمایش زمان‌سنج */}
              <div className="relative p-8 text-center">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-600/20 to-sky-600/20 rounded-2xl py-6 px-8 border border-emerald-400/30"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(16, 185, 129, 0.1)",
                      "0 0 30px rgba(16, 185, 129, 0.3)",
                      "0 0 0 rgba(16, 185, 129, 0.1)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                    {toPersianNumbers(timeLeft)}
                  </p>
                </motion.div>
              </div>
              
              {/* نشانگر پیشرفت */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
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
            className="mt-8 text-center space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-medium">این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
            </div>

            {/* نقاط تزئینی */}
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-emerald-500/50 rounded-full"
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
      </div>
    </div>
  );
};
