
import React from "react";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill, 
  TrendingUp,
  Award
} from "lucide-react";

interface StudentModernStatsProps {
  students: Student[];
}

const StudentModernStats = ({ students }: StudentModernStatsProps) => {
  // Calculate stats
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status !== "inactive").length;
  const totalExercises = students.reduce((sum, student) => {
    return sum + (student.exercises?.length || 0);
  }, 0);
  const totalMeals = students.reduce((sum, student) => {
    return sum + (student.meals?.length || 0);
  }, 0);
  const totalSupplements = students.reduce((sum, student) => {
    return sum + (student.supplements?.length || 0);
  }, 0);
  const avgProgress = students.length > 0 
    ? Math.round(students.reduce((sum, student) => sum + (student.progress || 0), 0) / students.length)
    : 0;

  // Stats items
  const statsItems = [
    { 
      title: "شاگردان", 
      value: totalStudents, 
      subValue: `${toPersianNumbers(activeStudents)} فعال`, 
      icon: Users, 
      color: "from-blue-600 to-blue-400",
      bg: "from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40"
    },
    { 
      title: "برنامه‌های تمرینی", 
      value: totalExercises, 
      icon: Dumbbell, 
      color: "from-amber-600 to-amber-400",
      bg: "from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40"
    },
    { 
      title: "برنامه‌های غذایی", 
      value: totalMeals, 
      icon: UtensilsCrossed, 
      color: "from-green-600 to-green-400",
      bg: "from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40"
    },
    { 
      title: "مکمل‌ها", 
      value: totalSupplements, 
      icon: Pill, 
      color: "from-violet-600 to-violet-400",
      bg: "from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40"
    },
    { 
      title: "میانگین پیشرفت", 
      value: `${avgProgress}٪`, 
      icon: TrendingUp, 
      color: "from-cyan-600 to-cyan-400",
      bg: "from-cyan-50 to-teal-50 dark:from-cyan-950/40 dark:to-teal-950/40"
    },
    { 
      title: "شاگردان ممتاز", 
      value: students.filter(s => (s.progress || 0) > 80).length, 
      icon: Award, 
      color: "from-rose-600 to-rose-400",
      bg: "from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40"
    },
  ];

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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
    >
      {statsItems.map((item, index) => (
        <motion.div
          key={item.title}
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className={`p-4 rounded-xl bg-gradient-to-br ${item.bg} border border-gray-200/60 dark:border-gray-800/60 shadow-sm relative overflow-hidden group`}
        >
          {/* Background shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-sm`}>
              <item.icon className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.title}</span>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof item.value === 'number' ? toPersianNumbers(item.value) : item.value}
            </p>
            {item.subValue && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.subValue}</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StudentModernStats;
