
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

// Import our new components
import { HeroBackground } from "./components/HeroBackground";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { WelcomeSection } from "./components/WelcomeSection";
import { TimeSection } from "./components/TimeSection";

interface UltraModernHeroProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const UltraModernHero = ({ 
  stats, 
  currentTime, 
  trainerProfile 
}: UltraModernHeroProps) => {
  const deviceInfo = useDeviceInfo();

  // Utility functions
  const formatTime = (date: Date) => {
    return toPersianNumbers(date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صبح بخیر";
    if (hour < 18) return "ظهر بخیر";
    return "عصر بخیر";
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  // Data preparation
  const profileName = trainerProfile?.name || "مربی حرفه‌ای";
  const profileImage = trainerProfile?.image || "/placeholder.svg";
  const totalStudents = stats?.totalStudents || 0;
  const studentsProgress = stats?.studentsProgress || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
      className="relative overflow-hidden rounded-[32px] min-h-[450px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)]"
    >
      <HeroBackground />

      {/* Main content */}
      <div className="relative z-10 p-8 text-white h-full">
        <div className={`flex ${deviceInfo.isMobile ? 'flex-col space-y-8' : 'flex-row items-start justify-between'} h-full`}>
          
          {/* Profile section */}
          <motion.div 
            className="flex items-center space-x-8 space-x-reverse"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <ProfileAvatar 
              profileImage={profileImage}
              profileName={profileName}
              getInitials={getInitials}
            />

            <WelcomeSection 
              getGreeting={getGreeting}
              profileName={profileName}
              totalStudents={totalStudents}
              studentsProgress={studentsProgress}
            />
          </motion.div>

          {/* Time and date section */}
          <TimeSection 
            currentTime={currentTime}
            stats={stats}
            formatTime={formatTime}
            formatDate={formatDate}
          />
        </div>
      </div>
    </motion.div>
  );
};
