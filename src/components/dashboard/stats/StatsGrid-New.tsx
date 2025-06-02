
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Users, Utensils, Pill, TrendingUp, Target, Activity } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatsGridNewProps {
  stats: DashboardStats;
}

const statsConfig = [
  {
    title: "کل شاگردان",
    value: (stats: DashboardStats) => stats.totalStudents,
    icon: Users,
    color: "emerald",
    description: "شاگرد فعال"
  },
  {
    title: "برنامه‌های غذایی",
    value: (stats: DashboardStats) => stats.totalMeals,
    icon: Utensils,
    color: "sky",
    description: "رژیم تنظیم شده"
  },
  {
    title: "مکمل‌ها",
    value: (stats: DashboardStats) => stats.totalSupplements,
    icon: Pill,
    color: "orange",
    description: "مکمل تجویز شده"
  },
  {
    title: "میانگین پیشرفت",
    value: (stats: DashboardStats) => stats.studentsProgress,
    icon: TrendingUp,
    color: "purple",
    description: "درصد پیشرفت کلی",
    suffix: "%"
  },
  {
    title: "نرخ تکمیل رژیم",
    value: (stats: DashboardStats) => stats.mealCompletionRate,
    icon: Target,
    color: "pink",
    description: "نرخ موفقیت",
    suffix: "%"
  },
  {
    title: "نرخ مصرف مکمل",
    value: (stats: DashboardStats) => stats.supplementCompletionRate,
    icon: Activity,
    color: "indigo",
    description: "نرخ استفاده",
    suffix: "%"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string; border: string; icon: string; } } = {
    emerald: {
      bg: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
      border: "border-emerald-200/50 dark:border-emerald-800/50",
      icon: "from-emerald-500 to-emerald-600"
    },
    sky: {
      bg: "from-sky-50 to-sky-100/50 dark:from-sky-950/30 dark:to-sky-900/20",
      border: "border-sky-200/50 dark:border-sky-800/50",
      icon: "from-sky-500 to-sky-600"
    },
    orange: {
      bg: "from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20",
      border: "border-orange-200/50 dark:border-orange-800/50",
      icon: "from-orange-500 to-orange-600"
    },
    purple: {
      bg: "from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20",
      border: "border-purple-200/50 dark:border-purple-800/50",
      icon: "from-purple-500 to-purple-600"
    },
    pink: {
      bg: "from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20",
      border: "border-pink-200/50 dark:border-pink-800/50",
      icon: "from-pink-500 to-pink-600"
    },
    indigo: {
      bg: "from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20",
      border: "border-indigo-200/50 dark:border-indigo-800/50",
      icon: "from-indigo-500 to-indigo-600"
    }
  };
  return colorMap[color];
};

export const StatsGridNew = ({ stats }: StatsGridNewProps) => {
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
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`grid gap-6 mb-8 ${
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
        const colors = getColorClasses(stat.color);

        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-xl p-6`}
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            {/* المان تزیینی پس‌زمینه */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -translate-y-12 translate-x-12" />

            <div className="relative z-10">
              {/* آیکون */}
              <motion.div 
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center mb-4 shadow-lg`}
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* مقدار */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers(value.toString())}{stat.suffix || ''}
                </h3>
                
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {stat.description}
                </p>
              </motion.div>
            </div>

            {/* افکت هاور */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsGridNew;
