
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Zap, Heart } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentDashboardHeroProps {
  student: Student;
}

export const StudentDashboardHero: React.FC<StudentDashboardHeroProps> = ({ student }) => {
  const getCurrentPersianTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return toPersianNumbers(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "صبح بخیر";
    if (hour < 17) return "ظهر بخیر";
    return "عصر بخیر";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-transparent"></div>
      
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl transform -translate-x-32 translate-y-32"></div>
      
      <div className="relative p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Main content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-6 w-6 text-red-400" />
                <span className="text-white/80 text-lg">{getGreeting()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {student.name} عزیز! 👋
              </h1>
              <p className="text-xl text-white/90 mb-4">
                آماده برای چالش‌های امروز هستید؟
              </p>
              
              {/* Time and date */}
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>ساعت: {getCurrentPersianTime()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>امروز</span>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                شروع تمرین امروز
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 border border-white/20">
                مشاهده رژیم غذایی
              </button>
            </motion.div>
          </div>

          {/* Student avatar and stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20">
                <img 
                  src={student.image || "/Assets/Image/Place-Holder.svg"} 
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center text-white">
              <div className="text-3xl font-bold mb-1">
                {toPersianNumbers(Math.floor(Math.random() * 30 + 70))}%
              </div>
              <div className="text-white/80">پیشرفت هفتگی</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
