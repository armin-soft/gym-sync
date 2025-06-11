
import React from "react";
import { motion } from "framer-motion";

interface ReportsContainerProps {
  children: React.ReactNode;
}

export const ReportsContainer: React.FC<ReportsContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* پس‌زمینه گرادیانی پیشرفته */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40" />
        
        {/* عناصر هندسی متحرک */}
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

        {/* الگوی نقطه‌ای */}
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
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};
