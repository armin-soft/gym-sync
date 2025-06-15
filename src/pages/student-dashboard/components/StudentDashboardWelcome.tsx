
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Crown, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useStudentData } from "../hooks/useStudentData";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { usePersianDate } from "@/hooks/usePersianDate";

export const StudentDashboardWelcome: React.FC = () => {
  const { studentData, loading } = useStudentData();
  const currentTime = useCurrentTime();
  const persianDate = usePersianDate();

  const getGreeting = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return "صبح بخیر";
    if (hour < 17) return "ظهر بخیر";
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

  const getCurrentTime = () => {
    return toPersianNumbers(currentTime);
  };

  const greeting = getGreeting(currentTime);

  if (loading) {
    return (
      <Card className="p-8 bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-3xl p-8 mb-8 bg-gradient-to-l from-emerald-600 to-sky-600"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
        {/* Profile Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.div 
              className="absolute -inset-1 rounded-full bg-white/30 blur-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl">
              <AvatarImage 
                src={studentData.profileImage || ""} 
                alt="تصویر پروفایل"
              />
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg backdrop-blur-sm">
                {getInitials(studentData.name)}
              </AvatarFallback>
            </Avatar>
            
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
                {greeting}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {studentData.name}
              </Badge>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="flex items-center gap-1 text-xs bg-emerald-400/20 text-emerald-100 px-2 py-1 rounded-full"
              >
                <Sparkles className="w-3 h-3" />
                <span>شاگرد فعال</span>
              </motion.div>
            </div>
            
            <p className="text-white/80">
              مدیریت برنامه‌های تمرینی و تغذیه شخصی
            </p>
            
            <div className="mt-2 text-sm text-white/70">
              پیشرفت هفتگی: {toPersianNumbers(studentData.weeklyProgress.toString())}%
            </div>
          </div>
        </div>
        
        {/* Time and Date Section */}
        <motion.div 
          className="text-left space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 justify-end">
            <span className="text-white/90 text-sm">{persianDate}</span>
            <Calendar className="w-5 h-5 text-white/80" />
          </div>
          <div className="flex items-center gap-3 justify-end">
            <span className="text-2xl font-bold">{getCurrentTime()}</span>
            <Clock className="w-5 h-5 text-white/80" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
