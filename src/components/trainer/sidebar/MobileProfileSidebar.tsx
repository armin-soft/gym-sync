
import { motion } from "framer-motion";
import { ProfileCard } from "./ProfileCard";
import { SidebarTab } from "./SidebarTab";
import { sections } from "./sidebarConfig";

interface MobileProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const MobileProfileSidebar = ({ 
  profile, 
  onImageChange, 
  activeSection, 
  onTabChange 
}: MobileProfileSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <ProfileCard 
        profile={profile}
        onImageChange={onImageChange}
        isMobile={true}
      />

      {/* Mobile Tabs */}
      <motion.div 
        className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="p-4">
          <div className="flex overflow-x-auto gap-3 pb-2">
            {sections.map((section, index) => (
              <SidebarTab
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                onTabChange={onTabChange}
                index={index}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
