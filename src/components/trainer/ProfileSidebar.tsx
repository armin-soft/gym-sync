
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { ProfileCard } from "./sidebar/ProfileCard";
import { SidebarTab } from "./sidebar/SidebarTab";
import { sections } from "./sidebar/sidebarConfig";

interface ProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
    phone?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onTabChange: (section: string) => void;
}

const MobileView = ({ profile, onImageChange, activeSection, onTabChange }: ProfileSidebarProps) => (
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

const DesktopView = ({ profile, onImageChange, activeSection, onTabChange }: ProfileSidebarProps) => (
  <motion.div 
    className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
    {/* Background Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
    
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

    {/* Decorative Elements */}
    <div className="absolute top-20 left-4 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-20 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
  </motion.div>
);

export const ProfileSidebar = (props: ProfileSidebarProps) => {
  const deviceInfo = useDeviceInfo();
  
  return deviceInfo.isMobile ? <MobileView {...props} /> : <DesktopView {...props} />;
};
