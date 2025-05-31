
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ModernHeroSection } from "./ModernHeroSection";
import { ModernMainMenuGrid } from "./ModernMainMenuGrid";
import { ModernRecentStudentsCard } from "./ModernRecentStudentsCard";
import { ModernStatsCards } from "./stats/ModernStatsCards";
import { ModernProgressCard } from "./ModernProgressCard";
import { ModernActivitySummaryCard } from "./activity/ModernActivitySummaryCard";

// Animation variants for child elements
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.15,
      ease: "easeOut"
    }
  }
};

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
  // Always call hooks at the top level - never conditionally
  const deviceInfo = useDeviceInfo();
  
  // Ensure we have valid data before rendering
  const safeStats = stats || {
    totalStudents: 0,
    totalMeals: 0,
    totalSupplements: 0,
    studentGrowth: 0,
    mealGrowth: 0,
    supplementGrowth: 0,
    studentsProgress: 0,
    maxCapacity: 50,
    mealCompletionRate: 0,
    supplementCompletionRate: 0
  };

  const safeStudents = Array.isArray(students) ? students : [];
  const safeCurrentTime = currentTime || new Date();
  const safeTrainerProfile = trainerProfile || {
    name: "مربی حرفه‌ای",
    image: "/placeholder.svg"
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-yellow-50/20 dark:from-slate-900 dark:via-blue-950/30 dark:to-yellow-950/20"
      dir="rtl"
    >
      {/* خطوط تزیینی پس‌زمینه */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-500/3 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <ModernHeroSection 
            stats={safeStats} 
            currentTime={safeCurrentTime} 
            trainerProfile={safeTrainerProfile} 
          />
        </motion.div>

        {/* Main Menu Grid */}
        <motion.div variants={itemVariants}>
          <ModernMainMenuGrid />
        </motion.div>

        {/* Stats and Content Grid */}
        <motion.div
          variants={itemVariants}
          className={`grid gap-8 ${
            deviceInfo.isMobile 
              ? "grid-cols-1" 
              : deviceInfo.isTablet 
                ? "grid-cols-1 lg:grid-cols-3" 
                : "grid-cols-1 lg:grid-cols-3"
          }`}
        >
          {/* Main Content Column */}
          <div className={`${deviceInfo.isMobile ? "col-span-1" : "lg:col-span-2"} space-y-8`}>
            {/* Students Card */}
            <motion.div variants={itemVariants}>
              <ModernRecentStudentsCard students={safeStudents} />
            </motion.div>
            
            {/* Stats Cards */}
            <motion.div variants={itemVariants}>
              <ModernStatsCards stats={safeStats} />
            </motion.div>
          </div>
          
          {/* Sidebar Content */}
          <div className="space-y-8">
            {/* Progress Card */}
            <motion.div variants={itemVariants}>
              <ModernProgressCard stats={safeStats} />
            </motion.div>

            {/* Activity Summary Card */}
            <motion.div variants={itemVariants}>
              <ModernActivitySummaryCard stats={safeStats} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardContent;
