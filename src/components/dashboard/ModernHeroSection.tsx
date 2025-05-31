
import React from "react";
import { motion } from "framer-motion";
import { Users, UtensilsCrossed, Pill, Sparkles, Crown, Trophy, Star } from "lucide-react";
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

export const ModernHeroSection = ({ stats, currentTime, trainerProfile }: ModernHeroSectionProps) => {
  const safeStats = stats || {
    totalStudents: 0,
    totalMeals: 0,
    totalSupplements: 0,
    studentGrowth: 0,
    mealGrowth: 0,
    supplementGrowth: 0,
    studentsProgress: 0,
    maxCapacity: 50,
    mealCompletionRate: 0,
    supplementCompletionRate: 0
  };

  const safeTrainerProfile = trainerProfile || {
    name: "مربی حرفه‌ای",
    image: "/placeholder.svg"
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return toPersianNumbers(`${hours}:${minutes}`);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('fa-IR', options).format(date);
  };

  const quickStats = [
    { 
      title: "شاگردان", 
      icon: Users, 
      value: safeStats.totalStudents, 
      growth: safeStats.studentGrowth,
      color: "from-black to-gray-800",
      bgColor: "bg-gradient-to-br from-black/5 to-gray-800/5",
      borderColor: "border-black/10",
      textColor: "text-black dark:text-white"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: UtensilsCrossed, 
      value: safeStats.totalMeals, 
      growth: safeStats.mealGrowth,
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-gradient-to-br from-blue-500/5 to-blue-800/5",
      borderColor: "border-blue-500/10",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      title: "مکمل‌ها", 
      icon: Pill, 
      value: safeStats.totalSupplements, 
      growth: safeStats.supplementGrowth,
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-gradient-to-br from-yellow-500/5 to-yellow-700/5",
      borderColor: "border-yellow-500/10",
      textColor: "text-yellow-600 dark:text-yellow-400"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* بک‌گراند کارت اصلی */}
      <div className="bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-blue-950/30 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-sm">
        {/* عناصر تزیینی پس‌زمینه */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div 
            className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8, 
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>

        <div className="relative z-10 p-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
            {/* Profile Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
                  <img 
                    src={safeTrainerProfile.image || "/placeholder.svg"} 
                    alt={safeTrainerProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-1.5 shadow-lg"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    سلام، {safeTrainerProfile.name}
                  </h1>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  آماده برای یک روز پر انرژی؟
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>ظرفیت کل:</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {toPersianNumbers(safeStats.maxCapacity)} شاگرد
                  </span>
                </div>
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(currentTime)}
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-500 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    {stat.growth > 0 && (
                      <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-medium">
                        <Trophy className="w-3 h-3" />
                        <span>+{toPersianNumbers(stat.growth)}٪</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-2xl font-bold ${stat.textColor}`}>
                      {toPersianNumbers(stat.value)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
