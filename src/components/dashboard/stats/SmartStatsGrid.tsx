
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Users, Utensils, Pill, TrendingUp, Target, Activity } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SmartStatsGridProps {
  stats: DashboardStats;
}

const statsConfig = [
  {
    title: "کل شاگردان",
    value: (stats: DashboardStats) => stats.totalStudents,
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50",
    growth: (stats: DashboardStats) => stats.studentGrowth,
    format: (value: number) => value.toString()
  },
  {
    title: "برنامه‌های غذایی",
    value: (stats: DashboardStats) => stats.totalMeals,
    icon: Utensils,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50",
    growth: (stats: DashboardStats) => stats.mealGrowth,
    format: (value: number) => value.toString()
  },
  {
    title: "مکمل‌ها",
    value: (stats: DashboardStats) => stats.totalSupplements,
    icon: Pill,
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50 dark:from-purple-950/50 dark:to-indigo-950/50",
    growth: (stats: DashboardStats) => stats.supplementGrowth,
    format: (value: number) => value.toString()
  },
  {
    title: "میانگین پیشرفت",
    value: (stats: DashboardStats) => stats.studentsProgress,
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50",
    growth: (stats: DashboardStats) => 0,
    format: (value: number) => `${value}%`
  },
  {
    title: "نرخ تکمیل رژیم",
    value: (stats: DashboardStats) => stats.mealCompletionRate,
    icon: Target,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50",
    growth: (stats: DashboardStats) => 0,
    format: (value: number) => `${value}%`
  },
  {
    title: "نرخ مصرف مکمل",
    value: (stats: DashboardStats) => stats.supplementCompletionRate,
    icon: Activity,
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50",
    growth: (stats: DashboardStats) => 0,
    format: (value: number) => `${value}%`
  }
];

export const SmartStatsGrid = ({ stats }: SmartStatsGridProps) => {
  const deviceInfo = useDeviceInfo();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`grid gap-6 ${
        deviceInfo.isMobile 
          ? 'grid-cols-1' 
          : deviceInfo.isTablet 
          ? 'grid-cols-2' 
          : 'grid-cols-3 xl:grid-cols-6'
      }`}
    >
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        const value = stat.value(stats);
        const growth = stat.growth(stats);

        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-xl`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50" />
            
            {/* Floating Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16" />

            <div className="relative z-10 p-6">
              {/* Icon */}
              <motion.div 
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Value */}
              <motion.div 
                className="space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <motion.h3 
                  className="text-3xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.format(value)}
                </motion.h3>
                
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {stat.title}
                </p>

                {/* Growth Indicator */}
                {growth !== 0 && (
                  <motion.div 
                    className={`flex items-center space-x-1 space-x-reverse text-xs ${
                      growth > 0 ? 'text-emerald-600' : 'text-red-500'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <TrendingUp className={`w-3 h-3 ${growth < 0 ? 'rotate-180' : ''}`} />
                    <span className="font-medium">{Math.abs(growth)}%</span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Hover Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
