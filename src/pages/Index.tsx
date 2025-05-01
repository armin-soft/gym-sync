
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { Sparkles } from "lucide-react";

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

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } }
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
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl rounded-full" />
      
      {/* Bottom left decoration */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/10 to-teal-500/5 blur-3xl rounded-full" />
      
      {/* Animated sparkles that appear in random positions */}
      {[...Array(5)].map((_, i) => (
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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full overflow-auto p-2 xs:p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 relative"
      >
        {/* Background decorations */}
        <BackgroundDecorations />
        
        {/* Page content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <HeroSection 
            stats={stats} 
            currentTime={currentTime} 
            trainerProfile={trainerProfile} 
          />

          {/* Main Menu Grid */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-5 md:mt-6"
          >
            <MainMenuGrid />
          </motion.div>

          {/* Stats and Recent Students */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4 }} 
            className={`mt-4 sm:mt-5 md:mt-6 grid ${getGridLayout()}`}
          >
            {/* First column on larger screens */}
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.6 }}
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
                {...fadeIn}
                transition={{ delay: 0.7 }}
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                {/* Progress Card */}
                <ProgressCard stats={stats} />

                {/* Activity Summary Card */}
                <ActivitySummaryCard stats={stats} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default Index;
