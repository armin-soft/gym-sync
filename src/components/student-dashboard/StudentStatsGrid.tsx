
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Activity, Dumbbell, Salad, Pills } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentStatsGridProps {
  student: Student;
}

export const StudentStatsGrid: React.FC<StudentStatsGridProps> = ({ student }) => {
  const stats = [
    {
      title: "تعداد تمرینات",
      value: student.exercises?.length || 0,
      icon: Dumbbell,
      color: "bg-emerald-50 dark:bg-emerald-950/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      textColor: "text-emerald-700 dark:text-emerald-300",
    },
    {
      title: "برنامه‌های غذایی",
      value: student.meals?.length || 0,
      icon: Salad,
      color: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    {
      title: "مکمل‌های ورزشی",
      value: student.supplements?.length || 0,
      icon: Pills,
      color: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      textColor: "text-purple-700 dark:text-purple-300",
    },
    {
      title: "وضعیت پیشرفت",
      value: "75%",
      icon: Activity,
      color: "bg-amber-50 dark:bg-amber-950/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      textColor: "text-amber-700 dark:text-amber-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`${stat.color} rounded-2xl p-4 shadow-sm flex items-center gap-4 border border-white/10 dark:border-white/5`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconColor} bg-white/80 dark:bg-gray-800/80 shadow-sm`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
            <h3 className={`text-xl font-bold ${stat.textColor}`}>
              {typeof stat.value === 'number' ? toPersianNumbers(stat.value.toString()) : stat.value}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
