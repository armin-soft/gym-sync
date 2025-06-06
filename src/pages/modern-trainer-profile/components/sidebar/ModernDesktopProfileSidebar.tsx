
import React from "react";
import { motion } from "framer-motion";
import { ModernProfileCard } from "./ModernProfileCard";
import { ModernSidebarTabs } from "./ModernSidebarTabs";
import { ModernSidebarBackground } from "./ModernSidebarBackground";

interface ModernDesktopProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ModernDesktopProfileSidebar = ({ 
  profile, 
  onImageChange, 
  activeSection, 
  onSectionChange 
}: ModernDesktopProfileSidebarProps) => {
  return (
    <motion.div 
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 dark:border-emerald-800/30 overflow-hidden"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ModernSidebarBackground />
      
      {/* بخش پروفایل */}
      <div className="relative z-10 p-8 border-b border-emerald-100/30 dark:border-emerald-800/30 bg-gradient-to-l from-emerald-50/50 to-sky-50/30 dark:from-emerald-900/20 dark:to-sky-900/20">
        <ModernProfileCard 
          profile={profile}
          onImageChange={onImageChange}
          isMobile={false}
        />
      </div>

      {/* تب‌های ناوبری */}
      <div className="relative z-10 p-6">
        <ModernSidebarTabs
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          isMobile={false}
        />
      </div>
    </motion.div>
  );
};
