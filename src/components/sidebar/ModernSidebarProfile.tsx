
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronLeft, User, Crown, Zap } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ModernSidebarProfileProps {
  name: string;
  phone?: string;
  image?: string;
  onClose: () => void;
}

export function ModernSidebarProfile({
  name,
  phone,
  image,
  onClose
}: ModernSidebarProfileProps) {
  const deviceInfo = useDeviceInfo();
  
  const getProfilePadding = () => {
    if (deviceInfo.isMobile) return "p-4 py-5";
    if (deviceInfo.isTablet) return "p-5 py-6";
    return "p-6 py-7";
  };
  
  const getAvatarSize = () => {
    if (deviceInfo.isMobile) return "h-16 w-16";
    if (deviceInfo.isTablet) return "h-18 w-18";
    return "h-20 w-20";
  };
  
  const getNameSize = () => {
    if (deviceInfo.isMobile) return "text-lg";
    if (deviceInfo.isTablet) return "text-xl";
    return "text-2xl";
  };
  
  const getPhoneSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-base";
  };
  
  return (
    <motion.div 
      className={cn(
        "border-b border-gradient-to-r from-emerald-200/50 via-sky-200/50 to-emerald-200/50 dark:from-emerald-700/50 dark:via-sky-700/50 dark:to-emerald-700/50 bg-gradient-to-br from-emerald-50/90 via-sky-50/70 to-emerald-50/80 dark:from-emerald-800/80 dark:via-sky-800/60 dark:to-emerald-900/70 backdrop-blur-xl relative overflow-hidden",
        getProfilePadding()
      )}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/20 to-sky-400/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-400/20 to-emerald-400/10 rounded-full blur-xl" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          {/* Avatar with Advanced Styling */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-sky-500 to-emerald-600 rounded-full blur-md opacity-60" />
            <Avatar className={cn(
              "border-4 border-white/50 dark:border-gray-700/50 shadow-2xl relative z-10 bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-600", 
              getAvatarSize()
            )}>
              <AvatarImage src={image} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-600 text-white border-0">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            
            {/* Status Indicator */}
            <motion.div 
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-full border-3 border-white dark:border-gray-800 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>
          
          {/* Profile Info */}
          <div className="flex-1">
            <motion.h3 
              className={cn(
                "font-bold bg-gradient-to-r from-emerald-800 via-sky-700 to-emerald-600 dark:from-emerald-200 dark:via-sky-200 dark:to-emerald-300 bg-clip-text text-transparent",
                getNameSize()
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {name}
            </motion.h3>
            
            {phone && (
              <motion.p 
                className={cn(
                  "text-emerald-600 dark:text-emerald-400 font-medium",
                  getPhoneSize()
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                dir="ltr"
              >
                {phone}
              </motion.p>
            )}
            
            {/* Role Badge */}
            <motion.div 
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-300/30 dark:border-emerald-600/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Crown className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                مربی حرفه‌ای
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* Close Button */}
        <motion.button 
          onClick={onClose}
          className="rounded-full p-2.5 hover:bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-emerald-700 dark:to-sky-600 transition-all duration-300 group shadow-lg"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors" />
        </motion.button>
      </div>
    </motion.div>
  );
}
