
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { UltraModernHero } from "./hero/UltraModernHero";
import { SmartStatsGrid } from "./stats/SmartStatsGrid";
import { IntelligentQuickActions } from "./actions/IntelligentQuickActions";
import { AdvancedStudentsOverview } from "./students/AdvancedStudentsOverview";
import { ProfessionalInsightsPanel } from "./insights/ProfessionalInsightsPanel";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1]
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
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900"
    >
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/5 to-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 space-y-8 p-4 lg:p-8">
        {/* Ultra Modern Hero Section */}
        <motion.div variants={itemVariants}>
          <UltraModernHero 
            stats={stats} 
            currentTime={currentTime} 
            trainerProfile={trainerProfile} 
          />
        </motion.div>

        {/* Smart Stats Grid */}
        <motion.div variants={itemVariants}>
          <SmartStatsGrid stats={stats} />
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid gap-8 ${deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-3'}`}>
          {/* Left Column - Primary Content */}
          <motion.div 
            variants={itemVariants}
            className={deviceInfo.isMobile ? '' : 'xl:col-span-2 space-y-8'}
          >
            {/* Intelligent Quick Actions */}
            <IntelligentQuickActions />
            
            {/* Advanced Students Overview */}
            <AdvancedStudentsOverview students={students} />
          </motion.div>
          
          {/* Right Column - Insights Only */}
          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Professional Insights Panel */}
            <ProfessionalInsightsPanel stats={stats} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardContent;
