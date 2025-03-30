
import React from "react";
import { motion } from "framer-motion";
import { Student } from "./StudentTypes";
import { Users, Clock, UserCheck, Award } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Progress } from "@/components/ui/progress";

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards: React.FC<StudentStatsCardsProps> = ({ students }) => {
  // Calculate stats
  const totalStudents = students.length;
  
  const activeStudents = students.filter(student => {
    // Check if the student has any exercises, meals, or supplements
    const hasExercises = student.exercises?.length || student.exercisesDay1?.length || 
                          student.exercisesDay2?.length || student.exercisesDay3?.length || 
                          student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    return hasExercises || hasMeals || hasSupplements;
  }).length;
  
  const completedStudents = students.filter(student => {
    // Check if the student has exercises, meals, AND supplements
    const hasExercises = student.exercises?.length || student.exercisesDay1?.length || 
                          student.exercisesDay2?.length || student.exercisesDay3?.length || 
                          student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    return hasExercises && hasMeals && hasSupplements;
  }).length;
  
  const newStudents = students.filter(student => {
    const hasExercises = student.exercises?.length || student.exercisesDay1?.length || 
                          student.exercisesDay2?.length || student.exercisesDay3?.length || 
                          student.exercisesDay4?.length;
    const hasMeals = student.meals?.length;
    const hasSupplements = student.supplements?.length || student.vitamins?.length;
    
    return !hasExercises && !hasMeals && !hasSupplements;
  }).length;

  // Calculate percentages for progress bars
  const totalPercentage = students.length > 0 ? 100 : 0;
  const activePercentage = students.length > 0 ? (activeStudents / totalStudents) * 100 : 0;
  const completedPercentage = students.length > 0 ? (completedStudents / totalStudents) * 100 : 0;
  const newPercentage = students.length > 0 ? (newStudents / totalStudents) * 100 : 0;

  const stats = [
    {
      id: "total",
      title: "کل شاگردان",
      value: totalStudents,
      percentage: totalPercentage,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      shadowColor: "shadow-blue-500/25",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-500 dark:text-blue-400",
      progressColor: "bg-blue-500",
    },
    {
      id: "active",
      title: "شاگردان در حال کار",
      value: activeStudents,
      percentage: activePercentage,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      shadowColor: "shadow-amber-500/25",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      iconColor: "text-amber-500 dark:text-amber-400",
      progressColor: "bg-amber-500",
    },
    {
      id: "completed",
      title: "برنامه‌های تکمیل شده",
      value: completedStudents,
      percentage: completedPercentage,
      icon: UserCheck,
      color: "from-emerald-500 to-green-500",
      shadowColor: "shadow-emerald-500/25",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      progressColor: "bg-emerald-500",
    },
    {
      id: "new",
      title: "شاگردان جدید",
      value: newStudents,
      percentage: newPercentage,
      icon: Award,
      color: "from-purple-500 to-fuchsia-500",
      shadowColor: "shadow-purple-500/25",
      bgLight: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-500 dark:text-purple-400",
      progressColor: "bg-purple-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            transition: { type: "spring", stiffness: 300 } 
          }}
          className="relative group"
        >
          {/* Background blur effect */}
          <div className="absolute -inset-1 bg-gradient-to-br opacity-70 blur-xl rounded-3xl -z-10 group-hover:opacity-100 transition-opacity duration-300 scale-[0.85] group-hover:scale-90 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
          
          {/* Card content */}
          <div className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 h-full shadow-lg shadow-gray-100/50 dark:shadow-gray-950/30 group-hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bgLight} flex items-center justify-center ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
              
              <div className="w-16 h-16 overflow-hidden">
                <div className={`w-full h-full rounded-br-[40px] bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">
              {stat.title}
            </p>
            
            <div className="mt-2 flex items-end justify-between mb-3">
              <h3 className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 origin-left`}>
                {toPersianNumbers(stat.value)}
              </h3>
              
              <div className="h-8 w-8 flex items-center justify-center bg-gray-100/80 dark:bg-slate-800/80 rounded-md">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {stat.percentage === 100 ? "١٠٠٪" : toPersianNumbers(Math.round(stat.percentage)) + "٪"}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <Progress 
              value={stat.percentage} 
              className="h-1.5 bg-gray-100 dark:bg-gray-800"
              indicatorClassName={`${stat.progressColor}`}
            />
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-20">
              <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${stat.color} rotate-45 transform -translate-x-20 -translate-y-20`} />
            </div>
            
            <div className="absolute bottom-2 left-2 w-10 h-10 overflow-hidden opacity-10">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} rotate-45 transform -translate-x-10 -translate-y-10`} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
