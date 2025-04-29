
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { UserRound, Building, Globe, Camera } from "lucide-react";
import { ProfileImage } from "./ProfileImage";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface ProfileSidebarProps {
  profile: {
    image: string;
    name?: string;
  };
  onImageChange: (image: string) => void;
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const ProfileSidebar = ({ 
  profile, 
  onImageChange, 
  activeSection, 
  onTabChange 
}: ProfileSidebarProps) => {
  const deviceInfo = useDeviceInfo();
  const [showMobileTabs, setShowMobileTabs] = useState(true);
  
  // Sections for navigation
  const sections = [
    { id: "personal", label: "اطلاعات شخصی", icon: UserRound },
    { id: "gym", label: "اطلاعات باشگاه", icon: Building },
    { id: "social", label: "شبکه‌های اجتماعی", icon: Globe }
  ];
  
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
  };
  
  const tabVariants = {
    active: { 
      backgroundColor: "hsl(var(--primary))", 
      color: "hsl(var(--primary-foreground))",
      scale: 1,
    },
    inactive: { 
      backgroundColor: "transparent", 
      color: "hsl(var(--muted-foreground))",
      scale: 0.98,
    }
  };

  // Card padding based on device
  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-5";
    if (deviceInfo.isTablet) return "p-6";
    return "p-6";
  };

  return (
    <div className="space-y-5">
      <motion.div 
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <Card className={cn(
          "backdrop-blur-xl bg-white/50 dark:bg-gray-900/30 border-primary/10 shadow-xl overflow-hidden",
          "transition-all duration-300 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-900/40"
        )}>
          <div className={getCardPadding()}>
            <div className="space-y-5">
              {/* Profile Image */}
              <div className="relative mx-auto">
                <ProfileImage 
                  image={profile.image}
                  onImageChange={onImageChange}
                />
                
                <motion.div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-md rounded-full px-3 py-1 flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Camera className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-xs font-medium">تغییر تصویر</span>
                </motion.div>
              </div>
              
              {/* Profile Name */}
              <motion.div
                className="text-center space-y-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-bold text-lg bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-white bg-clip-text text-transparent">
                  {profile.name || "نام مربی"}
                </h3>
                <div className="flex justify-center gap-1.5">
                  <Badge variant="outline" className="text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                    مربی
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                    فعال
                  </Badge>
                </div>
              </motion.div>
              
              <Separator />
              
              {/* Navigation Tabs - Desktop */}
              <div className="hidden lg:block">
                <NavigationTabs 
                  sections={sections}
                  activeSection={activeSection}
                  onTabChange={onTabChange}
                  tabVariants={tabVariants}
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Mobile Tabs */}
      {deviceInfo.isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-xl bg-white/50 dark:bg-gray-900/30 border-primary/10 shadow-lg p-3">
            <div className="flex overflow-x-auto no-scrollbar gap-2">
              {sections.map((section) => (
                <MobileTab
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={() => onTabChange(section.id)}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

interface TabSectionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationTabsProps {
  sections: TabSectionType[];
  activeSection: string;
  onTabChange: (section: string) => void;
  tabVariants: any;
}

const NavigationTabs = ({ 
  sections, 
  activeSection, 
  onTabChange, 
  tabVariants 
}: NavigationTabsProps) => {
  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <motion.button
            key={section.id}
            onClick={() => onTabChange(section.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              activeSection === section.id 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-muted/50"
            )}
            variants={tabVariants}
            initial="inactive"
            animate={activeSection === section.id ? "active" : "inactive"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className={cn(
              "h-4.5 w-4.5",
              activeSection === section.id ? "text-primary-foreground" : "text-muted-foreground"
            )} />
            <span>{section.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

interface MobileTabProps {
  section: TabSectionType;
  isActive: boolean;
  onClick: () => void;
}

const MobileTab = ({ section, isActive, onClick }: MobileTabProps) => {
  const Icon = section.icon;
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg",
        "transition-all duration-200",
        isActive 
          ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md" 
          : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs whitespace-nowrap">{section.label}</span>
    </motion.button>
  );
};
