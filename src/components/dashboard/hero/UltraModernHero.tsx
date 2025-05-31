
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { ModernDashboardHeader } from "../header/ModernDashboardHeader";
import { ProfileSection } from "./ProfileSection";

interface UltraModernHeroProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const UltraModernHero = ({ 
  stats, 
  currentTime, 
  trainerProfile 
}: UltraModernHeroProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Modern Header */}
      <ModernDashboardHeader 
        trainerProfile={trainerProfile}
        stats={stats}
        currentTime={currentTime}
      />
      
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-900 p-8 mb-8 overflow-hidden shadow-2xl"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-transparent rounded-full blur-3xl" />
        
        {/* Profile Section */}
        <div className="relative z-10">
          <ProfileSection 
            trainerProfile={trainerProfile} 
            stats={stats} 
          />
        </div>
      </motion.div>
    </div>
  );
};
