
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Users, Utensils, Pill, TrendingUp, Target, Activity } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getColorClasses } from "../utils/colorUtils";

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

export const StatsGridNew = ({ stats }: StatsGridNewProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`responsive-grid-6 responsive-gap mb-6 sm:mb-8 ${
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
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-xl responsive-padding`}
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full blur-2xl -translate-y-8 translate-x-8" />

            <div className="relative z-10">
              <motion.div 
                className={`responsive-icon-lg rounded-lg bg-gradient-to-br ${colors.icon} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="responsive-icon text-white" />
              </motion.div>

              <motion.div 
                className="responsive-space-y"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h3 className="responsive-text-lg font-bold text-gray-900 dark:text-white text-readable">
                  {toPersianNumbers(value.toString())}{stat.suffix || ''}
                </h3>
                
                <p className="responsive-text-xs font-medium text-gray-600 dark:text-gray-400 text-readable">
                  {stat.title}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-500 text-readable">
                  {stat.description}
                </p>
              </motion.div>
            </div>

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
