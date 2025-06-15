
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Target, Award, TrendingUp, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStudentData } from "../hooks/useStudentData";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentDashboardWelcome: React.FC = () => {
  const { studentData, loading } = useStudentData();

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

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صبح بخیر";
    if (hour < 17) return "ظهر بخیر";
    return "عصر بخیر";
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
          {/* ردیف بالا - تاریخ و زمان */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.div 
                className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Sparkles className="w-8 h-8 text-yellow-200" />
              </motion.div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                  {getGreetingMessage()} {studentData.name}! 👋
                </h1>
                <p className="text-white/90 text-lg mt-2">
                  {getMotivationalQuote()}
                </p>
              </div>
            </div>
            
            <motion.div 
              className="text-left space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 justify-end">
                <span className="text-white/90 text-sm">{getCurrentPersianDate()}</span>
                <Calendar className="w-5 h-5 text-white/80" />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <span className="text-2xl font-bold">{getCurrentTime()}</span>
                <Clock className="w-5 h-5 text-white/80" />
              </div>
            </motion.div>
          </div>

          {/* نشان‌های دستاورد */}
          <motion.div 
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
