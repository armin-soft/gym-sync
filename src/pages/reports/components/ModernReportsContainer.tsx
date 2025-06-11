
import React from "react";
import { motion } from "framer-motion";

interface ModernReportsContainerProps {
  children: React.ReactNode;
}

export const ModernReportsContainer: React.FC<ModernReportsContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 dark:from-emerald-950 dark:via-sky-950/30 dark:to-emerald-950/40" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Geometric Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.2) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, rgba(14, 165, 233, 0.15) 1px, transparent 0)
            `,
            backgroundSize: '32px 32px, 64px 64px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  );
};
