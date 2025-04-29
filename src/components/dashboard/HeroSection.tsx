
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
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/90 via-violet-600/90 to-purple-600/90 p-6 md:p-8 text-white shadow-2xl"
    >
      {/* Interactive background elements */}
      <div className="absolute inset-0 bg-[url('${patternUrl}')] opacity-10" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 blur-3xl rounded-full bg-pink-500/30" />
      <div className="absolute -top-10 -right-10 w-48 h-48 blur-3xl rounded-full bg-indigo-500/30" />
      
      {/* Animated particles */}
      <ParticlesEffect />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col space-y-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ProfileSection trainerProfile={trainerProfile} stats={stats} />
            <DateTimeSection currentTime={currentTime} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-3"
          >
            {quickStats.map((stat, index) => (
              <QuickStatsCard
                key={stat.title}
                {...stat}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-8 bottom-6 opacity-20">
        <Sparkles className="w-24 h-24 text-white" />
      </div>
    </motion.div>
  );
};

// Interactive particle effect component
const ParticlesEffect = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -50 - 20],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0.5, 0],
            scale: [1, Math.random() + 0.5],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};
