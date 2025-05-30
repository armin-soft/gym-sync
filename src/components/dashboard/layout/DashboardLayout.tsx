
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { BackgroundDecorations } from "../background/BackgroundDecorations";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1,
    }
  }
};

// Get optimal grid layout based on device type
export const getGridLayout = () => {
  const deviceInfo = useDeviceInfo();
  if (deviceInfo.isMobile) {
    return "grid-cols-1 gap-4";
  } else if (deviceInfo.isTablet) {
    return "grid-cols-2 gap-5";
  } else {
    return "md:grid-cols-3 gap-6";
  }
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="w-full min-h-full p-2 xs:p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 relative"
    >
      {/* Background decorations */}
      <BackgroundDecorations />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
