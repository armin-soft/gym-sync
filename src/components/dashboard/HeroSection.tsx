
import React from "react";
import { motion } from "framer-motion";
import { Users, Boxes, Pill, Sparkles } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { ProfileSection } from "./hero/ProfileSection";
import { DateTimeSection } from "./hero/DateTimeSection";
import { QuickStatsCard } from "./hero/QuickStatsCard";

interface HeroSectionProps {
  stats: DashboardStats;
  currentTime: Date;
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const HeroSection = ({ stats, currentTime, trainerProfile }: HeroSectionProps) => {
  console.log('HeroSection props:', { stats, trainerProfile });
  
  // اطمینان از وجود داده‌ها
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
  
  const quickStats = [
    { 
      title: "شاگردان", 
      icon: Users, 
      value: safeStats.totalStudents, 
      growth: safeStats.studentGrowth,
      color: "from-gold-600/20 to-gold-400/20",
      textColor: "text-gold-400",
      accentColor: "gold"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: Boxes, 
      value: safeStats.totalMeals, 
      growth: safeStats.mealGrowth,
      color: "from-bronze-600/20 to-bronze-400/20",
      textColor: "text-bronze-400",
      accentColor: "bronze"
    },
    { 
      title: "مکمل‌ها", 
      icon: Pill, 
      value: safeStats.totalSupplements, 
      growth: safeStats.supplementGrowth,
      color: "from-masculine-600/20 to-masculine-400/20",
      textColor: "text-masculine-400",
      accentColor: "masculine"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-white shadow-2xl min-h-[300px]"
      style={{
        background: 'linear-gradient(135deg, rgb(217 119 6 / 0.9) 0%, rgb(161 130 102 / 0.9) 50%, rgb(183 110 121 / 0.9) 100%)'
      }}
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-600/20 via-bronze-600/20 to-masculine-600/20" />
      
      {/* Animated background gradients */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-60 h-60 blur-3xl rounded-full bg-bronze-500/30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute -top-20 -right-20 w-60 h-60 blur-3xl rounded-full bg-gold-500/30"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ 
          duration: 10, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      {/* Subtle animated particles */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      <div className="relative z-10">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ProfileSection trainerProfile={safeTrainerProfile} stats={safeStats} />
            <DateTimeSection currentTime={currentTime} />
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {quickStats.map((stat, index) => (
              <QuickStatsCard
                key={stat.title}
                {...stat}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative element */}
      <motion.div 
        className="absolute right-8 bottom-6 opacity-20"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <Sparkles className="w-24 h-24 text-white" />
      </motion.div>
    </motion.div>
  );
};
