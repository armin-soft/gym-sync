
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useSidebarDimensions } from "@/components/modern-sidebar/utils/deviceUtils";
import { cn } from "@/lib/utils";
import { StudentProfile } from "../../types/studentSidebarTypes";

interface StudentProfileSectionProps {
  profile: StudentProfile;
}

export const StudentProfileSection: React.FC<StudentProfileSectionProps> = ({ profile }) => {
  const { deviceInfo } = useSidebarDimensions();
  
  const getAvatarSize = () => {
    if (deviceInfo.isMobile) return "h-12 w-12";
    if (deviceInfo.isTablet) return "h-14 w-14";
    return "h-16 w-16";
  };

  const getNameSize = () => {
    if (deviceInfo.isMobile) return "text-lg";
    if (deviceInfo.isTablet) return "text-xl";
    return "text-2xl";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'busy':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'فعال';
      case 'busy': return 'در حال تمرین';
      default: return 'آفلاین';
    }
  };

  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative">
        <Avatar className={cn(
          getAvatarSize(),
          "border-2 border-white/50 dark:border-slate-600/50 shadow-lg bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-800 dark:to-sky-800"
        )}>
          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-500 text-white font-bold">
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        
        <motion.div
          className={cn(
            "absolute -bottom-1 -left-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800",
            profile.status === 'active' ? 'bg-green-500' :
            profile.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
          )}
          animate={{
            scale: profile.status === 'active' ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: profile.status === 'active' ? Infinity : 0,
          }}
        />
      </div>
      
      <div className="flex-1 space-y-1">
        <h3 className={cn(
          "font-bold text-emerald-900 dark:text-emerald-100",
          getNameSize()
        )}>
          {profile.name}
        </h3>
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-1",
              getStatusColor(profile.status)
            )}
          >
            {getStatusText(profile.status)}
          </Badge>
          
          <Badge 
            variant="outline"
            className="text-xs px-2 py-1 bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700"
          >
            سطح: {profile.level}
          </Badge>
        </div>
        
        <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70">
          عضو از: {profile.membersSince}
        </p>
      </div>
    </motion.div>
  );
};
