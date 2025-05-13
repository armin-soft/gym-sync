
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Zap, 
  LineChart, 
  Bell, 
  Hourglass
} from "lucide-react";

// Import components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivitySummaryCard } from "@/components/dashboard/ActivitySummaryCard";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const deviceInfo = useDeviceInfo();
  
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');

  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        } else {
          console.error('Parsed students is not an array:', parsedStudents);
          setStudents([]);
        }
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  }, []);

  // Animation variants for staggered page load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Determine optimal grid layout based on device type
  const getGridLayout = () => {
    if (deviceInfo.isMobile) {
      return "grid-cols-1 gap-4";
    } else if (deviceInfo.isTablet) {
      return "grid-cols-2 gap-5";
    } else {
      return "md:grid-cols-3 gap-6";
    }
  };
  
  // Background decorative elements
  const BackgroundDecorations = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]" />
      
      {/* Animated sparkles that appear in random positions */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.7
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Sparkles className="w-3 h-3 text-indigo-400/30" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <PageContainer fullWidth noPadding>
      <div 
        className="relative w-full h-full overflow-auto p-2 xs:p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6"
      >
        {/* Background decorations */}
        <BackgroundDecorations />
        
        {/* Page content with staggered animations */}
        <motion.div 
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
            className={`mt-4 sm:mt-5 md:mt-6 grid ${getGridLayout()}`}
          >
            {/* First column on larger screens */}
            <motion.div 
              variants={itemVariants}
              className={deviceInfo.isMobile ? "" : "md:col-span-2 space-y-4 sm:space-y-5 md:space-y-6"}
            >
              {/* Students Card */}
              <RecentStudentsCard students={students} />
              
              {deviceInfo.isMobile && (
                <>
                  {/* Progress Card - Show here on mobile */}
                  <ProgressCard stats={stats} />
                  
                  {/* Activity Summary Card - Show here on mobile */}
                  <ActivitySummaryCard stats={stats} />
                </>
              )}
              
              {/* Stats Cards */}
              <StatsCards stats={stats} />
            </motion.div>
            
            {!deviceInfo.isMobile && (
              <motion.div 
                variants={itemVariants}
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                {/* Progress Card */}
                <ProgressCard stats={stats} />

                {/* Activity Summary Card */}
                <ActivitySummaryCard stats={stats} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Fix the style element by removing invalid jsx and global properties */}
      <style>
        {`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        `}
      </style>
    </PageContainer>
  );
};

export default Index;
