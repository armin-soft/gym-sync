
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";

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

  return (
    <PageContainer fullWidth noPadding>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full overflow-auto p-2 xs:p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6"
      >
        {/* Hero Section with Glass Effect */}
        <HeroSection 
          stats={stats} 
          currentTime={currentTime} 
          trainerProfile={trainerProfile} 
        />

        {/* Main Menu Grid - Responsive layout */}
        <MainMenuGrid />

        {/* Stats and Recent Students - Responsive grid */}
        <div className={`grid ${getGridLayout()}`}>
          {/* First column on larger screens */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
            
            <StatsCards stats={stats} />
          </motion.div>
          
          {!deviceInfo.isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Progress Card */}
              <ProgressCard stats={stats} />

              {/* Activity Summary Card */}
              <ActivitySummaryCard stats={stats} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default Index;
