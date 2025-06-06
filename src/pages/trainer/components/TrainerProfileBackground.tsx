
import React from "react";
import { motion } from "framer-motion";

export const TrainerProfileBackground = () => {
  return (
    <>
      {/* Main gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-indigo-900/20" />
      
      {/* Animated background elements */}
      <motion.div
        className="fixed top-20 right-20 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="fixed bottom-20 left-20 w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.25, 0.1],
          rotate: [360, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Dot pattern overlay */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
    </>
  );
};
