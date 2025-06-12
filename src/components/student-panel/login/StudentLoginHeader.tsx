
import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Users } from "lucide-react";

interface StudentLoginHeaderProps {
  variants: any;
}

export const StudentLoginHeader = ({ variants }: StudentLoginHeaderProps) => {
  return (
    <motion.div variants={variants} className="text-center mb-8">
      {/* آیکون اصلی */}
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-violet-500/80 to-purple-600/80 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <User className="h-10 w-10 text-white" />
        </div>
        
        {/* نشانگر آنلاین */}
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
        </motion.div>
      </motion.div>

      {/* عنوان اصلی */}
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-800 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        پنل شاگرد
      </motion.h1>

      {/* توضیحات */}
      <motion.p 
        className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        برای ورود به پنل شاگرد، شماره موبایل خود را وارد کنید
      </motion.p>

      {/* آمار و اطلاعات */}
      <motion.div 
        className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span>امن و محفوظ</span>
        </div>
        
        <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-violet-500" />
          <span>پنل اختصاصی</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
