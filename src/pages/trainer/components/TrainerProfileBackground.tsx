
import React from "react";
import { motion } from "framer-motion";

export const TrainerProfileBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* گرادیان اصلی با رنگ‌های انتخاب نوع ورود */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40" />
      
      {/* شکل‌های هندسی پویا */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(14, 165, 233, 0.1) 50%, transparent 100%)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-32 w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* الگوی نقطه‌ای */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, 0.5) 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}
      />
    </div>
  );
};
