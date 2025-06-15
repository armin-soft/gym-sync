
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { getStatusColor, getStatusText } from "@/components/modern-sidebar/utils/statusUtils";
import { StudentProfile } from "../../types/studentSidebarTypes";

interface StudentProfileSectionProps {
  profile: StudentProfile;
}

export const StudentProfileSection: React.FC<StudentProfileSectionProps> = ({ profile }) => {
  const { deviceInfo } = useSidebarDimensions();
  
  const getImageSize = () => {
    if (deviceInfo.isMobile) return "h-12 w-12";
    if (deviceInfo.isTablet) return "h-14 w-14";
    return "h-16 w-16";
  };

  const getNameSize = () => {
    if (deviceInfo.isMobile) return "text-base";
    if (deviceInfo.isTablet) return "text-lg";
    return "text-xl";
  };

  const getBadgeSize = () => {
    if (deviceInfo.isMobile) return "text-xs px-1.5 py-0.5";
    return "text-xs px-2 py-1";
  };

  return (
    <motion.div 
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      dir="rtl"
    >
      <div className="relative flex-shrink-0">
        <motion.div 
          className={cn(
            "rounded-full border-2 border-white/50 shadow-lg overflow-hidden bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-800 dark:to-sky-800",
            getImageSize()
          )}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {profile.image ? (
            <img 
              src={profile.image} 
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {profile.name?.charAt(0) || "ش"}
              </span>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className={cn(
            "absolute -bottom-1 -left-1 w-4 h-4 border-2 border-white rounded-full shadow-lg",
            getStatusColor(profile.status)
          )}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      <div className="flex-1 min-w-0 text-right">
        <motion.h3 
          className={cn(
            "font-bold text-gray-900 dark:text-white truncate",
            getNameSize()
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {profile.name}
        </motion.h3>
        
        <div className="flex items-center gap-2 mt-1">
          <Badge 
            variant="outline" 
            className={cn(
              "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-600",
              getBadgeSize()
            )}
          >
            {profile.level}
          </Badge>
          
          <Badge 
            variant="outline" 
            className={cn(
              "border-emerald-200 dark:border-emerald-600",
              getStatusColor(profile.status).replace('bg-', 'bg-').replace('-500', '-50 dark:bg-').replace('-500', '-900/30'),
              getStatusColor(profile.status).replace('bg-', 'text-').replace('-500', '-700 dark:text-').replace('-500', '-300'),
              getBadgeSize()
            )}
          >
            {getStatusText(profile.status)}
          </Badge>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          عضو از: {profile.membersSince}
        </p>
      </div>
    </motion.div>
  );
};
