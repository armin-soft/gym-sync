
import React from "react";
import { motion } from "framer-motion";
import { Users, Boxes, Pill, Sparkles } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import { getAssetPath } from "@/utils/basePath";
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
  const patternUrl = getAssetPath("Assets/Image/Pattern.svg");
  
  const quickStats = [
    { 
      title: "شاگردان", 
      icon: Users, 
      value: stats.totalStudents, 
      growth: stats.studentGrowth,
      color: "from-blue-600/20 to-blue-400/20",
      textColor: "text-blue-400",
      accentColor: "blue"
    },
    { 
      title: "برنامه‌های غذایی", 
      icon: Boxes, 
      value: stats.totalMeals, 
      growth: stats.mealGrowth,
      color: "from-emerald-600/20 to-emerald-400/20",
      textColor: "text-emerald-400",
      accentColor: "emerald"
    },
    { 
      title: "مکمل‌ها", 
      icon: Pill, 
      value: stats.totalSupplements, 
      growth: stats.supplementGrowth,
      color: "from-purple-600/20 to-purple-400/20",
      textColor: "text-purple-400",
      accentColor: "purple"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/90 via-violet-600/90 to-purple-600/90 p-6 md:p-8 text-white shadow-2xl"
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 bg-[url('${patternUrl}')] opacity-10" />
      
      {/* Animated background gradients */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-60 h-60 blur-3xl rounded-full bg-pink-500/30"
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
        className="absolute -top-20 -right-20 w-60 h-60 blur-3xl rounded-full bg-indigo-500/30"
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
            <ProfileSection trainerProfile={trainerProfile} stats={stats} />
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
