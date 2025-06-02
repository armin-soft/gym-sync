
import React from "react";
import { motion } from "framer-motion";

export const NavigationFooter: React.FC = () => {
  return (
    <motion.div
      className="mt-6 pt-4 border-t border-emerald-200/30 dark:border-emerald-700/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="text-center">
        <p className="text-2xs text-emerald-600/60 dark:text-emerald-400/60 leading-relaxed">
          سیستم مدیریت پیشرفته برای مربیان حرفه‌ای
        </p>
        <p className="text-3xs text-emerald-500/50 dark:text-emerald-400/50 mt-0.5">
          همراه شما در مسیر موفقیت ورزشی
        </p>
      </div>
    </motion.div>
  );
};
