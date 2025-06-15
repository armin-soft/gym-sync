
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentDashboardHeader = () => {
  // دریافت اطلاعات شاگرد از localStorage
  const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
  const studentName = studentData.name || "شاگرد عزیز";
  
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="relative overflow-hidden rounded-3xl p-8 mb-8 bg-gradient-to-l from-emerald-600 to-sky-600"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-white">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {studentName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">
                سلام {studentName}! 👋
              </h1>
              <p className="text-white/80 text-lg">
                به پنل شخصی خود خوش آمدید
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Target className="w-4 h-4 ml-2" />
              هدف امروز: ۸۰% تکمیل شده
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <TrendingUp className="w-4 h-4 ml-2" />
              پیشرفت هفتگی: +۱۵%
            </Badge>
          </div>
        </div>
        
        <div className="text-left lg:text-right">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-white/80" />
            <span className="text-white/90">{getCurrentPersianDate()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white/80" />
            <span className="text-2xl font-bold">{getCurrentTime()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
