
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Student } from '@/components/students/StudentTypes';
import { UserRound, Dumbbell, Apple, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, className = '', valueClassName = '' }) => (
  <Card className={`p-4 backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    <div className="flex items-center">
      <div className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className={`text-2xl font-semibold ${valueClassName}`}>{value}</p>
      </div>
    </div>
  </Card>
);

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards: React.FC<StudentStatsCardsProps> = ({ students }) => {
  const stats = useMemo(() => {
    const totalStudents = students.length;
    
    const withExercises = students.filter(s => 
      (s.exercises?.length > 0) || 
      (s.exercisesDay1?.length > 0) || 
      (s.exercisesDay2?.length > 0) || 
      (s.exercisesDay3?.length > 0) || 
      (s.exercisesDay4?.length > 0)
    ).length;
    
    const withDiet = students.filter(s => s.meals?.length > 0).length;
    
    const withSupplements = students.filter(s => 
      (s.supplements?.length > 0) || 
      (s.vitamins?.length > 0)
    ).length;
    
    return { totalStudents, withExercises, withDiet, withSupplements };
  }, [students]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <motion.div variants={itemVariants}>
        <StatCard
          title="تعداد شاگردان"
          value={stats.totalStudents}
          icon={<UserRound className="h-5 w-5 text-blue-500" />}
          valueClassName="text-blue-500"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="برنامه تمرینی"
          value={stats.withExercises}
          icon={<Dumbbell className="h-5 w-5 text-indigo-500" />}
          valueClassName="text-indigo-500"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="برنامه غذایی"
          value={stats.withDiet}
          icon={<Apple className="h-5 w-5 text-green-500" />}
          valueClassName="text-green-500"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="مکمل و ویتامین"
          value={stats.withSupplements}
          icon={<Pill className="h-5 w-5 text-amber-500" />}
          valueClassName="text-amber-500"
        />
      </motion.div>
    </motion.div>
  );
};
