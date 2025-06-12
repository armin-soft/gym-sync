
import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, Flame } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentActivityCardsProps {
  student: Student;
}

export const StudentActivityCards: React.FC<StudentActivityCardsProps> = ({ student }) => {
  const weekDays = [
    { day: "شنبه", exercises: student.exercisesDay1?.length || 0, completed: Math.random() > 0.5 },
    { day: "یکشنبه", exercises: student.exercisesDay2?.length || 0, completed: Math.random() > 0.5 },
    { day: "دوشنبه", exercises: student.exercisesDay3?.length || 0, completed: Math.random() > 0.5 },
    { day: "سه‌شنبه", exercises: student.exercisesDay4?.length || 0, completed: Math.random() > 0.5 },
    { day: "چهارشنبه", exercises: student.exercisesDay5?.length || 0, completed: Math.random() > 0.5 },
    { day: "پنج‌شنبه", exercises: 0, completed: false },
    { day: "جمعه", exercises: 0, completed: false }
  ];

  const recentActivities = [
    { title: "تمرین سینه و سه‌سر", time: "۲ ساعت پیش", type: "exercise", completed: true },
    { title: "مصرف پروتئین", time: "۴ ساعت پیش", type: "supplement", completed: true },
    { title: "وعده ناهار", time: "۶ ساعت پیش", type: "meal", completed: true },
    { title: "تمرین پشت و دوسر", time: "دیروز", type: "exercise", completed: true },
    { title: "اندازه‌گیری وزن", time: "۲ روز پیش", type: "measurement", completed: true }
  ];

  return (
    <div className="space-y-6">
      {/* Weekly Schedule */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/50 dark:to-indigo-900/50 rounded-lg">
            <Calendar className="h-6 w-6 text-violet-700 dark:text-violet-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">برنامه هفتگی</h3>
        </div>
        
        <div className="space-y-3">
          {weekDays.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                item.completed 
                  ? 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200/50 dark:border-emerald-800/50' 
                  : item.exercises > 0 
                    ? 'bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-200/50 dark:border-violet-800/50'
                    : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.completed ? 'bg-emerald-500' : item.exercises > 0 ? 'bg-violet-500' : 'bg-slate-400'
                }`}></div>
                <span className="font-medium text-slate-700 dark:text-slate-300">{item.day}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {toPersianNumbers(item.exercises)} تمرین
                </span>
                {item.completed && <CheckCircle className="h-4 w-4 text-emerald-500" />}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 dark:border-violet-800/50 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/50 dark:to-red-900/50 rounded-lg">
            <Flame className="h-6 w-6 text-orange-700 dark:text-orange-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">فعالیت‌های اخیر</h3>
        </div>
        
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 dark:hover:bg-slate-700/30 transition-colors"
            >
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 dark:text-slate-200">{activity.title}</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
