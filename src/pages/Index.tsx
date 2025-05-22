
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

// Import components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/stats/StatsCards";
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

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
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
      {/* Top right decoration */}
      <motion.div 
        className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Bottom left decoration */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-teal-500/5 blur-3xl rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Animated sparkles that appear in random positions */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.4
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
      <motion.div 
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="w-full h-full overflow-auto p-2 xs:p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 relative"
      >
        {/* Background decorations */}
        <BackgroundDecorations />
        
        {/* Page content */}
        <div className="relative z-10">
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
      </motion.div>
    </PageContainer>
  );
};

export default Index;
