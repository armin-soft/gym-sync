
import { motion } from "framer-motion";
import { Database, Archive, RefreshCw, Shield } from "lucide-react";
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const statsData = [
    { icon: Database, label: "شاگردان", count: toPersianNumbers(realStats.students), color: "from-gold-500 to-blue-600" },
    { icon: Archive, label: "تمرینات", count: toPersianNumbers(realStats.exercises), color: "from-blue-500 to-black-600" },
    { icon: RefreshCw, label: "وعده‌های غذایی", count: toPersianNumbers(realStats.meals), color: "from-black-500 to-gold-600" },
    { icon: Shield, label: "مکمل‌ها", count: toPersianNumbers(realStats.supplements), color: "from-gold-600 to-blue-500" }
  ];

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 lg:mb-12">
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-white/20 dark:border-slate-700/20"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} mb-2 sm:mb-3`}>
            <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-1 text-right">
            {stat.count}
          </div>
          <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 text-right">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
