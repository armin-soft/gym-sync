
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ModernHeroSection } from "./sections/ModernHeroSection";
import { ProfessionalMenuGrid } from "./menu/ProfessionalMenuGrid";
import { RecentStudentsCard } from "./RecentStudentsCard";
import { StatsCards } from "./stats/StatsCards";
import { ProgressCard } from "./ProgressCard";
import { ActivitySummaryCard } from "./activity/ActivitySummaryCard";
import { NewModernCard } from "./cards/NewModernCard";
import { Users, Settings, Activity, BarChart3, Calendar, Target } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

interface NewDashboardContentProps {
  stats: DashboardStats;
  currentTime: Date;
  students: Student[];
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const NewDashboardContent = ({ 
  stats, 
  currentTime, 
  students, 
  trainerProfile 
}: NewDashboardContentProps) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <ModernHeroSection 
          stats={stats} 
          currentTime={currentTime} 
          trainerProfile={trainerProfile} 
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <NewModernCard 
          title="دسترسی سریع" 
          icon={Settings}
          gradient="from-blue-50/80 via-indigo-50/60 to-blue-50/80 dark:from-blue-900/20 dark:via-indigo-900/15 dark:to-blue-900/20"
        >
          <ProfessionalMenuGrid />
        </NewModernCard>
      </motion.div>

      {/* Main Grid */}
      <motion.div
        variants={itemVariants}
        className={`grid gap-6 ${deviceInfo.isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-12"}`}
      >
        {/* Left Column */}
        <div className={deviceInfo.isMobile ? "" : "lg:col-span-8 space-y-6"}>
          {/* Recent Students */}
          <NewModernCard 
            title="شاگردان اخیر" 
            icon={Users}
            gradient="from-emerald-50/80 via-teal-50/60 to-emerald-50/80 dark:from-emerald-900/20 dark:via-teal-900/15 dark:to-emerald-900/20"
          >
            <RecentStudentsCard students={students} />
          </NewModernCard>
          
          {/* Detailed Stats */}
          <NewModernCard 
            title="تحلیل عملکرد" 
            icon={BarChart3}
            gradient="from-purple-50/80 via-violet-50/60 to-purple-50/80 dark:from-purple-900/20 dark:via-violet-900/15 dark:to-purple-900/20"
          >
            <StatsCards stats={stats} />
          </NewModernCard>
        </div>
        
        {/* Right Column */}
        <div className={deviceInfo.isMobile ? "space-y-6" : "lg:col-span-4 space-y-6"}>
          {/* Progress Overview */}
          <NewModernCard 
            title="نمای کلی پیشرفت" 
            icon={Target}
            gradient="from-orange-50/80 via-amber-50/60 to-orange-50/80 dark:from-orange-900/20 dark:via-amber-900/15 dark:to-orange-900/20"
          >
            <ProgressCard stats={stats} />
          </NewModernCard>

          {/* Activity Summary */}
          <NewModernCard 
            title="فعالیت‌های اخیر" 
            icon={Activity}
            gradient="from-pink-50/80 via-rose-50/60 to-pink-50/80 dark:from-pink-900/20 dark:via-rose-900/15 dark:to-pink-900/20"
          >
            <ActivitySummaryCard stats={stats} />
          </NewModernCard>

          {/* Quick Calendar */}
          <NewModernCard 
            title="تقویم امروز" 
            icon={Calendar}
            gradient="from-cyan-50/80 via-sky-50/60 to-cyan-50/80 dark:from-cyan-900/20 dark:via-sky-900/15 dark:to-cyan-900/20"
          >
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {new Date().getDate()}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {new Date().toLocaleDateString('fa-IR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </NewModernCard>
        </div>
      </motion.div>
    </motion.div>
  );
};
