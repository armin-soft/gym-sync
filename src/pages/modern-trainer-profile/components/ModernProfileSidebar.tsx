
import React from "react";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ModernMobileProfileSidebar } from "./sidebar/ModernMobileProfileSidebar";
import { ModernDesktopProfileSidebar } from "./sidebar/ModernDesktopProfileSidebar";

interface ModernProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ModernProfileSidebar = (props: ModernProfileSidebarProps) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {deviceInfo.isMobile ? (
        <ModernMobileProfileSidebar {...props} />
      ) : (
        <ModernDesktopProfileSidebar {...props} />
      )}
    </motion.div>
  );
};
