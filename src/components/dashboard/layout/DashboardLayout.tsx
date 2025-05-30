
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
    return "grid-cols-1 gap-2 xs:gap-3";
  } else if (deviceInfo.isTablet) {
    return "grid-cols-2 gap-3 sm:gap-4";
  } else if (deviceInfo.isSmallLaptop) {
    return "grid-cols-2 md:grid-cols-3 gap-4 md:gap-5";
  } else {
    return "grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6";
  }
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const deviceInfo = useDeviceInfo();

  // محاسبه پدینگ فول ریسپانسیو
  const getPadding = () => {
    if (deviceInfo.isMobile) {
      return "p-1 xs:p-2";
    } else if (deviceInfo.isTablet) {
      return "p-2 sm:p-3";
    } else if (deviceInfo.isSmallLaptop) {
      return "p-3 md:p-4";
    } else {
      return "p-4 lg:p-6 xl:p-8";
    }
  };

  // محاسبه فاصله‌گذاری فول ریسپانسیو
  const getSpacing = () => {
    if (deviceInfo.isMobile) {
      return "space-y-2 xs:space-y-3";
    } else if (deviceInfo.isTablet) {
      return "space-y-3 sm:space-y-4";
    } else if (deviceInfo.isSmallLaptop) {
      return "space-y-4 md:space-y-5";
    } else {
      return "space-y-5 lg:space-y-6 xl:space-y-8";
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className={`w-full h-full overflow-y-auto overflow-x-hidden ${getPadding()} ${getSpacing()} relative`}
    >
      {/* Background decorations */}
      <BackgroundDecorations />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default DashboardLayout;
