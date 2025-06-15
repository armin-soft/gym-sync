
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Target, TrendingUp, Award, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface NewStudentDashboardHeaderProps {
  studentName: string;
  weeklyProgress: number;
  exerciseStreak: number;
}

export const NewStudentDashboardHeader: React.FC<NewStudentDashboardHeaderProps> = ({
  studentName,
  weeklyProgress,
  exerciseStreak
}) => {
  const getCurrentPersianDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  const getCurrentTime = () => {
    const date = new Date();
    return toPersianNumbers(date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    }));
  };

  const getMotivationalMessage = () => {
    if (weeklyProgress >= 80) return "عملکرد فوق‌العاده! ادامه دهید! 🔥";
    if (weeklyProgress >= 60) return "پیشرفت خوبی دارید! 💪";
    if (weeklyProgress >= 40) return "در مسیر درستی هستید! 🎯";
    return "بیایید با انگیزه شروع کنیم! ⭐";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-3xl p-8 mb-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-white">
        {/* User Info & Stats */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <User className="w-10 h-10 text-white" />
            </motion.div>
            
            {/* Welcome Message */}
            <div>
              <motion.h1 
                className="text-4xl font-black mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                سلام {studentName}! 👋
              </motion.h1>
              <motion.p 
                className="text-white/90 text-lg font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {getMotivationalMessage()}
              </motion.p>
            </div>
          </div>
          
          {/* Achievement Badges */}
          <motion.div 
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Target className="w-4 h-4 ml-2" />
              پیشرفت هفتگی: {toPersianNumbers(weeklyProgress.toString())}%
            </Badge>
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white border-yellow-300/30 hover:from-yellow-400/30 hover:to-orange-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Award className="w-4 h-4 ml-2" />
              استریک: {toPersianNumbers(exerciseStreak.toString())} روز
            </Badge>
            <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-white border-green-300/30 hover:from-green-400/30 hover:to-emerald-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 ml-2" />
              روند صعودی
            </Badge>
          </motion.div>
        </div>
        
        {/* Date & Time */}
        <motion.div 
          className="text-left lg:text-right space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 justify-end">
            <span className="text-white/90 text-lg">{getCurrentPersianDate()}</span>
            <Calendar className="w-6 h-6 text-white/80" />
          </div>
          <div className="flex items-center gap-3 justify-end">
            <span className="text-3xl font-bold">{getCurrentTime()}</span>
            <Clock className="w-6 h-6 text-white/80" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
