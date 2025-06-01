
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Activity, Clock, User, Utensils, Dumbbell, Pill, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudentHistory, HistoryEntry } from "@/hooks/useStudentHistory";

interface ModernActivityFeedProps {
  stats: DashboardStats;
}

export const ModernActivityFeed = ({ stats }: ModernActivityFeedProps) => {
  const { historyEntries } = useStudentHistory();
  const [recentActivities, setRecentActivities] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // دریافت 4 فعالیت اخیر از تاریخچه
    const sortedActivities = historyEntries
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 4);
    
    setRecentActivities(sortedActivities);
  }, [historyEntries]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'exercise': return Dumbbell;
      case 'diet': return Utensils;
      case 'supplement': return Pill;
      case 'edit': return Edit;
      case 'delete': return Trash2;
      default: return User;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'exercise': return {
        color: "text-orange-600",
        bgColor: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30"
      };
      case 'diet': return {
        color: "text-green-600",
        bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
      };
      case 'supplement': return {
        color: "text-purple-600",
        bgColor: "from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30"
      };
      case 'edit': return {
        color: "text-blue-600",
        bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
      };
      case 'delete': return {
        color: "text-red-600",
        bgColor: "from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30"
      };
      default: return {
        color: "text-gray-600",
        bgColor: "from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30"
      };
    }
  };

  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "همین الان";
    if (minutes < 60) return `${minutes} دقیقه پیش`;
    if (hours < 24) return `${hours} ساعت پیش`;
    return `${days} روز پیش`;
  };

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
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50/30 to-slate-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-slate-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-slate-500/5" />
      <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-gray-400/10 to-slate-500/10 rounded-full blur-2xl" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div 
          className="flex items-center space-x-4 space-x-reverse mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Activity className="w-6 h-6 text-white" />
          </motion.div>
          
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-slate-600 to-gray-700 dark:from-white dark:via-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
              فعالیت‌های اخیر
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              آخرین تغییرات در سیستم
            </p>
          </div>
        </motion.div>

        {/* Activities */}
        {recentActivities.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {recentActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const activityStyle = getActivityColor(activity.type);
              
              return (
                <motion.div
                  key={`${activity.id}-${activity.timestamp}`}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 8, 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${activityStyle.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6 cursor-pointer group`}
                >
                  {/* Hover Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="relative z-10 flex items-start space-x-4 space-x-reverse">
                    {/* Icon */}
                    <motion.div 
                      className={`w-10 h-10 rounded-xl ${activityStyle.color} bg-white dark:bg-gray-800 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-400 group-hover:bg-clip-text transition-all duration-300">
                        {activity.action}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                        شاگرد: {activity.studentName}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                        {activity.description}
                      </p>

                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeTime(activity.timestamp)}</span>
                      </div>
                    </div>

                    {/* Status Dot */}
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            variants={itemVariants}
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center mb-6 mx-auto"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </motion.div>
            
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              هیچ فعالیتی ثبت نشده
            </h4>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              شروع به کار با شاگردان و برنامه‌ها برای مشاهده فعالیت‌ها
            </p>
          </motion.div>
        )}

        {/* View All Button - فقط در صورت وجود فعالیت نمایش داده شود */}
        {recentActivities.length > 0 && (
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <motion.button
              className="bg-gradient-to-r from-gray-500 to-slate-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // ناوبری به صفحه تاریخچه
                window.location.href = '/Management/Students/History';
              }}
            >
              مشاهده تمام فعالیت‌ها
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
