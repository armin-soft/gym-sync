
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { PageContainer } from "@/components/ui/page-container";
import { Sparkles, Star, ChevronRight, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import components
import { HeroSection } from "@/components/dashboard/HeroSection";
import { MainMenuGrid } from "@/components/dashboard/MainMenuGrid";
import { RecentStudentsCard } from "@/components/dashboard/RecentStudentsCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ActivitySummaryCard } from "@/components/dashboard/ActivitySummaryCard";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useShamsiDate } from "@/hooks/useShamsiDate";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const deviceInfo = useDeviceInfo();
  const { toast } = useToast();
  const { dateInfo } = useShamsiDate();
  
  // Load trainer profile from localStorage
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');

  // Load and process student data from localStorage
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
      toast({
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری اطلاعات شاگردان پیش آمد",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            opacity: 0.5
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

  // Daily motivation quote display
  const DailyQuote = () => {
    const motivationalQuotes = [
      "هر شکستی تمرینی برای موفقیت است",
      "تمام محدودیت‌ها فقط در ذهن شماست",
      "قدرت واقعی، قدرت بلند شدن پس از شکست است",
      "با هر تمرین، یک قدم به هدفت نزدیکتر می‌شوی",
      "تغییر، با تصمیم شروع می‌شود و با عمل ادامه می‌یابد",
      "مربی خوب به شما می‌گوید چه کاری انجام دهید، مربی عالی نشان می‌دهد چطور"
    ];
    
    // Use date as seed for consistent random selection per day
    const today = dateInfo ? dateInfo.Shamsi_Date : new Date().toISOString().slice(0, 10);
    const seedValue = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const quoteIndex = seedValue % motivationalQuotes.length;
    
    return (
      <motion.div 
        className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100/50 dark:border-blue-800/30 overflow-hidden relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="absolute -bottom-6 -right-6 opacity-10 transform rotate-12">
          <Star className="w-24 h-24" fill="currentColor" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Star className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-medium">انگیزه روز</span>
          </div>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 relative z-10">
            {motivationalQuotes[quoteIndex]}
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Calendar className="w-3 h-3" /> 
            <span dir="rtl">{dateInfo ? dateInfo.Shamsi_Date : '-'}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // Dashboard date and time display
  const DateTimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
      
      return () => clearInterval(timer);
    }, []);

    return (
      <motion.div 
        className="flex flex-col space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{dateInfo?.Shamsi_Date || "-"}</span>
          <span className="text-gray-400 dark:text-gray-500 px-1">•</span>
          <Clock className="w-3.5 h-3.5" />
          <span dir="ltr">
            {currentDateTime.toLocaleTimeString('fa-IR')}
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {dateInfo?.Season_Emoji} {dateInfo?.Season}
        </div>
      </motion.div>
    );
  };

  return (
    <PageContainer fullWidth noPadding>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full overflow-auto p-3 xs:p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 relative"
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

          {/* Daily Quote */}
          <motion.div
            {...slideUp}
            transition={{ delay: 0.4 }}
            className="mt-4 sm:mt-5 md:mt-6"
          >
            <DailyQuote />
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

              {/* Date and Time Display - Only on Mobile */}
              {deviceInfo.isMobile && (
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.8 }}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow p-4"
                >
                  <DateTimeDisplay />
                </motion.div>
              )}
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

                {/* Date and Time Display - On Tablet/Desktop */}
                <motion.div
                  {...slideUp}
                  transition={{ delay: 0.8 }}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow p-4"
                >
                  <DateTimeDisplay />
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Bottom credits section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center justify-center gap-1">
              <span>نسخه</span>
              <span>1.5.9</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default Index;
