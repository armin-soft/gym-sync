
import React from "react";
import { motion } from "framer-motion";

export const StudentLoginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* گرادیان پس‌زمینه اصلی */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/40 dark:from-slate-900 dark:via-violet-950/30 dark:to-purple-950/40"></div>
      
      {/* شکل‌های هندسی متحرک */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-full blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-violet-300/20 to-purple-400/20 rounded-full blur-xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      {/* شبکه نقطه‌ای */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 69 193 / 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* نور محیطی */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-violet-200/10 via-purple-200/5 to-transparent rounded-full blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
