
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { UserRound, Building, Globe, Sparkles } from "lucide-react";
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
  
  // Sections for navigation
  const sections = [
    { id: "personal", label: "اطلاعات شخصی", icon: UserRound },
    { id: "gym", label: "اطلاعات باشگاه", icon: Building },
    { id: "social", label: "شبکه‌های اجتماعی", icon: Globe }
  ];
  
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -8, 
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Card padding based on device
  const getCardPadding = () => {
    if (deviceInfo.isMobile) return "p-6";
    if (deviceInfo.isTablet) return "p-7";
    return "p-8";
  };

  return (
    <div className="space-y-6">
      <motion.div 
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="relative"
      >
        {/* Background decorations */}
        <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-indigo-500/5 rounded-3xl blur-xl opacity-60" />
        
        <Card className={cn(
          "relative backdrop-blur-2xl bg-white/60 dark:bg-gray-900/40 border-0 shadow-2xl overflow-hidden",
          "bg-gradient-to-br from-white/80 via-white/70 to-violet-50/30 dark:from-gray-800/80 dark:via-gray-700/70 dark:to-violet-900/20"
        )}>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-violet-500/5 to-transparent opacity-50" />
          
          <div className={cn(getCardPadding(), "relative z-10")}>
            <div className="space-y-6">
              {/* Profile Image with enhanced styling */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ProfileImageSection 
                  image={profile.image}
                  onImageChange={onImageChange}
                />
              </motion.div>
              
              {/* Profile Name with enhanced styling */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <ProfileInfo name={profile.name} />
              </motion.div>
              
              {/* Enhanced separator */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <Separator className="bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent blur-sm" />
              </motion.div>
              
              {/* Navigation Tabs - Desktop */}
              <div className="hidden lg:block">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <NavigationTabs 
                    sections={sections}
                    activeSection={activeSection}
                    onTabChange={onTabChange}
                  />
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div 
                className="absolute top-4 right-4 opacity-30"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <Sparkles className="w-4 h-4 text-violet-500" />
              </motion.div>
            </div>
          </div>

          {/* Enhanced corner decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-400/20 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-400/15 to-transparent rounded-full blur-lg" />
        </Card>
      </motion.div>
      
      {/* Enhanced Mobile Tabs */}
      {deviceInfo.isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-60" />
          
          <Card className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/50 border-0 shadow-lg p-4">
            <div className="flex overflow-x-auto no-scrollbar gap-2">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                >
                  <MobileTab
                    section={section}
                    isActive={activeSection === section.id}
                    onClick={() => onTabChange(section.id)}
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
