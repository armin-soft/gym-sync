
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { User, Building, Globe, Camera, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ProfileImage } from "./ProfileImage";

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
  
  const sections = [
    { id: "personal", label: "اطلاعات شخصی", icon: User, color: "from-blue-500 to-cyan-500" },
    { id: "gym", label: "باشگاه", icon: Building, color: "from-emerald-500 to-teal-500" },
    { id: "social", label: "شبکه‌های اجتماعی", icon: Globe, color: "from-purple-500 to-pink-500" }
  ];

  if (deviceInfo.isMobile) {
    return (
      <div className="space-y-6">
        {/* Profile Card */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <ProfileImage 
              image={profile.image}
              onImageChange={onImageChange}
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {profile.name || "نام مربی"}
              </h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">پروفایل فعال</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Tabs */}
        <motion.div 
          className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex overflow-x-auto gap-3 pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => onTabChange(section.id)}
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-br text-white shadow-lg" 
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  )}
                  style={isActive ? { backgroundImage: `linear-gradient(to bottom right, ${section.color.split(' ')[1]}, ${section.color.split(' ')[3]})` } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium whitespace-nowrap">{section.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Profile Section */}
      <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-gray-100">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {profile.name || "نام مربی"}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-gray-600">پروفایل فعال</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="p-6">
        <div className="space-y-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => onTabChange(section.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-r text-white shadow-lg transform scale-105" 
                    : "text-gray-700 hover:bg-gray-50 hover:scale-102"
                )}
                style={isActive ? { backgroundImage: `linear-gradient(to right, ${section.color.split('from-')[1].split(' ')[0]}, ${section.color.split('to-')[1]})` } : {}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn(
                  "p-2 rounded-lg",
                  isActive ? "bg-white/20" : "bg-gray-100"
                )}>
                  <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-600")} />
                </div>
                <span className="font-medium">{section.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
