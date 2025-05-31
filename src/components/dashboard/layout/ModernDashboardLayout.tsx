
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ModernDashboardLayoutProps {
  children: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

export const ModernDashboardLayout = ({ children }: ModernDashboardLayoutProps) => {
  const deviceInfo = useDeviceInfo();

  const getPadding = () => {
    if (deviceInfo.isMobile) {
      return "p-4";
    } else if (deviceInfo.isTablet) {
      return "p-6";
    } else {
      return "p-8 lg:p-12";
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-blue-900/10 dark:to-indigo-900/20 ${getPadding()}`}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/15 to-pink-500/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
