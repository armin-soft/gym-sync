
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { EliteHeroSection } from "./EliteHeroSection";
import { EliteMenuGrid } from "./EliteMenuGrid";
import { EliteStudentsCard } from "./EliteStudentsCard";
import { EliteStatsCards } from "./stats/EliteStatsCards";
import { EliteProgressCard } from "./EliteProgressCard";
import { EliteActivityCard } from "./activity/EliteActivityCard";

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
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
  const deviceInfo = useDeviceInfo();
  
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
      className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
      dir="rtl"
    >
      {/* Modern geometric background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-200/20 via-purple-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-200/20 via-blue-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-br from-emerald-200/10 via-teal-200/5 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <EliteHeroSection 
            stats={safeStats} 
            currentTime={safeCurrentTime} 
            trainerProfile={safeTrainerProfile} 
          />
        </motion.div>

        {/* Main Menu */}
        <motion.div variants={itemVariants}>
          <EliteMenuGrid />
        </motion.div>

        {/* Content Grid */}
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
          {/* Main Content */}
          <div className={`${deviceInfo.isMobile ? "col-span-1" : "lg:col-span-2"} space-y-8`}>
            <motion.div variants={itemVariants}>
              <EliteStudentsCard students={safeStudents} />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <EliteStatsCards stats={safeStats} />
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <EliteProgressCard stats={safeStats} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EliteActivityCard stats={safeStats} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardContent;
