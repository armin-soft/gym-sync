
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Calendar, Clock, TrendingUp, Users, Sparkles, Crown, CheckCircle, Hand, Activity } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

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
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
      className="relative overflow-hidden rounded-3xl min-h-[400px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-600/90 to-pink-600/90" />
        
        {/* Floating Elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div 
          className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 text-white">
        <div className={`flex ${deviceInfo.isMobile ? 'flex-col space-y-6' : 'flex-row items-center justify-between'}`}>
          
          {/* Profile Section */}
          <motion.div 
            className="flex items-center space-x-6 space-x-reverse"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 opacity-70 blur-lg animate-pulse"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl hover:scale-105 transition-transform duration-300 ring-4 ring-white/30 shadow-2xl">
                <AvatarImage 
                  src={profileImage} 
                  alt="تصویر پروفایل"
                  onError={(e) => {
                    console.log('Avatar image failed to load, using fallback');
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                  {getInitials(profileName)}
                </AvatarFallback>
              </Avatar>
              
              {/* Crown Badge */}
              <motion.div 
                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Crown className="h-4 w-4 text-white" fill="currentColor" />
              </motion.div>
              
              {/* Verification Badge */}
              <motion.div 
                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-green-500 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="h-3 w-3 text-white" fill="currentColor" />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center text-white">
                  خوش آمدید 
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="ml-2"
                  >
                    <Hand className="w-6 h-6 text-yellow-300" />
                  </motion.div>
                </h1>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30 transition-colors self-start sm:self-auto">
                  {profileName}
                </Badge>
              </div>
              <p className="mt-2 text-white/80 flex items-center gap-2">
                به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full"
                >
                  <Activity className="w-3 h-3" /> فعال
                </motion.span>
              </p>
              {/* اضافه کردن اطلاعات آمار برای نمایش */}
              <div className="mt-3 flex gap-4 text-sm text-white/70">
                <span>شاگردان: {toPersianNumbers(totalStudents.toString())}</span>
                <span>پیشرفت: {toPersianNumbers(studentsProgress.toString())}٪</span>
              </div>
            </div>
          </motion.div>

          {/* Time and Date Section */}
          <motion.div 
            className="flex flex-col items-end space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Greeting Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 text-right"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/80 font-medium">{getGreeting()}</span>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-300" fill="currentColor" />
                </motion.div>
              </div>
            </motion.div>

            {/* Current Time */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/80" />
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-xs text-white/70">
                    زمان فعلی
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Date */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/80" />
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {formatDate(currentTime)}
                  </div>
                  <div className="text-xs text-white/70">
                    تاریخ امروز
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Total Students */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-4 w-4 text-white/80" />
                  <span className="text-xs text-white/60">شاگردان</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {toPersianNumbers(stats.totalStudents)}
                </div>
              </div>
              
              {/* Separator */}
              <div className="h-8 w-px bg-white/20" />
              
              {/* Progress */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-white/80" />
                  <span className="text-xs text-white/60">پیشرفت</span>
                </div>
                <div className="text-lg font-bold text-white flex items-center gap-1">
                  <span>{toPersianNumbers(stats.studentsProgress)}</span>
                  <span className="text-sm">%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
