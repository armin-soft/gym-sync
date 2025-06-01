
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.165, 0.84, 0.44, 1]
    }
  }
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const deviceInfo = useDeviceInfo();

  const getPadding = () => {
    if (deviceInfo.isMobile) {
      return "p-4";
    } else if (deviceInfo.isTablet) {
      return "p-6";
    } else if (deviceInfo.isSmallLaptop) {
      return "p-8";
    } else {
      return "p-10 xl:p-12";
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className={`w-full h-full overflow-y-auto overflow-x-hidden ${getPadding()} relative`}
    >
      {/* پس‌زمینه حرفه‌ای پیشرفته */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50/80 to-blue-50/60 dark:from-slate-900 dark:via-gray-900/80 dark:to-zinc-900/60 -z-10" />
      
      {/* لایه‌های گرادیانت حرفه‌ای */}
      <div className="absolute inset-0 bg-gradient-to-l from-violet-500/2 via-transparent to-blue-500/2 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/1 to-transparent -z-10" />
      
      {/* المان‌های انیمیشنی ظریف پس‌زمینه */}
      <motion.div 
        className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full opacity-10 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full opacity-8 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.04, 0.12, 0.04],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 40, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* کانتینر محتوا */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
