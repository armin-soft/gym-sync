
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ProfessionalHeroSection } from "./hero/ProfessionalHeroSection";
import { ProfessionalMenuGrid } from "./menu/ProfessionalMenuGrid";
import { RecentStudentsCard } from "./RecentStudentsCard";
import { StatsCards } from "./stats/StatsCards";
import { ProgressCard } from "./ProgressCard";
import { ActivitySummaryCard } from "./activity/ActivitySummaryCard";
import { ModernCard } from "./cards/ModernCard";
import { Users, TrendingUp, Activity } from "lucide-react";

// Animation variants for child elements
const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

interface DashboardContentProps {
  stats: DashboardStats;
  currentTime: Date;
  students: Student[];
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const DashboardContent = ({ 
  stats, 
  currentTime, 
  students, 
  trainerProfile 
}: DashboardContentProps) => {
  const deviceInfo = useDeviceInfo();
  
  // Define grid layout class once to avoid conditional rendering issues
  const gridLayoutClass = deviceInfo.isMobile 
    ? "grid-cols-1" 
    : "grid-cols-1 lg:grid-cols-3";
  
  const mainContentClass = deviceInfo.isMobile 
    ? "" 
    : "lg:col-span-2 space-y-6";
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <ProfessionalHeroSection 
          stats={stats} 
          currentTime={currentTime} 
          trainerProfile={trainerProfile} 
        />
      </motion.div>

      {/* Professional Menu Grid */}
      <motion.div variants={itemVariants}>
        <ModernCard 
          title="منوی مدیریت" 
          icon={Users}
          className="bg-gradient-to-br from-white via-gray-50/50 to-slate-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900"
        >
          <ProfessionalMenuGrid />
        </ModernCard>
      </motion.div>

      {/* Stats and Analytics Section */}
      <motion.div
        variants={itemVariants}
        className={`grid gap-6 ${gridLayoutClass}`}
      >
        {/* Main Content - Students and Stats */}
        <motion.div 
          variants={itemVariants}
          className={mainContentClass}
        >
          {/* Students Section */}
          <ModernCard 
            title="شاگردان اخیر" 
            icon={Users}
            className="bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-emerald-50/80 dark:from-emerald-900/20 dark:via-teal-900/15 dark:to-emerald-900/20"
          >
            <RecentStudentsCard students={students} />
          </ModernCard>
          
          {/* Stats Cards */}
          <ModernCard 
            title="آمار عملکرد" 
            icon={TrendingUp}
            className="bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-blue-50/80 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-blue-900/20"
          >
            <StatsCards stats={stats} />
          </ModernCard>
        </motion.div>
        
        {/* Sidebar Content */}
        <motion.div 
          variants={itemVariants}
          className="space-y-6"
        >
          {/* Progress Card */}
          <ModernCard 
            title="پیشرفت کلی" 
            icon={TrendingUp}
            className="bg-gradient-to-br from-violet-50/80 via-purple-50/60 to-violet-50/80 dark:from-violet-900/20 dark:via-purple-900/15 dark:to-violet-900/20"
          >
            <ProgressCard stats={stats} />
          </ModernCard>

          {/* Activity Summary */}
          <ModernCard 
            title="خلاصه فعالیت‌ها" 
            icon={Activity}
            className="bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-amber-50/80 dark:from-amber-900/20 dark:via-orange-900/15 dark:to-amber-900/20"
          >
            <ActivitySummaryCard stats={stats} />
          </ModernCard>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardContent;
