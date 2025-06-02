
import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import { useAppVersion } from "@/components/auth/user-type-selection-new/hooks/useAppVersion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProfessionalLoginHeaderProps {
  gymName: string;
  variants: any;
}

export const ProfessionalLoginHeader = ({ gymName, variants }: ProfessionalLoginHeaderProps) => {
  const appVersion = useAppVersion();

  return (
    <motion.div variants={variants} className="text-center space-y-6">
      {/* لوگو و آیکون */}
      <motion.div 
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <Zap className="h-3 w-3 text-white" />
          </div>
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white">
          ورود به پنل مدیریت
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
          {gymName || "سیستم مدیریت باشگاه"}
        </p>
      </div>

      {/* نسخه برنامه */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/30 dark:border-emerald-700/30"
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
          نسخه {toPersianNumbers(appVersion)}
        </span>
      </motion.div>

      {/* توضیحات امنیتی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          برای ورود به پنل مدیریت، شماره موبایل مجاز خود را وارد کنید
        </p>
      </motion.div>
    </motion.div>
  );
};
