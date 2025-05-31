
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp, Users, Target, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernHeroSectionProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

const StatCard = ({ icon: Icon, value, label, color }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`p-4 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-xl ${color} shadow-sm`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{toPersianNumbers(value)}</p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
      </div>
    </div>
  </motion.div>
);

export const ModernHeroSection = ({ stats, currentTime, trainerProfile }: ModernHeroSectionProps) => {
  const getGreeting = () => {
    const hour = currentTime.getHours();
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

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        {/* Profile Info */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-white/50 shadow-xl">
              <AvatarImage src={trainerProfile.image} alt={trainerProfile.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                {getInitials(trainerProfile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{getGreeting()}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
              {trainerProfile.name || "مربی عزیز"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              به داشبورد مدیریت خود خوش آمدید
            </p>
          </div>
        </motion.div>
        
        {/* Date & Time */}
        <motion.div 
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Badge variant="outline" className="bg-white/50 border-slate-200/50 text-slate-700">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('fa-IR')}
          </Badge>
          <Badge variant="outline" className="bg-white/50 border-slate-200/50 text-slate-700">
            <Clock className="w-4 h-4 mr-2" />
            {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
          </Badge>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <StatCard
          icon={Users}
          value={stats.totalStudents}
          label="تعداد شاگردان"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={TrendingUp}
          value={stats.studentsProgress}
          label="میانگین پیشرفت"
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          icon={Target}
          value={stats.totalMeals}
          label="برنامه‌های غذایی"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          icon={Award}
          value={95}
          label="امتیاز کلی"
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </motion.div>
    </motion.div>
  );
};
