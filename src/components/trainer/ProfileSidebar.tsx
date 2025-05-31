
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { UserRound, Building, Globe } from "lucide-react";
import { useState } from "react";
import { NavigationTabs } from "./sidebar/NavigationTabs";
import { MobileTab } from "./sidebar/MobileTab";
import { ProfileImageSection } from "./sidebar/ProfileImageSection";
import { ProfileInfo } from "./sidebar/ProfileInfo";

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
              <ProfileImageSection 
                image={profile.image}
                onImageChange={onImageChange}
              />
              
              {/* Profile Name */}
              <ProfileInfo name={profile.name} />
              
              <Separator />
              
              {/* Navigation Tabs - Desktop */}
              <div className="hidden lg:block">
                <NavigationTabs 
                  sections={sections}
                  activeSection={activeSection}
                  onTabChange={onTabChange}
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
