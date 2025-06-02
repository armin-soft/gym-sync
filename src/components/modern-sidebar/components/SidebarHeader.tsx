
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, User, Crown, Star, Users, Target, Award } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { TrainerProfile, SidebarStats } from "../types";

interface SidebarHeaderProps {
  profile: TrainerProfile;
  stats: SidebarStats;
  onClose: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  profile,
  stats,
  onClose
}) => {
  const deviceInfo = useDeviceInfo();
  
  const getHeaderPadding = () => {
    if (deviceInfo.isMobile) return "p-5 py-6";
    if (deviceInfo.isTablet) return "p-6 py-7";
    return "p-7 py-8";
  };

  const getStatusColor = () => {
    switch (profile.status) {
      case 'active': return 'bg-emerald-500';
      case 'busy': return 'bg-amber-500';
      case 'offline': return 'bg-slate-400';
      default: return 'bg-emerald-500';
    }
  };

  const getStatusText = () => {
    switch (profile.status) {
      case 'active': return 'فعال';
      case 'busy': return 'مشغول';
      case 'offline': return 'آفلاین';
      default: return 'فعال';
    }
  };

  return (
    <motion.div 
      className={cn(
        "border-b border-emerald-200/40 dark:border-emerald-700/40 bg-gradient-to-br from-white/60 via-emerald-50/80 to-sky-50/60 dark:from-slate-800/60 dark:via-emerald-900/80 dark:to-sky-900/60 backdrop-blur-sm relative overflow-hidden",
        getHeaderPadding()
      )}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-400/15 to-sky-400/10 rounded-full blur-2xl" />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        {/* Profile Section */}
        <div className="flex items-center gap-4 flex-1">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-sky-500 to-emerald-600 rounded-full blur-lg opacity-50" />
            <Avatar className="relative z-10 h-16 w-16 border-3 border-white/50 dark:border-slate-700/50 shadow-xl">
              <AvatarImage src={profile.image} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-sky-600 text-white text-lg font-bold">
                <User className="h-7 w-7" />
              </AvatarFallback>
            </Avatar>
            
            {/* Status indicator */}
            <motion.div 
              className={cn(
                "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 shadow-md",
                getStatusColor()
              )}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              className="text-xl font-bold bg-gradient-to-r from-emerald-800 via-sky-700 to-emerald-600 dark:from-emerald-200 dark:via-sky-200 dark:to-emerald-300 bg-clip-text text-transparent mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {profile.name}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              dir="ltr"
            >
              {toPersianNumbers(profile.phone)}
            </motion.p>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300">
                <Crown className="h-3 w-3 ml-1" />
                مربی حرفه‌ای
              </Badge>
              <Badge variant="outline" className={cn("text-xs", getStatusColor().replace('bg-', 'text-'))}>
                {getStatusText()}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Close Button */}
        <motion.button 
          onClick={onClose}
          className="rounded-full p-2.5 bg-white/20 dark:bg-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-600/40 transition-all duration-300 group shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors" />
        </motion.button>
      </div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-4 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-xl p-3 text-center border border-emerald-200/30 dark:border-emerald-700/30">
          <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-emerald-800 dark:text-emerald-200">
            {toPersianNumbers(stats.totalStudents.toString())}
          </div>
          <div className="text-2xs text-emerald-600 dark:text-emerald-400">شاگرد</div>
        </div>
        
        <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-xl p-3 text-center border border-sky-200/30 dark:border-sky-700/30">
          <Target className="h-4 w-4 text-sky-600 dark:text-sky-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-sky-800 dark:text-sky-200">
            {toPersianNumbers(stats.activePrograms.toString())}
          </div>
          <div className="text-2xs text-sky-600 dark:text-sky-400">برنامه</div>
        </div>
        
        <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-xl p-3 text-center border border-emerald-200/30 dark:border-emerald-700/30">
          <Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-emerald-800 dark:text-emerald-200">
            {toPersianNumbers(stats.completedSessions.toString())}
          </div>
          <div className="text-2xs text-emerald-600 dark:text-emerald-400">جلسه</div>
        </div>
        
        <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-xl p-3 text-center border border-amber-200/30 dark:border-amber-700/30">
          <Star className="h-4 w-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-amber-800 dark:text-amber-200">
            {toPersianNumbers(stats.rating.toString())}
          </div>
          <div className="text-2xs text-amber-600 dark:text-amber-400">امتیاز</div>
        </div>
      </motion.div>

      {/* Gym Name Section */}
      {profile.gymName && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-300/30 dark:border-emerald-600/30 rounded-full px-4 py-2 backdrop-blur-sm">
            <Crown className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {profile.gymName}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
