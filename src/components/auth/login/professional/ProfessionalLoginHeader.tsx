
import React from "react";
import { motion } from "framer-motion";
import { Crown, Shield, Sparkles } from "lucide-react";

interface ProfessionalLoginHeaderProps {
  gymName: string;
  variants: any;
}

export const ProfessionalLoginHeader = ({ gymName, variants }: ProfessionalLoginHeaderProps) => {
  return (
    <motion.div variants={variants} className="text-center space-y-6">
      {/* لوگو و نماد */}
      <motion.div
        className="relative inline-flex items-center justify-center mb-6"
        whileHover={{ scale: 1.05, rotateY: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-600 via-sky-600 to-emerald-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center">
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          
          {/* نشان‌های کناری */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-3 h-3 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <div className="space-y-3">
        <motion.h1 
          className="text-2xl sm:text-3xl font-black leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent">
            {gymName ? `سیستم مدیریت ${gymName}` : 'سیستم مدیریت باشگاه'}
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          ورود امن و محرمانه به پلتفرم مدیریت
        </motion.p>
      </div>

      {/* خط جداکننده */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
        className="mx-auto h-px max-w-xs bg-gradient-to-l from-transparent via-emerald-300/50 dark:via-emerald-600/50 to-transparent"
      />

      {/* وضعیت سیستم */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400"
      >
        <div className="relative">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-green-500/30 rounded-full animate-ping"></div>
        </div>
        <span className="font-medium">سیستم آنلاین و فعال</span>
      </motion.div>
    </motion.div>
  );
};
