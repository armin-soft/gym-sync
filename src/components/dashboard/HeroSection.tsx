
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Users, Clock, Sun, Crown, TrendingUp, Activity } from "lucide-react";
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
      color: "bg-blue-500/20",
      textColor: "text-blue-400"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: Users, 
      value: stats.totalMeals, 
      growth: stats.mealGrowth,
      color: "bg-emerald-500/20",
      textColor: "text-emerald-400"
    },
    { 
      title: "مکمل‌ها", 
      icon: Users, 
      value: stats.totalSupplements, 
      growth: stats.supplementGrowth,
      color: "bg-purple-500/20",
      textColor: "text-purple-400"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 p-6 md:p-8 text-white shadow-lg">
      <div className={`absolute inset-0 bg-[url('${patternUrl}')] opacity-10`} />
      <div className="absolute -bottom-5 -left-5 w-40 h-40 blur-3xl rounded-full bg-pink-600/30" />
      <div className="absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full bg-indigo-600/30" />
      
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 blur-sm opacity-70 animate-pulse" />
                  <Avatar className="h-16 w-16 border-2 border-white/30 relative shadow-lg">
                    <AvatarImage src={trainerProfile.image} alt="تصویر پروفایل" />
                    <AvatarFallback>
                      <Crown className="w-6 h-6 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      خوش آمدید <span className="inline-block ml-1">👋</span>
                    </h1>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      {trainerProfile.name || "مربی حرفه ای"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-white/80">
                    به داشبورد مدیریت برنامه تمرینی خود خوش آمدید
                  </p>
                </div>
              </div>
              
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
                        className="border-white/10 bg-white/10 text-white backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2"
                      >
                        <span className="text-2xl">{dateInfo.Season_Emoji}</span>
                        <span>{dateInfo.Shamsi_Date}</span>
                        <span className="text-white/60">{dateInfo.Season}</span>
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="border-white/10 bg-white/10 text-white backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2"
                      >
                        <span className="text-2xl">{dateInfo.Time_Based_Emoji}</span>
                        <Clock className="w-3.5 h-3.5 ml-1.5 text-blue-300" />
                        <span>{currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                        <span className="text-white/60">{dateInfo.Time_Based}</span>
                      </Badge>
                    </motion.div>
                  )}
                  {isLoading && (
                    <Badge 
                      variant="outline" 
                      className="border-white/10 bg-white/10 text-white backdrop-blur-sm px-3 py-1.5 rounded-full animate-pulse"
                    >
                      در حال بارگذاری...
                    </Badge>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="hidden lg:flex items-center gap-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner"
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="p-2 rounded-lg bg-indigo-500/30 text-white">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">شاگردان فعال</span>
                  <span className="text-sm font-bold">{toPersianNumbers(stats.totalStudents)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="p-2 rounded-lg bg-emerald-500/30 text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">پیشرفت</span>
                  <span className="text-sm font-bold">{toPersianNumbers(stats.studentsProgress)}٪</span>
                </div>
              </div>
            </motion.div>
          </div>

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
                className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300 shadow-inner group"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/80">{stat.title}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">{toPersianNumbers(stat.value)}</p>
                    <div className={`flex items-center text-xs ${stat.growth >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {stat.growth >= 0 ? <TrendingUp className="w-3 h-3 ml-1" /> : <Activity className="w-3 h-3 ml-1" />}
                      {toPersianNumbers(Math.abs(stat.growth))}٪
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
