
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChevronLeft, User, Crown, Zap } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ModernSidebarProfileProps {
  name: string;
  email?: string;
  image?: string;
  onClose: () => void;
}

export function ModernSidebarProfile({
  name,
  email,
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
  
  const getEmailSize = () => {
    if (deviceInfo.isMobile) return "text-sm";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-base";
  };
  
  return (
    <motion.div 
      className={cn(
        "border-b border-gradient-to-r from-violet-200/40 via-blue-200/40 to-purple-200/40 dark:from-violet-700/40 dark:via-blue-700/40 dark:to-purple-700/40 bg-gradient-to-br from-white/80 via-gray-50/60 to-violet-50/40 dark:from-gray-800/80 dark:via-gray-700/60 dark:to-violet-900/40 backdrop-blur-xl relative overflow-hidden",
        getProfilePadding()
      )}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-400/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-xl" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          {/* Avatar with Advanced Styling */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-blue-500 to-purple-600 rounded-full blur-md opacity-60" />
            <Avatar className={cn(
              "border-4 border-white/50 dark:border-gray-700/50 shadow-2xl relative z-10 bg-gradient-to-br from-gray-100 to-white dark:from-gray-700 dark:to-gray-600", 
              getAvatarSize()
            )}>
              <AvatarImage src={image} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            
            {/* Status Indicator */}
            <motion.div 
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-3 border-white dark:border-gray-800 flex items-center justify-center shadow-lg"
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
                "font-bold bg-gradient-to-r from-slate-800 via-gray-700 to-slate-600 dark:from-white dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent",
                getNameSize()
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {name}
            </motion.h3>
            
            {email && (
              <motion.p 
                className={cn(
                  "text-slate-600 dark:text-slate-400 font-medium",
                  getEmailSize()
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {email}
              </motion.p>
            )}
            
            {/* Role Badge */}
            <motion.div 
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-300/30 dark:border-violet-600/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Crown className="h-3 w-3 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                مربی حرفه‌ای
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* Close Button */}
        <motion.button 
          onClick={onClose}
          className="rounded-full p-2.5 hover:bg-gradient-to-br from-slate-100 to-gray-100 dark:from-gray-700 dark:to-gray-600 transition-all duration-300 group shadow-lg"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors" />
        </motion.button>
      </div>
    </motion.div>
  );
}
