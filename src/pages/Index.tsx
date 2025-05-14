
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  ArrowRight, 
  Bell, 
  Calendar, 
  Clock, 
  TrendingUp,
  Users,
  Award
} from "lucide-react";

// Import components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivitySummaryCard } from "@/components/dashboard/ActivitySummaryCard";
import { WelcomeMessage } from "@/components/dashboard/WelcomeMessage";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { TipsCarousel } from "@/components/dashboard/TipsCarousel";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const deviceInfo = useDeviceInfo();
  const { toast } = useToast();
  
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');
  const [showWelcome, setShowWelcome] = useState(true);

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

    // Auto-hide welcome message after 8 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Send welcome notification
  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    
    if (!hasShownWelcome) {
      setTimeout(() => {
        toast({
          title: `${trainerProfile.name ? `${trainerProfile.name} عزیز،` : 'مربی گرامی،'} خوش آمدید`,
          description: "به پنل مدیریت برنامه خوش آمدید. برای شروع کار میتوانید از منوی اصلی استفاده کنید.",
          variant: "default",
        });
        sessionStorage.setItem('welcomeShown', 'true');
      }, 2000);
    }
  }, [toast, trainerProfile.name]);

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
      
      {/* Center decoration */}
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-tr from-pink-500/5 to-purple-500/10 blur-3xl rounded-full" />
      
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
            scale: [0.8, 1, 0.8],
            y: [0, Math.random() > 0.5 ? 10 : -10, 0]
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
      <AnimatePresence>
        {showWelcome && <WelcomeMessage trainerName={trainerProfile.name} onClose={() => setShowWelcome(false)} />}
      </AnimatePresence>
      
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

          {/* Counter section */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3 md:gap-4">
            <AnimatedCounter 
              value={stats.totalStudents} 
              label="شاگردان" 
              icon={<Users className="w-4 h-4" />} 
              color="blue" 
            />
            <AnimatedCounter 
              value={stats.studentsProgress} 
              label="پیشرفت" 
              icon={<TrendingUp className="w-4 h-4" />} 
              color="green"
              suffix="%" 
            />
            <AnimatedCounter 
              value={stats.totalDaysActive} 
              label="روز فعالیت" 
              icon={<Calendar className="w-4 h-4" />} 
              color="purple" 
            />
          </div>

          {/* Quick Actions */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="mt-4 sm:mt-5"
          >
            <QuickActions />
          </motion.div>

          {/* Main Menu Grid */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8"
          >
            <MainMenuGrid />
          </motion.div>

          {/* Training Tips Carousel */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <TipsCarousel />
          </motion.div>

          {/* Stats and Recent Students */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4 }} 
            className={`mt-6 sm:mt-8 grid ${getGridLayout()}`}
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
