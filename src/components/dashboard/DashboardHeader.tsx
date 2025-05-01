import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, Calendar, User2, Sparkles, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DashboardStats } from "@/types/dashboard";
import { formatPersianDate, toPersianNumbers } from "@/lib/utils/numbers";

interface DashboardHeaderProps {
  trainerProfile: {
    name: string;
    image: string;
  };
  currentTime: Date;
  stats: DashboardStats;
}

export const DashboardHeader = ({ trainerProfile, currentTime, stats }: DashboardHeaderProps) => {
  // Get greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'صبح بخیر';
    if (hour < 17) return 'ظهر بخیر';
    if (hour < 21) return 'عصر بخیر';
    return 'شب بخیر';
  };
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="bg-gradient-to-r from-brand-600/90 to-indigo-600/90 text-white">
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6 md:p-8">
        <motion.div 
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Left section - Welcome message and search */}
          <motion.div variants={item} className="flex flex-col space-y-4 w-full md:w-auto">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                {getTimeBasedGreeting()}{' '}
                <span className="text-white/90">{trainerProfile.name}</span>
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <Sparkles className="h-5 w-5 text-amber-300" />
                </motion.div>
              </h1>
              <p className="text-sm text-white/80 mt-1">
                {formatPersianDate(currentTime)} | {stats.totalStudents > 0 ? (
                  <span>
                    امروز {toPersianNumbers(stats.totalStudents)} شاگرد فعال دارید
                  </span>
                ) : (
                  'شاگردی در سیستم ثبت نشده است'
                )}
              </p>
            </div>
            
            <div className="relative md:hidden w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-full" 
                placeholder="جستجو..."
              />
            </div>
          </motion.div>
          
          {/* Right section - Profile, Notifications, etc. */}
          <motion.div variants={item} className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Search input - desktop only */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-64" 
                placeholder="جستجو..."
              />
            </div>
            
            {/* Notification button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                ۲
              </span>
            </Button>
            
            {/* Avatar */}
            <Avatar className="h-10 w-10 border-2 border-white/30">
              <AvatarImage src={trainerProfile.image} alt={trainerProfile.name} />
              <AvatarFallback className="bg-brand-700 text-white">
                <User2 className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>
        
        {/* Header cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <HeaderCard 
            title="شاگردان هفته"
            value={stats.totalStudents}
            growth={stats.studentGrowth}
            icon={<User2 className="h-5 w-5" />}
            delay={0.1}
          />
          
          <HeaderCard 
            title="پیشرفت میانگین"
            value={stats.studentsProgress}
            suffix="%"
            icon={<ArrowUpRight className="h-5 w-5" />}
            delay={0.2}
          />
          
          <HeaderCard 
            title="برنامه غذایی"
            value={stats.mealCompletionRate}
            suffix="%"
            growth={stats.mealGrowth}
            icon={<Calendar className="h-5 w-5" />}
            delay={0.3}
          />
          
          <HeaderCard 
            title="تکمیل تمرینات"
            value={80}
            suffix="%"
            icon={<Sparkles className="h-5 w-5" />}
            delay={0.4}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Header stat card component
interface HeaderCardProps {
  title: string;
  value: number;
  suffix?: string;
  growth?: number;
  icon: React.ReactNode;
  delay?: number;
}

const HeaderCard = ({ title, value, suffix = "", growth, icon, delay = 0 }: HeaderCardProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: { delay, duration: 0.4 }
        }
      }}
    >
      <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 p-4 flex items-center gap-4">
        <div className="bg-white/15 rounded-full p-3">
          {icon}
        </div>
        
        <div>
          <p className="text-sm text-white/80">{title}</p>
          <div className="flex items-baseline mt-1">
            <span className="text-xl font-bold">{toPersianNumbers(value)}{suffix}</span>
            
            {growth !== undefined && (
              <span className={`ml-2 text-xs font-medium ${growth >= 0 ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                {growth >= 0 ? '▲' : '▼'} {toPersianNumbers(Math.abs(growth))}٪
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
