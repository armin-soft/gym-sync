
import React from "react";
import { Card } from "@/components/ui/card";
import { UserRound, Trophy, Scale, Ruler, Wallet, DollarSign, Users, School, Dumbbell, Apple } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";

interface Student {
  id: number;
  name: string;
  phone: string;
  height: string;
  weight: string;
  image: string;
  payment?: string;
  exercises?: number[];
  meals?: number[];
  supplements?: number[];
  vitamins?: number[];
}

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards = ({ students }: StudentStatsCardsProps) => {
  // Calculate average weight
  const totalWeight = students.reduce((acc, student) => acc + Number(student.weight || 0), 0);
  const averageWeight = students.length ? Math.round(totalWeight / students.length) : 0;

  // Calculate average height
  const totalHeight = students.reduce((acc, student) => acc + Number(student.height || 0), 0);
  const averageHeight = students.length ? Math.round(totalHeight / students.length) : 0;

  // Calculate total payments
  const totalPayments = students.reduce((acc, student) => {
    return acc + (student.payment ? Number(student.payment.replace(/,/g, '')) : 0);
  }, 0);

  // Count total exercises
  const totalExercises = students.reduce((acc, student) => {
    const exerciseCount = (student.exercises?.length || 0) + 
                          (student.exercisesDay1?.length || 0) + 
                          (student.exercisesDay2?.length || 0) + 
                          (student.exercisesDay3?.length || 0) + 
                          (student.exercisesDay4?.length || 0);
    return acc + exerciseCount;
  }, 0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const glowingEffect = {
    animate: {
      boxShadow: [
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "0 15px 25px -5px rgba(99, 102, 241, 0.3), 0 10px 10px -5px rgba(99, 102, 241, 0.2)",
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Students Count Card */}
      <motion.div variants={item}>
        <motion.div 
          className="h-full"
          whileHover={{ scale: 1.02, translateY: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 h-full backdrop-blur-xl bg-gradient-to-br from-white/90 to-indigo-50/90 dark:from-slate-900/90 dark:to-indigo-950/60 border-indigo-100/40 dark:border-indigo-900/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"
                variants={glowingEffect}
                animate="animate"
              >
                <Users className="h-7 w-7" />
              </motion.div>
              <div>
                <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">تعداد شاگردان</p>
                <motion.p 
                  className="text-3xl font-bold bg-gradient-to-br from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {toPersianNumbers(students.length)}
                </motion.p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-100/30 dark:border-indigo-800/30">
              <p className="text-xs text-indigo-500/70 dark:text-indigo-400/70">
                تعداد کل شاگردان ثبت شده در سیستم
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Total Income Card */}
      <motion.div variants={item}>
        <motion.div 
          className="h-full"
          whileHover={{ scale: 1.02, translateY: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 h-full backdrop-blur-xl bg-gradient-to-br from-white/90 to-amber-50/90 dark:from-slate-900/90 dark:to-amber-950/60 border-amber-100/40 dark:border-amber-900/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20"
                variants={glowingEffect}
                animate="animate"
              >
                <DollarSign className="h-7 w-7" />
              </motion.div>
              <div>
                <p className="text-sm text-amber-600/70 dark:text-amber-400/70 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">مجموع درآمد</p>
                <div className="flex items-baseline gap-1">
                  <motion.p 
                    className="text-3xl font-bold bg-gradient-to-br from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {toPersianNumbers(formatCurrency(totalPayments))}
                  </motion.p>
                  <span className="text-xs text-amber-500 dark:text-amber-400">تومان</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-100/30 dark:border-amber-800/30">
              <p className="text-xs text-amber-500/70 dark:text-amber-400/70">
                مجموع کل درآمد از شاگردان
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Average Weight Card */}
      <motion.div variants={item}>
        <motion.div 
          className="h-full"
          whileHover={{ scale: 1.02, translateY: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 h-full backdrop-blur-xl bg-gradient-to-br from-white/90 to-purple-50/90 dark:from-slate-900/90 dark:to-purple-950/60 border-purple-100/40 dark:border-purple-900/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20"
                variants={glowingEffect}
                animate="animate"
              >
                <Scale className="h-7 w-7" />
              </motion.div>
              <div>
                <p className="text-sm text-purple-600/70 dark:text-purple-400/70 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">میانگین وزن</p>
                <div className="flex items-baseline gap-1">
                  <motion.p 
                    className="text-3xl font-bold bg-gradient-to-br from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {toPersianNumbers(averageWeight)}
                  </motion.p>
                  <span className="text-xs text-purple-500 dark:text-purple-400">کیلوگرم</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-100/30 dark:border-purple-800/30">
              <p className="text-xs text-purple-500/70 dark:text-purple-400/70">
                میانگین وزن تمامی شاگردان
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Total Exercises Card */}
      <motion.div variants={item}>
        <motion.div 
          className="h-full"
          whileHover={{ scale: 1.02, translateY: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Card className="p-6 h-full backdrop-blur-xl bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-slate-900/90 dark:to-blue-950/60 border-blue-100/40 dark:border-blue-900/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:translate-x-16 group-hover:-translate-y-16 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-700"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
                variants={glowingEffect}
                animate="animate"
              >
                <Dumbbell className="h-7 w-7" />
              </motion.div>
              <div>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">کل تمرین‌ها</p>
                <div className="flex items-baseline gap-1">
                  <motion.p 
                    className="text-3xl font-bold bg-gradient-to-br from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {toPersianNumbers(totalExercises)}
                  </motion.p>
                  <span className="text-xs text-blue-500 dark:text-blue-400">تمرین</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-100/30 dark:border-blue-800/30">
              <p className="text-xs text-blue-500/70 dark:text-blue-400/70">
                مجموع تمرین‌های تعیین شده برای تمام شاگردان
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
