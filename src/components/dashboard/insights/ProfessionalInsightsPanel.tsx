
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Brain, TrendingUp, Target, Award, AlertCircle, CheckCircle, Users, UtensilsCrossed, Pill } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfessionalInsightsPanelProps {
  stats: DashboardStats;
}

interface InsightData {
  totalStudents: number;
  totalMeals: number;
  totalSupplements: number;
  studentsProgress: number;
  mealCompletionRate: number;
  supplementCompletionRate: number;
  capacityUtilization: number;
}

export const ProfessionalInsightsPanel = ({ stats }: ProfessionalInsightsPanelProps) => {
  const [insightData, setInsightData] = useState<InsightData>({
    totalStudents: 0,
    totalMeals: 0,
    totalSupplements: 0,
    studentsProgress: 0,
    mealCompletionRate: 0,
    supplementCompletionRate: 0,
    capacityUtilization: 0
  });

  useEffect(() => {
    // محاسبه درصد ظرفیت استفاده شده
    const capacityUtilization = stats.maxCapacity > 0 
      ? Math.round((stats.totalStudents / stats.maxCapacity) * 100) 
      : 0;

    setInsightData({
      totalStudents: stats.totalStudents,
      totalMeals: stats.totalMeals,
      totalSupplements: stats.totalSupplements,
      studentsProgress: stats.studentsProgress,
      mealCompletionRate: stats.mealCompletionRate,
      supplementCompletionRate: stats.supplementCompletionRate,
      capacityUtilization
    });
  }, [stats]);

  // تنها در صورت وجود داده نمایش داده شود
  if (insightData.totalStudents === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="relative z-10 p-8">
          <div className="flex items-center space-x-4 space-x-reverse mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                تحلیل هوشمند
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                بینش‌های حرفه‌ای از عملکرد باشگاه
              </p>
            </div>
          </div>

          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center mb-6 mx-auto">
              <Brain className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              هنوز داده‌ای موجود نیست
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              برای مشاهده تحلیل‌ها، ابتدا شاگردان و برنامه‌ها را اضافه کنید
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const insights = [
    {
      type: "students",
      icon: Users,
      title: "تعداد شاگردان",
      description: `${insightData.totalStudents} شاگرد فعال در سیستم`,
      value: insightData.totalStudents,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
      status: insightData.totalStudents > 0 ? "success" : "warning"
    },
    {
      type: "capacity",
      icon: AlertCircle,
      title: "ظرفیت باشگاه",
      description: `${insightData.capacityUtilization}% از ظرفیت استفاده شده`,
      value: insightData.capacityUtilization,
      color: insightData.capacityUtilization > 80 ? "text-red-600" : insightData.capacityUtilization > 60 ? "text-amber-600" : "text-green-600",
      bgColor: insightData.capacityUtilization > 80 
        ? "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30"
        : insightData.capacityUtilization > 60 
        ? "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30"
        : "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
      status: insightData.capacityUtilization > 80 ? "warning" : "success"
    },
    {
      type: "meals",
      icon: UtensilsCrossed,
      title: "برنامه‌های غذایی",
      description: `${insightData.mealCompletionRate}% نرخ تکمیل رژیم غذایی`,
      value: insightData.mealCompletionRate,
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
      status: insightData.mealCompletionRate > 70 ? "success" : "warning"
    },
    {
      type: "supplements",
      icon: Pill,
      title: "مکمل‌ها",
      description: `${insightData.supplementCompletionRate}% استفاده از مکمل‌ها`,
      value: insightData.supplementCompletionRate,
      color: "text-purple-600",
      bgColor: "from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30",
      status: insightData.supplementCompletionRate > 70 ? "success" : "warning"
    }
  ];

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
      <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div 
          className="flex items-center space-x-4 space-x-reverse mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              تحلیل هوشمند
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              بینش‌های حرفه‌ای از عملکرد باشگاه
            </p>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div className="space-y-4" variants={containerVariants}>
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            
            return (
              <motion.div
                key={insight.type}
                variants={itemVariants}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${insight.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6 cursor-pointer group`}
              >
                <div className="relative z-10 flex items-start space-x-4 space-x-reverse">
                  <motion.div 
                    className={`w-10 h-10 rounded-xl ${insight.color} bg-white dark:bg-gray-800 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  <motion.div 
                    className={insight.status === 'success' ? 'text-green-500' : 'text-amber-500'}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {insight.status === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(insight.value, 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Card */}
        <motion.div 
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold mb-2">خلاصه عملکرد</h4>
              <p className="text-indigo-100">
                {insightData.studentsProgress > 70 
                  ? "باشگاه شما در مسیر رشد مطلوبی قرار دارد"
                  : insightData.studentsProgress > 50
                  ? "عملکرد متوسط، نیاز به بهبود دارد"
                  : "نیاز به توجه بیشتر و بهبود عملکرد"
                }
              </p>
            </div>
            
            <motion.div 
              className="text-6xl font-bold opacity-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {insightData.studentsProgress}%
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
