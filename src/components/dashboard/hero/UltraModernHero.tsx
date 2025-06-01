
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Calendar, Clock, TrendingUp, Users, Sparkles, Crown, Activity, Star, Zap } from "lucide-react";
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
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
      className="relative overflow-hidden rounded-[32px] min-h-[450px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)]"
    >
      {/* خلفیه انیمیشنی */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/10 to-indigo-600/20" />
        
        {/* المان‌های شناور */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -60, -10],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* دایره‌های گرادیانت */}
        <motion.div 
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-violet-500/30 to-purple-600/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-500/30 to-blue-600/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [360, 0]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-10 p-8 text-white h-full">
        <div className={`flex ${deviceInfo.isMobile ? 'flex-col space-y-8' : 'flex-row items-start justify-between'} h-full`}>
          
          {/* بخش پروفایل */}
          <motion.div 
            className="flex items-center space-x-8 space-x-reverse"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 opacity-60 blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Avatar className="h-24 w-24 border-4 border-white/20 relative shadow-2xl ring-4 ring-violet-500/30">
                <AvatarImage 
                  src={profileImage} 
                  alt="تصویر پروفایل"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-600 to-purple-700 text-white font-bold text-xl">
                  {getInitials(profileName)}
                </AvatarFallback>
              </Avatar>
              
              {/* نشان تاج */}
              <motion.div 
                className="absolute -top-3 -left-3 p-2 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                animate={{ 
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Crown className="h-5 w-5 text-white" fill="currentColor" />
              </motion.div>
              
              {/* نشان فعال */}
              <motion.div 
                className="absolute -bottom-2 -left-2 p-1.5 rounded-full bg-emerald-500 shadow-lg border-2 border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
              >
                <Activity className="h-4 w-4 text-white" />
              </motion.div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-l from-white to-violet-200 bg-clip-text text-transparent">
                  {getGreeting()}
                </h1>
                <Badge className="bg-violet-500/20 text-violet-200 border-violet-400/30 backdrop-blur-sm self-start sm:self-auto">
                  <Star className="w-3 h-3 ml-1" fill="currentColor" />
                  {profileName}
                </Badge>
              </div>
              
              <p className="text-lg text-white/80 mb-6 flex items-center gap-3">
                به داشبورد مدیریت حرفه‌ای خود خوش آمدید
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="inline-flex items-center gap-2 text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-400/30"
                >
                  <Zap className="w-4 h-4" fill="currentColor" />
                  آنلاین
                </motion.span>
              </p>
              
              {/* آمار سریع */}
              <div className="flex gap-8 text-white/70">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-300" />
                  <span className="text-sm">تعداد شاگردان:</span>
                  <span className="font-semibold text-white">{toPersianNumbers(totalStudents.toString())}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm">میزان پیشرفت:</span>
                  <span className="font-semibold text-white">{toPersianNumbers(studentsProgress.toString())}٪</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* بخش زمان و تاریخ */}
          <motion.div 
            className="flex flex-col items-end space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* ساعت فعلی */}
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-white/60 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    زمان فعلی
                  </div>
                </div>
              </div>
            </motion.div>

            {/* تاریخ فعلی */}
            <motion.div 
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {formatDate(currentTime)}
                  </div>
                  <div className="text-sm text-white/60 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    تاریخ امروز
                  </div>
                </div>
              </div>
            </motion.div>

            {/* آمار کلی */}
            <motion.div 
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {toPersianNumbers(stats.totalStudents)}
                  </div>
                  <div className="text-sm text-white/60 flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" />
                    شاگردان
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-1">
                    <span>{toPersianNumbers(stats.studentsProgress)}</span>
                    <span className="text-lg">٪</span>
                  </div>
                  <div className="text-sm text-white/60 flex items-center justify-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    پیشرفت
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
