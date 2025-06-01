
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Building, Globe, CheckCircle, Crown } from "lucide-react";
import { ProfileImage } from "./ProfileImage";

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

const sections = [
  { 
    id: "personal", 
    label: "اطلاعات شخصی", 
    icon: User, 
    gradient: "from-violet-500 to-purple-600",
    description: "مدیریت اطلاعات شخصی"
  },
  { 
    id: "gym", 
    label: "باشگاه", 
    icon: Building, 
    gradient: "from-blue-500 to-cyan-600",
    description: "اطلاعات باشگاه"
  },
  { 
    id: "social", 
    label: "شبکه‌های اجتماعی", 
    icon: Globe, 
    gradient: "from-emerald-500 to-teal-600",
    description: "حضور آنلاین"
  }
];

const MobileView = ({ profile, onImageChange, activeSection, onTabChange }: ProfileSidebarProps) => (
  <div className="space-y-6">
    {/* Profile Card */}
    <motion.div 
      className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 text-center space-y-4">
        <ProfileImage 
          image={profile.image}
          onImageChange={onImageChange}
        />
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            {profile.name || "نام مربی"}
          </h3>
          {profile.phone && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1" dir="ltr">{profile.phone}</p>
          )}
          <div className="flex items-center justify-center gap-2 mt-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">پروفایل فعال</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Mobile Tabs */}
    <motion.div 
      className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="p-4">
        <div className="flex overflow-x-auto gap-3 pb-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => onTabChange(section.id)}
                className={cn(
                  "flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 relative",
                  isActive 
                    ? "text-white shadow-lg" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)} />
                )}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium whitespace-nowrap">{section.label}</span>
                </div>
              </motion.button>
            );
          })}
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
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ProfileImage 
            image={profile.image}
            onImageChange={onImageChange}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {profile.name || "نام مربی"}
            </h3>
          </div>
          {profile.phone && (
            <p className="text-gray-600 dark:text-gray-400 mb-2" dir="ltr">{profile.phone}</p>
          )}
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">پروفایل فعال</span>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Navigation Tabs */}
    <div className="relative z-10 p-6">
      <div className="space-y-3">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              onClick={() => onTabChange(section.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all duration-300 relative group",
                isActive 
                  ? "text-white shadow-lg transform scale-105" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: isActive ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-r", section.gradient)} />
              )}
              
              <div className="relative z-10 flex items-center gap-4 w-full">
                <div className={cn(
                  "p-2 rounded-lg",
                  isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-right">
                  <div className="font-medium">{section.label}</div>
                  <div className={cn(
                    "text-xs mt-0.5",
                    isActive ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {section.description}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
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
