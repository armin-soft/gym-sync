
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { EyeIcon, Calendar, TrendingUp, ChevronRight, Users, BarChart2, Award, Search } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/components/ui/use-toast";

// Import components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatisticsGrid } from "@/components/dashboard/StatisticsGrid";
import { RecentStudents } from "@/components/dashboard/RecentStudents";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ProgressOverview } from "@/components/dashboard/ProgressOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { LoadingSkeleton } from "@/components/dashboard/LoadingSkeleton";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const deviceInfo = useDeviceInfo();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  // Get trainer profile from localStorage
  const trainerProfile = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"کاربر گرامی","image":"/placeholder.svg"}');
    } catch (e) {
      return {"name":"کاربر گرامی","image":"/placeholder.svg"};
    }
  }, []);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
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
      
      // Show welcome toast
      toast({
        title: `${getTimeBasedGreeting()}، ${trainerProfile.name}`,
        description: "به داشبورد مدیریت برنامه‌ها خوش آمدید!",
        duration: 4000,
      });
      
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
    
    return () => clearTimeout(timer);
  }, [toast, trainerProfile.name]);
  
  // Get greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صبح بخیر';
    if (hour < 17) return 'ظهر بخیر';
    if (hour < 21) return 'عصر بخیر';
    return 'شب بخیر';
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <PageContainer fullWidth noPadding>
      <div className="w-full h-full overflow-auto">
        <DashboardHeader 
          trainerProfile={trainerProfile} 
          currentTime={currentTime}
          stats={stats}
        />
        
        <motion.div 
          className="p-3 sm:p-4 md:p-6 grid gap-4 md:gap-6 max-w-[1800px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top statistics */}
          <motion.div variants={itemVariants}>
            <StatisticsGrid stats={stats} />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Main content - 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <motion.div variants={itemVariants}>
                <PerformanceChart stats={stats} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <RecentStudents students={students} />
              </motion.div>
            </div>
            
            {/* Side panel - 1 column */}
            <div className="space-y-4 md:space-y-6">
              <motion.div variants={itemVariants}>
                <QuickActions />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ProgressOverview stats={stats} />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <ActivityTimeline />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Index;
