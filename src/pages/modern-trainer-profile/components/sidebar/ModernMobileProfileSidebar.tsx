
import React from "react";
import { motion } from "framer-motion";
import { ModernProfileCard } from "./ModernProfileCard";
import { ModernSidebarTabs } from "./ModernSidebarTabs";

interface ModernMobileProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ModernMobileProfileSidebar = ({ 
  profile, 
  onImageChange, 
  activeSection, 
  onSectionChange 
}: ModernMobileProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* کارت پروفایل */}
      <ModernProfileCard 
        profile={profile}
        onImageChange={onImageChange}
        isMobile={true}
      />

      {/* تب‌های موبایل */}
      <motion.div 
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/50 dark:border-emerald-800/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="p-6">
          <ModernSidebarTabs
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            isMobile={true}
          />
        </div>
      </motion.div>
    </div>
  );
};
