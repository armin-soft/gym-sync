
import React from "react";
import { motion } from "framer-motion";

export const SidebarBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-emerald-50/90 to-sky-50/85 dark:from-slate-950/95 dark:via-emerald-950/90 dark:to-sky-950/85" />
      
      {/* Animated geometric shapes */}
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 100%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Flowing lines */}
      <motion.div
        className="absolute top-1/3 right-0 w-full h-px bg-gradient-to-l from-emerald-400/30 via-sky-400/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-sky-400/30 via-emerald-400/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Dotted pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.3) 1px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(14, 165, 233, 0.2) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px, 60px 60px'
        }}
      />
    </div>
  );
};
