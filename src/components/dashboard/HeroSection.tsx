
import React from "react";
import { motion } from "framer-motion";
import { Users, Boxes, Pill, Sparkles, CalendarCheck, Award } from "lucide-react";
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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/90 via-violet-600/90 to-purple-600/90 p-6 md:p-8 text-white shadow-2xl"
    >
      {/* Dynamic background elements */}
      <motion.div 
        className="absolute inset-0 bg-[url('${patternUrl}')] opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Animated glowing orbs */}
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 blur-3xl rounded-full bg-pink-500/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 blur-3xl rounded-full bg-indigo-500/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
      
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
      
      {/* Decorative elements */}
      <div className="absolute right-8 bottom-6 opacity-20">
        <Sparkles className="w-24 h-24 text-white" />
      </div>
      
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Additional badges */}
      <div className="absolute top-4 right-6">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
          className="bg-amber-500/30 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30 flex items-center gap-1.5 shadow-lg"
        >
          <Award className="w-3.5 h-3.5 text-amber-200" />
          <span className="text-xs font-medium text-amber-100">مربی نمونه</span>
        </motion.div>
      </div>
      
      <div className="absolute bottom-4 left-6">
        <motion.div
          initial={{ scale: 0, rotate: 10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
          className="bg-emerald-500/30 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-300/30 flex items-center gap-1.5 shadow-lg"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-emerald-200" />
          <span className="text-xs font-medium text-emerald-100">پیگیری منظم</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
