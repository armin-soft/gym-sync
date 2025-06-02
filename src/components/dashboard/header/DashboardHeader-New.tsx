
import { motion } from "framer-motion";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { usePersianDate } from "@/hooks/usePersianDate";
import { 
  Calendar, 
  Clock, 
  Crown, 
  Sparkles,
  Moon,
  CloudMoon,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  CloudRain,
  Snowflake
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DashboardHeaderNewProps {
  trainerProfile: {
    name: string;
    image: string;
  };
  totalStudents: number;
}

export const DashboardHeaderNew = ({ trainerProfile, totalStudents }: DashboardHeaderNewProps) => {
  const currentTime = useCurrentTime();
  const persianDate = usePersianDate();

  const formatTimeWithSeconds = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return toPersianNumbers(`${hours}:${minutes}:${seconds}`);
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 0 && hour < 3) return Moon;
    if (hour >= 3 && hour < 5) return CloudMoon;
    if (hour >= 5 && hour < 6) return Sunrise;
    if (hour >= 6 && hour < 8) return Sunrise;
    if (hour >= 8 && hour < 11) return Sun;
    if (hour >= 11 && hour < 12) return Sun;
    if (hour >= 12 && hour < 14) return Sun;
    if (hour >= 14 && hour < 17) return CloudSun;
    if (hour >= 17 && hour < 19) return Sunset;
    if (hour >= 19 && hour < 20) return Sunset;
    if (hour >= 20 && hour < 22) return CloudRain;
    return CloudMoon;
  };

  const getSeasonIcon = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    
    if ((month >= 3 && month <= 5)) return Sun;
    if ((month >= 6 && month <= 8)) return Sun;
    if ((month >= 9 && month <= 11)) return CloudSun;
    return Snowflake;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 0 && hour < 3) return "نیمه شب بخیر";
    if (hour >= 3 && hour < 5) return "پیش سحر بخیر";
    if (hour >= 5 && hour < 6) return "سحر بخیر";
    if (hour >= 6 && hour < 8) return "طلوع آفتاب";
    if (hour >= 8 && hour < 11) return "صبح بخیر";
    if (hour >= 11 && hour < 12) return "پیش از ظهر بخیر";
    if (hour >= 12 && hour < 14) return "ظهر بخیر";
    if (hour >= 14 && hour < 17) return "بعد از ظهر بخیر";
    if (hour >= 17 && hour < 19) return "عصر بخیر";
    if (hour >= 19 && hour < 20) return "غروب بخیر";
    if (hour >= 20 && hour < 22) return "اوایل شب بخیر";
    return "شب بخیر";
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const TimeIcon = getTimeIcon();
  const SeasonIcon = getSeasonIcon();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-3xl p-8 mb-8"
      style={{ background: 'var(--bg-gradient-primary)' }}
    >
      {/* المان‌های تزیینی */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
        
        {/* بخش پروفایل مربی */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.div 
              className="absolute -inset-1 rounded-full bg-white/30 blur-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl">
              <AvatarImage 
                src={trainerProfile.image} 
                alt="تصویر پروفایل"
              />
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg backdrop-blur-sm">
                {getInitials(trainerProfile.name)}
              </AvatarFallback>
            </Avatar>
            
            {/* نشان تاج */}
            <motion.div 
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-yellow-400 shadow-lg"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Crown className="h-4 w-4 text-white" fill="currentColor" />
            </motion.div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                {getGreeting()}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {trainerProfile.name}
              </Badge>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="flex items-center gap-1 text-xs bg-emerald-400/20 text-emerald-100 px-2 py-1 rounded-full"
              >
                <Sparkles className="w-3 h-3" />
                <span>مربی حرفه‌ای</span>
              </motion.div>
            </div>
            
            <p className="text-white/80">
              مدیریت حرفه‌ای برنامه‌های تمرینی و تغذیه
            </p>
            
            <div className="mt-2 text-sm text-white/70">
              شاگردان فعال: {toPersianNumbers(totalStudents.toString())}
            </div>
          </div>
        </div>

        {/* بخش زمان و تاریخ با UI/UX جدید */}
        <div className="flex flex-col gap-6">
          {/* کارت زمان فعلی - طراحی جدید */}
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <TimeIcon className="w-8 h-8 text-white drop-shadow-lg" />
                </motion.div>
                
                <div className="text-right">
                  <motion.div 
                    className="text-3xl font-bold tracking-wider"
                    key={formatTimeWithSeconds(currentTime)}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ 
                      fontFamily: 'Vazir, sans-serif',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {formatTimeWithSeconds(currentTime)}
                  </motion.div>
                  <div className="text-sm text-white/70 font-medium mt-1">
                    زمان فعلی
                  </div>
                  
                  {/* نوار پیشرفت ثانیه */}
                  <div className="w-full bg-white/20 rounded-full h-1 mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-white/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentTime.getSeconds() / 60) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* کارت تاریخ فارسی - طراحی جدید */}
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 8, -8, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <SeasonIcon className="w-8 h-8 text-white drop-shadow-lg" />
                </motion.div>
                
                <div className="text-right flex-1">
                  <div 
                    className="text-lg font-bold mb-1"
                    style={{ 
                      fontFamily: 'Vazir, sans-serif',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {persianDate}
                  </div>
                  <div className="text-sm text-white/70 font-medium">
                    تاریخ امروز
                  </div>
                  
                  {/* نشانگر وضعیت تقویم */}
                  <div className="flex items-center gap-2 mt-2">
                    <motion.div 
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-white/60">فعال</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* کارت اضافی - آیکون تقویم */}
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
            
            <div className="relative bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl">
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ 
                    rotateY: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Calendar className="w-6 h-6 text-white/80" />
                </motion.div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white/90">
                    تقویم شمسی
                  </div>
                  <div className="text-xs text-white/60">
                    ایران
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeaderNew;
