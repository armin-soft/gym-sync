
import React from "react";
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { StatsGridNew } from "./stats/StatsGrid-New";
import { QuickActionsNew } from "./quick-access/QuickActions-New";
import { StudentsOverviewNew } from "./students/StudentsOverview-New";
import { ModernActiveStudents } from "./active-students/ModernActiveStudents";

interface DashboardContentNewProps {
  stats: DashboardStats;
  currentTime: Date;
  students: Student[];
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const DashboardContentNew: React.FC<DashboardContentNewProps> = ({
  stats,
  currentTime,
  students,
  trainerProfile,
}) => {
  // محاسبه آمار شاگردان فعال
  const activeStudentsCount = students.filter(student => {
    const hasExercises = student.exercises && Object.keys(student.exercises).length > 0;
    const hasDiet = student.meals && student.meals.length > 0;
    const hasSupplements = student.supplements && student.supplements.length > 0;
    return hasExercises || hasDiet || hasSupplements;
  }).length;

  const withExercisePrograms = students.filter(student => 
    student.exercises && Object.keys(student.exercises).length > 0
  ).length;

  const withNutritionPrograms = students.filter(student => 
    student.meals && student.meals.length > 0
  ).length;

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-full space-y-8 p-6"
      dir="rtl"
    >
      {/* آمار کلی */}
      <motion.div variants={itemVariants}>
        <StatsGridNew stats={stats} />
      </motion.div>

      {/* بخش مدیریت حرفه‌ای - جایگزین شده */}
      <motion.div variants={itemVariants}>
        <ModernActiveStudents
          activeStudentsCount={activeStudentsCount}
          totalStudents={students.length}
          withExercisePrograms={withExercisePrograms}
          withNutritionPrograms={withNutritionPrograms}
        />
      </motion.div>

      {/* دسترسی سریع */}
      <motion.div variants={itemVariants}>
        <QuickActionsNew />
      </motion.div>

      {/* نمای کلی شاگردان */}
      <motion.div variants={itemVariants}>
        <StudentsOverviewNew students={students} />
      </motion.div>
    </motion.div>
  );
};
