
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Enhanced animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full h-full min-h-screen overflow-y-auto overflow-x-hidden relative"
    >
      {/* Enhanced Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50/70 to-blue-50/40 dark:from-slate-900 dark:via-gray-900/70 dark:to-zinc-900/40 -z-10" />
      
      {/* Professional gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/3 via-transparent to-blue-500/3 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/2 to-transparent -z-10" />
      
      {/* Subtle animated background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
