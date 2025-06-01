
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
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7,
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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* افکت‌های پس‌زمینه */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-violet-500/5 to-purple-600/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 40, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-indigo-500/5 to-blue-600/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 50, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/3 to-teal-600/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 space-y-10 p-6 lg:p-10">
        {/* Hero Section */}
        <motion.div variants={itemVariants}>
          <UltraModernHero 
            stats={stats} 
            currentTime={currentTime} 
            trainerProfile={trainerProfile} 
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants}>
          <SmartStatsGrid stats={stats} />
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid gap-10 ${deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-3'}`}>
          {/* ستون اصلی - محتوای اولیه */}
          <motion.div 
            variants={itemVariants}
            className={deviceInfo.isMobile ? '' : 'xl:col-span-2 space-y-10'}
          >
            {/* اقدامات سریع هوشمند */}
            <IntelligentQuickActions />
            
            {/* نمای کلی شاگردان پیشرفته */}
            <AdvancedStudentsOverview students={students} />
          </motion.div>
          
          {/* ستون کناری - پنل بینش‌ها */}
          <motion.div 
            variants={itemVariants}
            className="space-y-10"
          >
            {/* پنل بینش‌های حرفه‌ای */}
            <ProfessionalInsightsPanel stats={stats} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardContent;
