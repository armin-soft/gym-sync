
import { motion } from "framer-motion";
import { Database, Archive, RefreshCw, Shield, TrendingUp, Zap } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface BackupStatsCardsProps {
  realStats: {
    students: number;
    exercises: number;
    meals: number;
    supplements: number;
  };
}

export function BackupStatsCards({ realStats }: BackupStatsCardsProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const totalItems = realStats.students + realStats.exercises + realStats.meals + realStats.supplements;

  const statsData = [
    { 
      icon: Database, 
      label: "شاگردان", 
      count: toPersianNumbers(realStats.students), 
      color: "from-emerald-500 via-emerald-600 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      percentage: totalItems > 0 ? Math.round((realStats.students / totalItems) * 100) : 0
    },
    { 
      icon: Archive, 
      label: "تمرینات", 
      count: toPersianNumbers(realStats.exercises), 
      color: "from-blue-500 via-blue-600 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      percentage: totalItems > 0 ? Math.round((realStats.exercises / totalItems) * 100) : 0
    },
    { 
      icon: RefreshCw, 
      label: "وعده‌های غذایی", 
      count: toPersianNumbers(realStats.meals), 
      color: "from-purple-500 via-purple-600 to-pink-600",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      percentage: totalItems > 0 ? Math.round((realStats.meals / totalItems) * 100) : 0
    },
    { 
      icon: Shield, 
      label: "مکمل‌ها", 
      count: toPersianNumbers(realStats.supplements), 
      color: "from-orange-500 via-orange-600 to-red-600",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      percentage: totalItems > 0 ? Math.round((realStats.supplements / totalItems) * 100) : 0
    }
  ];

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            y: -5,
            transition: { duration: 0.2 }
          }}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/20 dark:border-slate-700/20 group cursor-pointer`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-white to-transparent rounded-full" />
            <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-tl from-white to-transparent rounded-full" />
          </div>

          {/* Icon container with advanced effects */}
          <div className="relative mb-4 sm:mb-6">
            <motion.div 
              className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
              whileHover={{ rotate: 5 }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
              
              <stat.icon className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>

            {/* Floating trend indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              <TrendingUp className="w-3 h-3 text-white" />
            </motion.div>
          </div>

          {/* Stats content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <motion.div 
                className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-800 dark:text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                {stat.count}
              </motion.div>
              
              {/* Performance indicator */}
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {toPersianNumbers(stat.percentage)}%
                </span>
              </div>
            </div>
            
            <div className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 mb-3">
              {stat.label}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/30 dark:bg-slate-700/30 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${stat.percentage}%` }}
                transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
              />
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl" />
        </motion.div>
      ))}
    </motion.div>
  );
}
