
import { motion } from "framer-motion";
import { Users, Dumbbell, UtensilsCrossed, Pill, TrendingUp, Database } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { DataStats } from "../hooks/useDataStats";

interface DataStatsGridProps {
  stats: DataStats;
}

export function DataStatsGrid({ stats }: DataStatsGridProps) {
  // محاسبه حداکثر مقادیر برای نمایش پیشرفت واقعی
  const maxValues = {
    students: Math.max(stats.students, 50),
    exercises: Math.max(stats.exercises, 100),
    meals: Math.max(stats.meals, 50),
    supplements: Math.max(stats.supplements, 30),
    totalRecords: Math.max(stats.students + stats.exercises + stats.meals + stats.supplements, 100)
  };

  // محاسبه درصد پیشرفت واقعی
  const calculateProgress = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const statsItems = [
    {
      icon: Users,
      title: "شاگردان",
      value: stats.students,
      color: "from-emerald-500 to-emerald-700",
      bgColor: "from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900",
      description: "کاربران فعال سیستم",
      progress: calculateProgress(stats.students, maxValues.students)
    },
    {
      icon: Dumbbell,
      title: "تمرینات",
      value: stats.exercises,
      color: "from-sky-500 to-sky-700",
      bgColor: "from-sky-50 to-sky-100 dark:from-sky-950 dark:to-sky-900",
      description: "برنامه‌های ورزشی طراحی‌شده",
      progress: calculateProgress(stats.exercises, maxValues.exercises)
    },
    {
      icon: UtensilsCrossed,
      title: "وعده‌های غذایی",
      value: stats.meals,
      color: "from-slate-500 to-slate-700",
      bgColor: "from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900",
      description: "برنامه‌های تغذیه‌ای تنظیم‌شده",
      progress: calculateProgress(stats.meals, maxValues.meals)
    },
    {
      icon: Pill,
      title: "مکمل‌ها",
      value: stats.supplements,
      color: "from-emerald-600 to-sky-600",
      bgColor: "from-emerald-50 to-sky-50 dark:from-emerald-950 dark:to-sky-950",
      description: "مکمل‌ها و ویتامین‌ها",
      progress: calculateProgress(stats.supplements, maxValues.supplements)
    },
    {
      icon: Database,
      title: "حجم کل داده‌ها",
      value: stats.totalSize,
      color: "from-slate-600 to-emerald-600",
      bgColor: "from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-emerald-950",
      description: "مجموع فضای اشغال‌شده",
      isSize: true,
      progress: 85 // برای حجم داده‌ها از یک مقدار تقریبی استفاده می‌کنیم
    },
    {
      icon: TrendingUp,
      title: "کل رکوردها",
      value: stats.students + stats.exercises + stats.meals + stats.supplements,
      color: "from-sky-600 to-slate-600",
      bgColor: "from-sky-50 to-slate-50 dark:from-sky-950 dark:to-slate-950",
      description: "تعداد کل داده‌های ذخیره‌شده",
      progress: calculateProgress(
        stats.students + stats.exercises + stats.meals + stats.supplements,
        maxValues.totalRecords
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-4">
          آمار کامل داده‌های سیستم
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          نمای جامع از تمامی اطلاعات ذخیره‌شده در سیستم
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative overflow-hidden rounded-3xl p-6 shadow-xl border border-white/20 bg-gradient-to-br ${item.bgColor} group cursor-pointer`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white to-transparent rounded-full" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tl from-white to-transparent rounded-full" />
            </div>

            {/* Icon */}
            <div className="relative mb-6">
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  {item.isSize ? item.value : toPersianNumbers(item.value)}
                </motion.div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Progress Bar - حالا بر اساس داده‌های واقعی */}
              <div className="mt-4 w-full bg-white/30 dark:bg-slate-700/30 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                />
              </div>
              
              {/* نمایش درصد پیشرفت */}
              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-left">
                {toPersianNumbers(Math.round(item.progress))}%
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
