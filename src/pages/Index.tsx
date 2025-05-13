
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  Hourglass,
  ArrowUpRight
} from "lucide-react";

// Import components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivitySummaryCard } from "@/components/dashboard/ActivitySummaryCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const deviceInfo = useDeviceInfo();
  const controls = useAnimation();
  
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');

  // Start animation sequence on mount
  useEffect(() => {
    const startAnimations = async () => {
      await controls.start("visible");
    };
    startAnimations();
  }, [controls]);

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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-8, 8, -8], 
      transition: { 
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 6,
        ease: "easeInOut"
      } 
    }
  };

  // Determine optimal grid layout based on device type
  const getGridLayout = () => {
    if (deviceInfo.isMobile) {
      return "grid-cols-1 gap-6";
    } else if (deviceInfo.isTablet) {
      return "grid-cols-2 gap-6";
    } else {
      return "md:grid-cols-3 gap-8";
    }
  };
  
  // Background decorative elements
  const BackgroundDecorations = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Advanced background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-indigo-500/5 to-purple-500/5 blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 blur-[100px] translate-y-1/3 -translate-x-1/4" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      
      {/* Animated particles */}
      <ParticleField />
    </div>
  );

  // Particle animation component
  const ParticleField = () => (
    <>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            borderRadius: '50%',
            background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 255}, 0.5)`
          }}
          animate={{
            y: [0, Math.random() * -30 - 10],
            x: [0, Math.random() * 20 - 10],
            opacity: [0.2, 0.5, 0],
            scale: [0, 1, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Sparkles className="w-4 h-4 text-indigo-300/30 dark:text-indigo-400/20" />
        </motion.div>
      ))}
    </>
  );

  return (
    <PageContainer fullWidth noPadding>
      <div className="relative w-full h-full overflow-auto p-4 xs:p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-7 md:space-y-10">
        {/* Background decorations */}
        <BackgroundDecorations />
        
        {/* Page content with enhanced staggered animations */}
        <motion.div 
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Hero Section with floating animation */}
          <motion.div 
            variants={itemVariants}
            initial="initial"
            animate="animate"
            variants={floatingVariants}
            className="transform-gpu"
          >
            <HeroSection 
              stats={stats} 
              currentTime={currentTime} 
              trainerProfile={trainerProfile} 
            />
          </motion.div>

          {/* Page Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-end mt-4"
          >
            <Button 
              variant="ghost" 
              size="sm"
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 text-indigo-500 dark:text-indigo-400 flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50"
            >
              <Bell className="w-4 h-4" />
              <span className="text-xs font-medium">مشاهده اطلاعیه‌ها</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-medium text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">۲</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </motion.div>

          {/* Main Menu Grid with upgraded animations */}
          <motion.div 
            variants={itemVariants}
            className="mt-8"
          >
            <MainMenuGrid />
          </motion.div>

          {/* Stats and Recent Students */}
          <motion.div
            variants={itemVariants}
            className={`mt-10 grid ${getGridLayout()}`}
          >
            {/* Left column on larger screens */}
            <motion.div 
              variants={itemVariants}
              className={deviceInfo.isMobile ? "" : "md:col-span-2 space-y-6 sm:space-y-7 md:space-y-8"}
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

              {/* Additional Mobile-only action area */}
              {deviceInfo.isMobile && (
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-5 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/30 shadow-sm flex flex-col items-center text-center space-y-4"
                >
                  <div className="rounded-full bg-indigo-100/80 dark:bg-indigo-900/50 p-3">
                    <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">عملکرد امروز</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">برنامه‌های امروز شما تکمیل شده است</p>
                  <Button 
                    variant="secondary"
                    className="bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 shadow"
                  >
                    مشاهده جزئیات
                  </Button>
                </motion.div>
              )}
            </motion.div>
            
            {!deviceInfo.isMobile && (
              <motion.div 
                variants={itemVariants}
                className="space-y-6 sm:space-y-7 md:space-y-8"
              >
                {/* Progress Card */}
                <ProgressCard stats={stats} />

                {/* Activity Summary Card */}
                <ActivitySummaryCard stats={stats} />

                {/* Additional stats for large screens */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/30 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      وضعیت روز
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      جزئیات بیشتر
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">تکمیل شده</span>
                        <Trophy className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">۸۵٪</p>
                    </div>
                    
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">باقی مانده</span>
                        <Hourglass className="w-4 h-4 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">۳</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Style for grid pattern */}
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
