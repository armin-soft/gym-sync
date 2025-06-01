
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

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

  const profileName = trainerProfile?.name || "مربی حرفه‌ای";
  const profileImage = trainerProfile?.image || "/placeholder.svg";
  const totalStudents = stats?.totalStudents || 0;
  const studentsProgress = stats?.studentsProgress || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl min-h-[400px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-xl"
    >
      <HeroBackground />

      <div className="relative z-10 p-6 text-white h-full">
        <div className={`flex ${deviceInfo.isMobile ? 'flex-col space-y-6' : 'flex-row items-start justify-between'} h-full`}>
          
          <div className="flex items-center space-x-6 space-x-reverse">
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
          </div>

          <TimeSection 
            currentTime={currentTime}
            formatTime={formatTime}
            formatDate={formatDate}
          />
        </div>
      </div>
    </motion.div>
  );
};
