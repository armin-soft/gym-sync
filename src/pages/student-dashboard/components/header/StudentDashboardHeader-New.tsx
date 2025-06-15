
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { format } from "date-fns-jalali";

interface StudentDashboardHeaderNewProps {
  studentProfile: {
    name: string;
    image: string;
  };
  overallProgress: number;
}

export const StudentDashboardHeaderNew = ({ 
  studentProfile, 
  overallProgress 
}: StudentDashboardHeaderNewProps) => {
  const deviceInfo = useDeviceInfo();
  const currentTime = new Date();
  
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "صبح بخیر";
    if (hour < 18) return "ظهر بخیر";
    return "عصر بخیر";
  };

  const getMotivationalMessage = () => {
    if (overallProgress >= 80) {
      return "عملکرد فوق‌العاده! ادامه دهید 💪";
    } else if (overallProgress >= 60) {
      return "در مسیر درستی هستید 👍";
    } else if (overallProgress >= 40) {
      return "بیایید امروز بیشتر تلاش کنیم 🔥";
    } else {
      return "شروع کنیم و پیشرفت کنیم 🚀";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl p-8 mb-8 text-white"
      style={{ background: 'var(--bg-gradient-primary)' }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/15 rounded-full blur-2xl translate-y-24 -translate-x-24" />
      </div>
      
      <div className="relative z-10">
        <div className={`grid gap-8 ${deviceInfo.isMobile ? 'grid-cols-1 text-center' : 'grid-cols-3 items-center'}`}>
          
          {/* Profile Section */}
          <div className={`${deviceInfo.isMobile ? 'order-2' : 'order-1'} flex ${deviceInfo.isMobile ? 'justify-center' : 'justify-start'} items-center gap-4`}>
            <motion.div
              className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-white/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={studentProfile.image || "/Assets/Images/Place-Holder.svg"} 
                alt={studentProfile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className={deviceInfo.isMobile ? 'text-center' : 'text-right'}>
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {getGreeting()}، {studentProfile.name}
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {getMotivationalMessage()}
              </motion.p>
            </div>
          </div>

          {/* Progress Section */}
          <div className={`${deviceInfo.isMobile ? 'order-1' : 'order-2'} text-center space-y-4`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="relative inline-block"
            >
              <div className="w-24 h-24 mx-auto relative">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - overallProgress / 100)}`}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - overallProgress / 100) }}
                    transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {toPersianNumbers(overallProgress.toString())}%
                  </span>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">پیشرفت کلی</span>
              </div>
            </div>
          </div>

          {/* Date & Time Section */}
          <div className={`${deviceInfo.isMobile ? 'order-3' : 'order-3'} ${deviceInfo.isMobile ? 'text-center' : 'text-left'} space-y-3`}>
            <motion.div 
              className="flex items-center gap-2 justify-center md:justify-start"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">
                {format(currentTime, "EEEE، d MMMM yyyy")}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 justify-center md:justify-start"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                {toPersianNumbers(format(currentTime, "HH:mm"))}
              </span>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboardHeaderNew;
