
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Target, Award, TrendingUp, Sparkles, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useStudentData } from "../hooks/useStudentData";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { usePersianDate } from "@/hooks/usePersianDate";
import { getGreeting } from "@/components/dashboard/header/utils/timeUtils";

export const StudentDashboardWelcome: React.FC = () => {
  const { studentData, loading } = useStudentData();
  const currentTime = useCurrentTime();
  const persianDate = usePersianDate();

  const formatTimeWithSeconds = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return toPersianNumbers(`${hours}:${minutes}:${seconds}`);
  };

  const getStudentProfile = () => {
    try {
      const loggedInStudentId = localStorage.getItem("loggedInStudentId");
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      
      if (loggedInStudentId && students.length > 0) {
        const student = students.find((s: any) => s.id === loggedInStudentId);
        return student || null;
      }
    } catch (error) {
      console.error('خطا در بارگذاری پروفایل شاگرد:', error);
    }
    return null;
  };

  const studentProfile = getStudentProfile();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2);
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "امروز روزی است که تبدیل به بهترین نسخه خودت شوی! 💪",
      "هر قدم کوچک، شما را به هدف بزرگتری نزدیک می‌کند! 🎯",
      "استقامت امروز، موفقیت فردا است! ⭐",
      "راه هزار میل با یک قدم آغاز می‌شود! 🚀"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

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
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-sky-500 to-emerald-600 border-none shadow-2xl">
        {/* تأثیرات پس‌زمینه */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        </div>

        <div className="relative z-10 p-8 text-white">
          {/* ردیف بالا - پروفایل و تاریخ/زمان */}
          <div className="flex items-center justify-between mb-8">
            {/* بخش راست - پروفایل و سلام */}
            <div className="flex items-center gap-6">
              {/* عکس پروفایل */}
              <div className="relative">
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-white/30 blur-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl">
                  <AvatarImage 
                    src={studentProfile?.image || "/Assets/Images/Place-Holder.svg"} 
                    alt="تصویر پروفایل شاگرد"
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
                  <Sparkles className="h-4 w-4 text-white" fill="currentColor" />
                </motion.div>
              </div>

              {/* متن سلام و احوال‌پرسی */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                    {getGreeting(currentTime)} {studentData.name}! 👋
                  </h1>
                </div>
                <p className="text-white/90 text-lg">
                  {getMotivationalQuote()}
                </p>
              </div>
            </div>
            
            {/* بخش چپ - تاریخ و زمان */}
            <div className="flex flex-col gap-4">
              {/* تاریخ */}
              <motion.div 
                className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-white/80" />
                  <div className="text-right">
                    <div 
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Vazir, sans-serif' }}
                    >
                      {persianDate}
                    </div>
                    <div className="text-xs text-white/70">
                      تاریخ امروز
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* زمان زنده */}
              <motion.div 
                className="bg-white/15 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/80" />
                  <div className="text-right">
                    <motion.div 
                      className="text-xl font-bold"
                      key={formatTimeWithSeconds(currentTime)}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontFamily: 'Vazir, sans-serif' }}
                    >
                      {formatTimeWithSeconds(currentTime)}
                    </motion.div>
                    <div className="text-xs text-white/70">
                      زمان فعلی
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* نشان‌های دستاورد */}
          <motion.div 
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-white border-yellow-300/30 hover:from-yellow-400/30 hover:to-orange-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Target className="w-4 h-4 ml-2" />
              پیشرفت هفتگی: {toPersianNumbers(studentData.weeklyProgress.toString())}%
            </Badge>
            
            <Badge className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-white border-green-300/30 hover:from-green-400/30 hover:to-emerald-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Award className="w-4 h-4 ml-2" />
              استریک: {toPersianNumbers(studentData.exerciseStreak.toString())} روز
            </Badge>
            
            <Badge className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 text-white border-blue-300/30 hover:from-blue-400/30 hover:to-purple-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 ml-2" />
              روند صعودی
            </Badge>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
