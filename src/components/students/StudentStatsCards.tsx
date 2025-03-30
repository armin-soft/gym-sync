
import React from "react";
import { motion } from "framer-motion";
import { Student } from "./StudentTypes";
import { Users, UserCheck, UserClock, Award } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

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

  const stats = [
    {
      id: "total",
      title: "کل شاگردان",
      value: totalStudents,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
      shadowColor: "shadow-blue-500/25",
      bgLight: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      id: "active",
      title: "شاگردان در حال کار",
      value: activeStudents,
      icon: UserClock,
      color: "from-amber-500 to-orange-500",
      shadowColor: "shadow-amber-500/25",
      bgLight: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      id: "completed",
      title: "برنامه‌های تکمیل شده",
      value: completedStudents,
      icon: UserCheck,
      color: "from-emerald-500 to-green-500",
      shadowColor: "shadow-emerald-500/25",
      bgLight: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      id: "new",
      title: "شاگردان جدید",
      value: newStudents,
      icon: Award,
      color: "from-purple-500 to-fuchsia-500",
      shadowColor: "shadow-purple-500/25",
      bgLight: "bg-purple-50",
      iconColor: "text-purple-500",
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
          whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-70 blur-xl rounded-3xl -z-10 group-hover:opacity-100 transition-opacity duration-300 scale-[0.85] group-hover:scale-90 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />
          
          <div className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 h-full shadow-lg shadow-gray-100/50 dark:shadow-gray-950/30 group-hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bgLight} dark:bg-opacity-20 flex items-center justify-center ${stat.iconColor}`}>
                <stat.icon size={24} />
              </div>
              
              <div className="w-16 h-16 overflow-hidden">
                <div className={`w-full h-full rounded-br-[40px] bg-gradient-to-br ${stat.color} opacity-10`} />
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {stat.title}
            </p>
            
            <div className="mt-2 flex items-end justify-between">
              <h3 className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {toPersianNumbers(stat.value)}
              </h3>
              
              <div className="flex-grow ml-2">
                <div className={`h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-50`}></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
