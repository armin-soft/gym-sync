
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/dashboard";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { BarChart2, Award, Target, TrendingUp, Star } from "lucide-react";

interface ProgressOverviewProps {
  stats: DashboardStats;
}

export const ProgressOverview = ({ stats }: ProgressOverviewProps) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Animation variants for each item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Progress status text and color based on percentage
  const getProgressStatus = (percentage: number) => {
    if (percentage < 20) return { text: 'شروع کار', color: 'text-red-500' };
    if (percentage < 40) return { text: 'در حال پیشرفت', color: 'text-orange-500' };
    if (percentage < 60) return { text: 'نسبتاً خوب', color: 'text-yellow-500' };
    if (percentage < 80) return { text: 'خیلی خوب', color: 'text-green-500' };
    return { text: 'عالی', color: 'text-emerald-500' };
  };

  // Calculate progress levels
  const studentProgressStatus = getProgressStatus(stats.studentsProgress);
  const mealProgressStatus = getProgressStatus(stats.mealCompletionRate);
  const supplementProgressStatus = getProgressStatus(stats.supplementCompletionRate);

  // Create progress data for visualization
  const progressData = [
    {
      title: 'پیشرفت شاگردان',
      percentage: stats.studentsProgress,
      status: studentProgressStatus,
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'تکمیل برنامه غذایی',
      percentage: stats.mealCompletionRate,
      status: mealProgressStatus,
      icon: Target,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'تکمیل مکمل و ویتامین',
      percentage: stats.supplementCompletionRate,
      status: supplementProgressStatus,
      icon: Award,
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-md">
              <BarChart2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-lg font-bold">پیشرفت کلی</CardTitle>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs py-1 px-2 rounded-full">
            {toPersianNumbers(new Date().getFullYear())}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {progressData.map((item, index) => (
            <motion.div key={item.title} variants={itemVariants} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">{toPersianNumbers(item.percentage)}٪</span>
                  {item.percentage > 75 && (
                    <Star className="h-3 w-3 text-amber-400" fill="#fbbf24" />
                  )}
                </div>
              </div>
              
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute top-0 h-full w-5 bg-white/30"
                    animate={{
                      left: ["-10%", "110%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className={item.status.color}>{item.status.text}</span>
                <span className="text-gray-500">{toPersianNumbers(item.percentage)}/۱۰۰</span>
              </div>
            </motion.div>
          ))}
          
          <div className="mt-6 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">عملکرد کلی</span>
              <div className="flex items-center">
                {stats.studentsProgress > 60 ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.8
                    }}
                    className="flex items-center"
                  >
                    <Award className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <Target className="h-5 w-5 text-blue-500" strokeWidth={1.5} />
                )}
              </div>
            </div>
            
            {/* Overall progress message */}
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {stats.studentsProgress > 75 ? (
                <>عملکرد شما <span className="text-green-500 font-semibold">عالی</span> است. ادامه دهید!</>
              ) : stats.studentsProgress > 50 ? (
                <>عملکرد شما <span className="text-blue-500 font-semibold">خوب</span> است. می‌توانید بهتر شوید.</>
              ) : (
                <>عملکرد شما <span className="text-orange-500 font-semibold">متوسط</span> است. بیشتر تلاش کنید.</>
              )}
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
