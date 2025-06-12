
import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Apple, Pill, Trophy, Target, Calendar, TrendingUp, Clock } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentStatsGridProps {
  student: Student;
}

export const StudentStatsGrid: React.FC<StudentStatsGridProps> = ({ student }) => {
  const totalExercises = (student.exercisesDay1?.length || 0) + 
                        (student.exercisesDay2?.length || 0) + 
                        (student.exercisesDay3?.length || 0) + 
                        (student.exercisesDay4?.length || 0) + 
                        (student.exercisesDay5?.length || 0);
  
  const totalMeals = student.meals?.length || 0;
  const totalSupplements = (student.supplements?.length || 0) + (student.vitamins?.length || 0);

  const stats = [
    {
      title: "تمرینات هفته",
      value: toPersianNumbers(totalExercises),
      icon: Dumbbell,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      change: `+${toPersianNumbers(5)}`,
      description: "تمرین تعریف شده"
    },
    {
      title: "وعده‌های غذایی",
      value: toPersianNumbers(totalMeals),
      icon: Apple,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      change: `+${toPersianNumbers(2)}`,
      description: "وعده روزانه"
    },
    {
      title: "مکمل‌ها",
      value: toPersianNumbers(totalSupplements),
      icon: Pill,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      change: `+${toPersianNumbers(1)}`,
      description: "مکمل و ویتامین"
    },
    {
      title: "روزهای فعال",
      value: toPersianNumbers(Math.floor(Math.random() * 20 + 15)),
      icon: Calendar,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      change: `+${toPersianNumbers(3)}`,
      description: "در این ماه"
    },
    {
      title: "دستاوردها",
      value: toPersianNumbers(Math.floor(Math.random() * 8 + 4)),
      icon: Trophy,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      change: `+${toPersianNumbers(2)}`,
      description: "نشان کسب شده"
    },
    {
      title: "اهداف تکمیل",
      value: toPersianNumbers(Math.floor(Math.random() * 6 + 2)),
      icon: Target,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      change: `+${toPersianNumbers(1)}`,
      description: "هدف محقق شده"
    },
    {
      title: "پیشرفت کلی",
      value: `${toPersianNumbers(Math.floor(Math.random() * 25 + 70))}%`,
      icon: TrendingUp,
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      change: `+${toPersianNumbers(12)}%`,
      description: "نسبت به ماه قبل"
    },
    {
      title: "زمان فعالیت",
      value: `${toPersianNumbers(Math.floor(Math.random() * 10 + 15))}ساعت`,
      icon: Clock,
      gradient: "from-teal-500 to-green-500",
      bgGradient: "from-teal-50 to-green-50",
      change: `+${toPersianNumbers(3)}ساعت`,
      description: "در این هفته"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} dark:from-slate-800 dark:to-slate-900 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {stat.value}
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  {stat.change}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                {stat.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stat.description}
              </p>
            </div>
          </div>
          
          {/* Decorative gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
        </motion.div>
      ))}
    </div>
  );
};
