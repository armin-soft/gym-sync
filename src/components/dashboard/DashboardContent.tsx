
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useBrandTheme } from "@/hooks/use-brand-theme";
import { HeroSection } from "./HeroSection";
import { MainMenuGrid } from "./MainMenuGrid";
import { RecentStudentsCard } from "./RecentStudentsCard";
import { StatsCards } from "./stats/StatsCards";
import { ProgressCard } from "./ProgressCard";
import { ActivitySummaryCard } from "./activity/ActivitySummaryCard";
import { getGridLayout } from "./layout/DashboardLayout";

// Animation variants for child elements
const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
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
  const gridLayout = getGridLayout();
  const { getGradientClass } = useBrandTheme();
  
  return (
    <div className={`min-h-screen ${getGradientClass('accent')} bg-opacity-5`}>
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <HeroSection 
          stats={stats} 
          currentTime={currentTime} 
          trainerProfile={trainerProfile} 
        />
      </motion.div>

      {/* Main Menu Grid */}
      <motion.div 
        variants={itemVariants}
        className="mt-4 sm:mt-5 md:mt-6"
      >
        <MainMenuGrid />
      </motion.div>

      {/* Stats and Recent Students */}
      <motion.div
        variants={itemVariants}
        className={`mt-4 sm:mt-5 md:mt-6 grid ${gridLayout}`}
      >
        {/* First column on larger screens */}
        <motion.div 
          variants={itemVariants}
          className={deviceInfo.isMobile ? "" : "md:col-span-2 space-y-4 sm:space-y-5 md:space-y-6"}
        >
          {/* Students Card */}
          <motion.div variants={itemVariants}>
            <RecentStudentsCard students={students} />
          </motion.div>
          
          {deviceInfo.isMobile && (
            <>
              {/* Progress Card - Show here on mobile */}
              <motion.div variants={itemVariants}>
                <ProgressCard stats={stats} />
              </motion.div>
              
              {/* Activity Summary Card - Show here on mobile */}
              <motion.div variants={itemVariants}>
                <ActivitySummaryCard stats={stats} />
              </motion.div>
            </>
          )}
          
          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <StatsCards stats={stats} />
          </motion.div>
        </motion.div>
        
        {!deviceInfo.isMobile && (
          <motion.div 
            variants={itemVariants}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Progress Card */}
            <motion.div variants={itemVariants}>
              <ProgressCard stats={stats} />
            </motion.div>

            {/* Activity Summary Card */}
            <motion.div variants={itemVariants}>
              <ActivitySummaryCard stats={stats} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardContent;
