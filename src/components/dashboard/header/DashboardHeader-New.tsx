
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
  CloudSunRain,
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
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTimeIcon = () => {
    const hour = new Date().getHours();
    
    if (hour >= 0 && hour < 3) return Moon; // نیمه شب - شب دیر
    if (hour >= 3 && hour < 5) return CloudMoon; // پیش سحر
    if (hour >= 5 && hour < 6) return Sunrise; // سحر
    if (hour >= 6 && hour < 8) return Sunrise; // طلوع آفتاب
    if (hour >= 8 && hour < 11) return Sun; // صبح
    if (hour >= 11 && hour < 12) return Sun; // پیش از ظهر
    if (hour >= 12 && hour < 14) return Sun; // ظهر
    if (hour >= 14 && hour < 17) return CloudSun; // بعد از ظهر
    if (hour >= 17 && hour < 19) return Sunset; // عصر
    if (hour >= 19 && hour < 20) return Sunset; // غروب
    if (hour >= 20 && hour < 22) return CloudSunRain; // اوایل شب
    return CloudMoon; // شب
  };

  const getSeasonIcon = (dateString: string) => {
    if (dateString.includes('بهار')) return Sun;
    if (dateString.includes('تابستان')) return Sun;
    if (dateString.includes('پاییز')) return CloudSun;
    if (dateString.includes('زمستان')) return Snowflake;
    return Calendar;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 3) return "نیمه شب";
    if (hour >= 3 && hour < 5) return "پیش سحر";
    if (hour >= 5 && hour < 6) return "سحر";
    if (hour >= 6 && hour < 8) return "طلوع آفتاب";
    if (hour >= 8 && hour < 11) return "صبح بخیر";
    if (hour >= 11 && hour < 12) return "پیش از ظهر";
    if (hour >= 12 && hour < 14) return "ظهر بخیر";
    if (hour >= 14 && hour < 17) return "بعد از ظهر";
    if (hour >= 17 && hour < 19) return "عصر بخیر";
    if (hour >= 19 && hour < 20) return "غروب";
    if (hour >= 20 && hour < 22) return "اوایل شب";
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
  const SeasonIcon = getSeasonIcon(persianDate);

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

        {/* بخش زمان و تاریخ */}
        <div className="flex flex-col gap-4">
          {/* زمان فعلی با ثانیه */}
          <motion.div 
            className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <TimeIcon className="w-5 h-5 text-white/80" />
              </motion.div>
              <div className="text-right">
                <motion.div 
                  className="text-xl font-bold font-mono"
                  key={formatTimeWithSeconds(currentTime)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {toPersianNumbers(formatTimeWithSeconds(currentTime))}
                </motion.div>
                <div className="text-xs text-white/70">
                  زمان فعلی
                </div>
              </div>
            </div>
          </motion.div>

          {/* تاریخ فارسی */}
          <motion.div 
            className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <SeasonIcon className="w-5 h-5 text-white/80" />
              <div className="text-right">
                <div className="text-sm font-medium">
                  {persianDate}
                </div>
                <div className="text-xs text-white/70">
                  تاریخ امروز
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
