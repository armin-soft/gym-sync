
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Users, Clock, Sun, Crown, TrendingUp, Activity, Boxes, Pill } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { getAssetPath } from "@/utils/basePath";
import { useShamsiDate } from "@/hooks/useShamsiDate";

interface HeroSectionProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const HeroSection = ({ stats, currentTime, trainerProfile }: HeroSectionProps) => {
  const patternUrl = getAssetPath("Assets/Image/Pattern.svg");
  const { dateInfo, isLoading } = useShamsiDate();
  
  const quickStats = [
    { 
      title: "شاگردان", 
      icon: Users, 
      value: stats.totalStudents, 
      growth: stats.studentGrowth,
      color: "from-blue-600/20 to-blue-400/20",
      textColor: "text-blue-500",
      accentColor: "blue"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: Boxes, 
      value: stats.totalMeals, 
      growth: stats.mealGrowth,
      color: "from-emerald-600/20 to-emerald-400/20",
      textColor: "text-emerald-500",
      accentColor: "emerald"
    },
    { 
      title: "مکمل‌ها", 
      icon: Pill, 
      value: stats.totalSupplements, 
      growth: stats.supplementGrowth,
      color: "from-purple-600/20 to-purple-400/20",
      textColor: "text-purple-500",
      accentColor: "purple"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 p-6 md:p-8 text-white shadow-2xl"
    >
      {/* Background patterns and effects */}
      <div className="absolute inset-0 bg-[url('${patternUrl}')] opacity-10" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 blur-3xl rounded-full bg-pink-500/30" />
      <div className="absolute -top-10 -right-10 w-48 h-48 blur-3xl rounded-full bg-indigo-500/30" />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col space-y-8"
        >
          {/* Profile and Welcome Section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 blur-lg opacity-70 animate-pulse" />
                  <Avatar className="h-16 w-16 border-2 border-white/30 relative shadow-xl hover:scale-105 transition-transform duration-300">
                    <AvatarImage src={trainerProfile.image} alt="تصویر پروفایل" />
                    <AvatarFallback>
                      <Crown className="w-6 h-6 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      خوش آمدید <span className="inline-block animate-wave ml-1">👋</span>
                    </h1>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm hover:bg-white/30 transition-colors">
                      {trainerProfile.name || "مربی حرفه‌ای"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-white/80">
                    به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
                  </p>
                </div>
              </div>
              
              {/* Date and Time Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <AnimatePresence mode="wait">
                  {dateInfo && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-wrap gap-3"
                    >
                      <Badge 
                        variant="outline" 
                        className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
                      >
                        <span className="text-2xl">{dateInfo.Season_Emoji}</span>
                        <span>{dateInfo.Shamsi_Date}</span>
                        <span className="text-white/60">{dateInfo.Season}</span>
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors"
                      >
                        <span className="text-2xl">{dateInfo.Time_Based_Emoji}</span>
                        <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
                        <span>{currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-white/60">{dateInfo.Time_Based}</span>
                      </Badge>
                    </motion.div>
                  )}
                  {isLoading && (
                    <Badge 
                      variant="outline" 
                      className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full animate-pulse"
                    >
                      در حال بارگذاری...
                    </Badge>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
            
            {/* Quick Stats Summary */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hidden lg:flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 border-l border-white/20">
                  <div className="p-2 rounded-lg bg-blue-500/30 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">شاگردان فعال</span>
                    <span className="text-sm font-bold">{toPersianNumbers(stats.totalStudents)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4">
                  <div className="p-2 rounded-lg bg-emerald-500/30 text-white">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white/70">پیشرفت</span>
                    <span className="text-sm font-bold">{toPersianNumbers(stats.studentsProgress)}٪</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-3"
          >
            {quickStats.map((stat, index) => (
              <motion.div 
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                className="group relative flex flex-col gap-4 rounded-xl bg-gradient-to-br bg-white/10 p-4 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className={`text-xs font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                    stat.growth >= 0 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {stat.growth >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <Activity className="w-3.5 h-3.5" />
                    )}
                    {toPersianNumbers(Math.abs(stat.growth))}٪
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-sm text-white/70">{stat.title}</p>
                  <p className={`mt-1 text-xl font-bold ${stat.textColor}`}>
                    {toPersianNumbers(stat.value)}
                  </p>
                </div>

                <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r from-${stat.accentColor}-500 to-${stat.accentColor}-400`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stat.value / (stat.value * 1.5)) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
