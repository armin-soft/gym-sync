
import { motion } from "framer-motion";
import { ModernProfileCard } from "./sidebar/ModernProfileCard";
import { ModernSidebarTabs } from "./sidebar/ModernSidebarTabs";
import { ModernSidebarBackground } from "./sidebar/ModernSidebarBackground";

interface ModernProfileSidebarProps {
  profileData: any;
  deviceInfo: any;
}

export const ModernProfileSidebar = ({ profileData, deviceInfo }: ModernProfileSidebarProps) => {
  if (deviceInfo.isMobile) {
    return (
      <div className="space-y-6">
        <ModernProfileCard 
          profileData={profileData}
          deviceInfo={deviceInfo}
        />
        <ModernSidebarTabs 
          profileData={profileData}
          deviceInfo={deviceInfo}
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <div className="bg-gradient-to-br from-white/80 via-blue-50/80 to-indigo-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20">
        <ModernSidebarBackground />
        
        <div className="relative z-10 p-8 space-y-8">
          <ModernProfileCard 
            profileData={profileData}
            deviceInfo={deviceInfo}
          />
          
          <div className="border-t border-gradient-to-r from-blue-200/30 via-purple-200/30 to-indigo-200/30 dark:from-blue-700/30 dark:via-purple-700/30 dark:to-indigo-700/30 pt-8">
            <ModernSidebarTabs 
              profileData={profileData}
              deviceInfo={deviceInfo}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
