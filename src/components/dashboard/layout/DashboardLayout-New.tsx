
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface DashboardLayoutNewProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const DashboardLayoutNew = ({ children }: DashboardLayoutNewProps) => {
  const deviceInfo = useDeviceInfo();

  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-6";
    return "p-8";
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className={`min-h-screen w-full relative ${getPadding()}`}
    >
      {/* پس‌زمینه گرادیانی اختصاصی */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 -z-10" />
      
      {/* المان‌های تزیینی شناور */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'var(--bg-gradient-primary)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'var(--bg-gradient-secondary)' }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* محتوای اصلی */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardLayoutNew;
