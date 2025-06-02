
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrainerProfile, SidebarStats } from "../types";
import { useSidebarDimensions } from "../utils/deviceUtils";
import { ProfileSection } from "./header/ProfileSection";
import { StatsGrid } from "./header/StatsGrid";
import { GymSection } from "./header/GymSection";

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
  const { getHeaderPadding } = useSidebarDimensions();

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
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-400/10 to-sky-400/5 rounded-full blur-2xl" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <ProfileSection profile={profile} />
        
        <motion.button 
          onClick={onClose}
          className="rounded-full p-2 bg-white/20 dark:bg-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-600/40 transition-all duration-300 group shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors" />
        </motion.button>
      </div>

      <StatsGrid stats={stats} />
      <GymSection profile={profile} />
    </motion.div>
  );
};
