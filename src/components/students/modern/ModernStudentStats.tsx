
import { motion } from "framer-motion";
import { Users, UserCheck, Calendar, TrendingUp, Award, Activity } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernStudentStatsProps {
  students: Student[];
}

export const ModernStudentStats = ({ students }: ModernStudentStatsProps) => {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.exercises?.length || s.meals?.length || s.supplements?.length).length;
  const avgProgress = students.length > 0 ? Math.round(students.reduce((sum, s) => sum + (s.progress || 0), 0) / students.length) : 0;
  const todayJoined = students.filter(s => {
    const joinDate = new Date(s.joinDate || Date.now());
    const today = new Date();
    return joinDate.toDateString() === today.toDateString();
  }).length;

  const statsData = [
    {
      title: "کل شاگردان",
      value: toPersianNumbers(totalStudents),
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/20 dark:to-teal-900/20",
      change: "+۱۲%",
      changeType: "positive" as const
    },
    {
      title: "شاگردان فعال",
      value: toPersianNumbers(activeStudents),
      icon: UserCheck,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20",
      change: "+۸%",
      changeType: "positive" as const
    },
    {
      title: "میانگین پیشرفت",
      value: `${toPersianNumbers(avgProgress)}%`,
      icon: TrendingUp,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50/80 to-violet-50/80 dark:from-purple-900/20 dark:to-violet-900/20",
      change: "+۵%",
      changeType: "positive" as const
    },
    {
      title: "عضویت امروز",
      value: toPersianNumbers(todayJoined),
      icon: Calendar,
      gradient: "from-orange-500 to-amber-600",
      bgGradient: "from-orange-50/80 to-amber-50/80 dark:from-orange-900/20 dark:to-amber-900/20",
      change: "+۳",
      changeType: "positive" as const
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 } 
          }}
          className="group"
        >
          <div className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id={`stat-pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#stat-pattern-${index})`} />
              </svg>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute -inset-x-1/2 top-0 h-[200%] w-[200%] -translate-x-full rotate-45 transform bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
            
            <div className="relative z-10 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg ring-1 ring-white/20 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                
                {/* Change Indicator */}
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <Activity className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {stat.title}
                </p>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Award className="w-3 h-3" />
                  <span>به‌روزرسانی شده</span>
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${stat.gradient} blur-xl`} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
