
import React from "react";
import { motion } from "framer-motion";

export const TrainerProfileBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* گرادیان اصلی با رنگ‌های انتخاب نوع ورود */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      
      {/* شکل‌های هندسی پویا */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)"
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
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)"
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
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.5) 1px, transparent 1px)`,
          backgroundSize: "30px 30px"
        }}
      />
    </div>
  );
};
