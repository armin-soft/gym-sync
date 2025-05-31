
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Activity, Clock, User, Utensils, Dumbbell, Pill } from "lucide-react";

interface ModernActivityFeedProps {
  stats: DashboardStats;
}

export const ModernActivityFeed = ({ stats }: ModernActivityFeedProps) => {
  const activities = [
    {
      type: "student",
      icon: User,
      title: "شاگرد جدید اضافه شد",
      description: "احمد رضایی به سیستم اضافه شد",
      time: "5 دقیقه پیش",
      color: "text-blue-600",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
    },
    {
      type: "meal",
      icon: Utensils,
      title: "برنامه غذایی به‌روزرسانی شد",
      description: "برنامه غذایی سارا احمدی تغییر کرد",
      time: "15 دقیقه پیش",
      color: "text-green-600",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
    },
    {
      type: "exercise",
      icon: Dumbbell,
      title: "برنامه تمرینی جدید",
      description: "تمرینات امروز علی موسوی تنظیم شد",
      time: "30 دقیقه پیش",
      color: "text-orange-600",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30"
    },
    {
      type: "supplement",
      icon: Pill,
      title: "مکمل جدید اضافه شد",
      description: "ویتامین D به لیست مکمل‌ها افزوده شد",
      time: "1 ساعت پیش",
      color: "text-purple-600",
      bgColor: "from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30"
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
        <motion.div className="space-y-4" variants={containerVariants}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <motion.div
                key={activity.title}
                variants={itemVariants}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${activity.bgColor} border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm p-6 cursor-pointer group`}
              >
                {/* Hover Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                <div className="relative z-10 flex items-start space-x-4 space-x-reverse">
                  {/* Icon */}
                  <motion.div 
                    className={`w-10 h-10 rounded-xl ${activity.color} bg-white dark:bg-gray-800 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-400 group-hover:bg-clip-text transition-all duration-300">
                      {activity.title}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
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

        {/* View All Button */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="bg-gradient-to-r from-gray-500 to-slate-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            مشاهده تمام فعالیت‌ها
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
