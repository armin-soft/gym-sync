
import React from "react";
import { motion } from "framer-motion";
import { Users, Target, TrendingUp, Award, Zap, Crown } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface EliteHeroSectionProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const EliteHeroSection = ({ stats, currentTime, trainerProfile }: EliteHeroSectionProps) => {
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return toPersianNumbers(`${hours}:${minutes}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const quickStats = [
    { 
      title: "شاگردان", 
      value: stats.totalStudents,
      icon: Users,
      color: "from-violet-500 to-purple-600",
      bg: "bg-violet-50 dark:bg-violet-950/20"
    },
    { 
      title: "میانگین پیشرفت", 
      value: stats.studentsProgress,
      icon: Target,
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      suffix: "%"
    },
    { 
      title: "رشد ماهانه", 
      value: stats.studentGrowth,
      icon: TrendingUp,
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50 dark:bg-amber-950/20",
      suffix: "%"
    }
  ];

  return (
    <div className="relative">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 5, delay: 1, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
            {/* Profile */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-gradient-to-r from-violet-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={trainerProfile.image || "/placeholder.svg"} 
                      alt={trainerProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <motion.div 
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-2 shadow-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  سلام، {trainerProfile.name}
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  آماده برای موفقیت جدید؟
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Award className="w-4 h-4 text-violet-500" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    مربی حرفه‌ای
                  </span>
                </div>
              </div>
            </div>

            {/* Time Display */}
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 dark:border-violet-700/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${stat.bg} rounded-2xl p-6 border border-white/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  {stat.value > 0 && (
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Zap className="w-4 h-4" />
                      <span className="text-xs font-medium">فعال</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">
                    {toPersianNumbers(stat.value)}{stat.suffix || ""}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.title}
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
