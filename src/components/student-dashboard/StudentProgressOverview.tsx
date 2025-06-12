
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Award, BarChart3 } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgressOverviewProps {
  student: Student;
}

export const StudentProgressOverview: React.FC<StudentProgressOverviewProps> = ({ student }) => {
  const progressData = [
    { label: "قدرت", value: Math.floor(Math.random() * 30 + 70), color: "bg-red-500" },
    { label: "استقامت", value: Math.floor(Math.random() * 25 + 60), color: "bg-blue-500" },
    { label: "انعطاف", value: Math.floor(Math.random() * 20 + 55), color: "bg-green-500" },
    { label: "تعادل", value: Math.floor(Math.random() * 35 + 65), color: "bg-purple-500" }
  ];

  const achievements = [
    { title: "هفته کامل", description: "۷ روز متوالی تمرین", icon: Award, earned: true },
    { title: "قهرمان تغذیه", description: "۳۰ روز رژیم منظم", icon: Target, earned: true },
    { title: "پیشرفت ماهانه", description: "+۲۰% بهبود عملکرد", icon: TrendingUp, earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-700 dark:text-blue-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">پیشرفت عملکرد</h3>
        </div>
        
        <div className="space-y-4">
          {progressData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {toPersianNumbers(item.value)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                  className={`h-full ${item.color} rounded-full shadow-sm`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 rounded-lg">
            <Award className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">دستاوردها</h3>
        </div>
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                achievement.earned 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200/50 dark:border-yellow-800/50'
                  : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 opacity-60'
              }`}
            >
              <div className={`p-3 rounded-xl ${
                achievement.earned 
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                  : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400'
              }`}>
                <achievement.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">{achievement.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
              </div>
              {achievement.earned && (
                <div className="mr-auto">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
