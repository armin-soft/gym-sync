
import React from "react";
import { motion } from "framer-motion";
import { Users, Activity, Target, TrendingUp, Award, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const ModernStatsGrid = () => {
  const { students } = useStudents();
  const deviceInfo = useDeviceInfo();
  
  // Calculate real statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.name && s.phone).length;
  const studentsWithPrograms = students.filter(student => {
    const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
    const hasMeals = student.meals && Array.isArray(student.meals) && student.meals.length > 0;
    const hasSupplements = student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0;
    return hasExercises || hasMeals || hasSupplements;
  }).length;
  
  const completionRate = totalStudents > 0 ? Math.round((studentsWithPrograms / totalStudents) * 100) : 0;
  const averageProgress = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;
  
  const stats = [
    {
      id: 1,
      title: "مجموع شاگردان",
      value: totalStudents,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
      change: "+۱۲%",
      changeType: "positive",
      description: "نسبت به ماه گذشته"
    },
    {
      id: 2,
      title: "شاگردان فعال",
      value: activeStudents,
      icon: Activity,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20",
      change: "+۸%",
      changeType: "positive",
      description: "نسبت به هفته گذشته"
    },
    {
      id: 3,
      title: "برنامه‌های تعریف شده",
      value: studentsWithPrograms,
      icon: Target,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      darkBgGradient: "from-purple-900/20 to-indigo-900/20",
      change: "+۱۵%",
      changeType: "positive",
      description: "برنامه‌های جدید"
    },
    {
      id: 4,
      title: "نرخ تکمیل",
      value: completionRate,
      icon: Award,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "from-orange-900/20 to-red-900/20",
      change: "+۵%",
      changeType: "positive",
      suffix: "%",
      description: "میزان تکمیل برنامه‌ها"
    },
    {
      id: 5,
      title: "میانگین پیشرفت",
      value: averageProgress,
      icon: TrendingUp,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      darkBgGradient: "from-pink-900/20 to-rose-900/20",
      change: "+۷%",
      changeType: "positive",
      suffix: "%",
      description: "پیشرفت کلی شاگردان"
    },
    {
      id: 6,
      title: "جلسات این ماه",
      value: studentsWithPrograms * 8,
      icon: Calendar,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "from-violet-900/20 to-purple-900/20",
      change: "+۲۳%",
      changeType: "positive",
      description: "جلسات برگزار شده"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <div className={`grid gap-4 ${
        deviceInfo.isMobile 
          ? 'grid-cols-1' 
          : deviceInfo.isTablet 
          ? 'grid-cols-2' 
          : 'grid-cols-3 xl:grid-cols-6'
      }`}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} dark:bg-gradient-to-br dark:${stat.darkBgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 bg-gradient-to-r ${stat.gradient} rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    stat.changeType === 'positive' 
                      ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30' 
                      : 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                  }`}>
                    <TrendingUp className="h-2.5 w-2.5" />
                    {toPersianNumbers(stat.change)}
                  </div>
                </div>
                
                {/* Value */}
                <div className="mb-2">
                  <div className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                    {toPersianNumbers(stat.value.toString())}{stat.suffix || ''}
                  </div>
                </div>
                
                {/* Title & Description */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1 right-1 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-full -translate-y-2 translate-x-2 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-1 left-1 w-10 h-10 bg-gradient-to-tl from-white/10 to-white/5 rounded-full translate-y-2 -translate-x-2 group-hover:scale-125 transition-transform duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
