
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Star, Crown, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardStats } from "@/types/dashboard";
import { StatisticCard } from "../cards/StatisticCard";
import { Users, TrendingUp, Award, Target } from "lucide-react";

interface HeroSectionModernProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const HeroSectionModern = ({ stats, currentTime, trainerProfile }: HeroSectionModernProps) => {
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
    <div className="relative overflow-hidden rounded-3xl p-8 mb-8">
      {/* Advanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 via-transparent to-violet-500/30" />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -60, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-yellow-400 via-pink-400 to-indigo-400 opacity-75 blur-lg animate-pulse" />
              <Avatar className="h-20 w-20 ring-4 ring-white/30 shadow-2xl relative">
                <AvatarImage src={trainerProfile.image} alt={trainerProfile.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                  {getInitials(trainerProfile.name)}
                </AvatarFallback>
              </Avatar>
              
              <motion.div 
                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Crown className="h-4 w-4 text-white" fill="currentColor" />
              </motion.div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-300" fill="currentColor" />
                </motion.div>
                <span className="text-sm text-white/80 font-medium">{getGreeting()}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                <span>{trainerProfile.name || "مربی عزیز"}</span>
                <Star className="h-6 w-6 text-yellow-300" fill="currentColor" />
              </h1>
              
              <p className="text-white/70 text-sm">
                به داشبورد مدیریت حرفه‌ای خود خوش آمدید
              </p>
            </div>
          </motion.div>
          
          {/* Time Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <Badge variant="outline" className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date().toLocaleDateString('fa-IR')}
            </Badge>
            <Badge variant="outline" className="border-white/20 bg-white/10 text-white backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 mr-2" />
              {currentTime.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
            </Badge>
          </motion.div>
        </div>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatisticCard
            title="تعداد شاگردان"
            value={stats.totalStudents}
            change={stats.studentGrowth}
            icon={Users}
            color="blue"
            delay={0.1}
          />
          <StatisticCard
            title="میانگین پیشرفت"
            value={stats.studentsProgress}
            change={15}
            icon={TrendingUp}
            color="green"
            delay={0.2}
          />
          <StatisticCard
            title="برنامه‌های تکمیل شده"
            value={stats.totalMeals}
            change={stats.mealGrowth}
            icon={Target}
            color="purple"
            delay={0.3}
          />
          <StatisticCard
            title="امتیاز کلی"
            value={95}
            change={8}
            icon={Award}
            color="orange"
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
};
