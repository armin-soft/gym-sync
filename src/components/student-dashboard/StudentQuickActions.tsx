
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Apple, Pill, Calendar, BarChart3, Target, MessageCircle, Settings } from "lucide-react";

export const StudentQuickActions: React.FC = () => {
  const actions = [
    { title: "شروع تمرین", icon: Dumbbell, color: "from-orange-500 to-red-500", bgColor: "from-orange-50 to-red-50" },
    { title: "رژیم غذایی", icon: Apple, color: "from-green-500 to-emerald-500", bgColor: "from-green-50 to-emerald-50" },
    { title: "مکمل‌ها", icon: Pill, color: "from-purple-500 to-violet-500", bgColor: "from-purple-50 to-violet-50" },
    { title: "تقویم", icon: Calendar, color: "from-blue-500 to-indigo-500", bgColor: "from-blue-50 to-indigo-50" },
    { title: "پیشرفت", icon: BarChart3, color: "from-cyan-500 to-blue-500", bgColor: "from-cyan-50 to-blue-50" },
    { title: "اهداف", icon: Target, color: "from-pink-500 to-rose-500", bgColor: "from-pink-50 to-rose-50" },
    { title: "پشتیبانی", icon: MessageCircle, color: "from-teal-500 to-green-500", bgColor: "from-teal-50 to-green-50" },
    { title: "تنظیمات", icon: Settings, color: "from-slate-500 to-gray-500", bgColor: "from-slate-50 to-gray-50" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
    >
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">دسترسی سریع</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative overflow-hidden bg-gradient-to-br ${action.bgColor} dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-white/20 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={`p-3 bg-gradient-to-br ${action.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300 text-sm text-center">
                {action.title}
              </span>
            </div>
            
            {/* Hover effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
