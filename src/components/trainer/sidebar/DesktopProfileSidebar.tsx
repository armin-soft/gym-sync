
import { motion } from "framer-motion";
import { ProfileCard } from "./ProfileCard";
import { SidebarTab } from "./SidebarTab";
import { sections } from "./sidebarConfig";
import { SidebarBackgroundDecorations } from "./SidebarBackgroundDecorations";

interface DesktopProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const DesktopProfileSidebar = ({ 
  profile, 
  onImageChange, 
  activeSection, 
  onTabChange 
}: DesktopProfileSidebarProps) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SidebarBackgroundDecorations />
      
      {/* Profile Section */}
      <div className="relative z-10 p-8 border-b border-gradient-to-r from-violet-200/30 via-blue-200/30 to-purple-200/30 dark:from-violet-700/30 dark:via-blue-700/30 dark:to-purple-700/30 bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm">
        <ProfileCard 
          profile={profile}
          onImageChange={onImageChange}
          isMobile={false}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 p-6">
        <div className="space-y-3">
          {sections.map((section, index) => (
            <SidebarTab
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onTabChange={onTabChange}
              index={index}
              isMobile={false}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
