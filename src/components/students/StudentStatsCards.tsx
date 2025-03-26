
import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { UserRound, Trophy, Scale, Ruler, Wallet, DollarSign, Dumbbell } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";

interface StudentStatsCardsProps {
  students: Student[];
}

export const StudentStatsCards = ({ students }: StudentStatsCardsProps) => {
  // محاسبه میانگین وزن
  const averageWeight = useMemo(() => Math.round(
    students.reduce((acc, student) => acc + Number(student.weight || 0), 0) /
    (students.length || 1)
  ), [students]);

  // محاسبه میانگین قد
  const averageHeight = useMemo(() => Math.round(
    students.reduce((acc, student) => acc + Number(student.height || 0), 0) /
    (students.length || 1)
  ), [students]);

  // محاسبه تعداد کل تمرین‌های اختصاص داده شده به شاگردان
  const totalExercises = useMemo(() => {
    let count = 0;
    students.forEach(student => {
      // شمارش تمرین‌های عمومی
      count += student.exercises?.length || 0;
      
      // شمارش تمرین‌های روزهای مختلف
      count += student.exercisesDay1?.length || 0;
      count += student.exercisesDay2?.length || 0;
      count += student.exercisesDay3?.length || 0;
      count += student.exercisesDay4?.length || 0;
    });
    return count;
  }, [students]);

  // محاسبه مجموع درآمد
  const totalPayments = useMemo(() => students.reduce((acc, student) => {
    return acc + (student.payment ? Number(student.payment.replace(/,/g, '')) : 0);
  }, 0), [students]);

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

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-indigo-50/80 dark:from-slate-900/80 dark:to-indigo-950/50 border-indigo-100/30 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">تعداد شاگردان</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-indigo-700 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">
                {toPersianNumbers(students.length)}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-indigo-100/30 dark:border-indigo-800/30">
            <p className="text-xs text-indigo-500/70 dark:text-indigo-400/70">
              تعداد کل شاگردان ثبت شده در سیستم
            </p>
          </div>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-amber-50/80 dark:from-slate-900/80 dark:to-amber-950/50 border-amber-100/30 dark:border-amber-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-105">
              <DollarSign className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-amber-600/70 dark:text-amber-400/70 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">مجموع درآمد</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold bg-gradient-to-br from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
                  {toPersianNumbers(formatCurrency(totalPayments))}
                </p>
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
      
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-slate-900/80 dark:to-purple-950/50 border-purple-100/30 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
              <Scale className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-purple-600/70 dark:text-purple-400/70 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">میانگین وزن</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold bg-gradient-to-br from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
                  {toPersianNumbers(averageWeight)}
                </p>
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
      
      <motion.div variants={item}>
        <Card className="p-6 backdrop-blur-xl bg-gradient-to-br from-white/80 to-green-50/80 dark:from-slate-900/80 dark:to-green-950/50 border-green-100/30 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:shadow-green-500/30 transition-all duration-300 group-hover:scale-105">
              <Dumbbell className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-green-600/70 dark:text-green-400/70 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">تمرین‌های تخصیصی</p>
              <p className="text-3xl font-bold bg-gradient-to-br from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent">
                {toPersianNumbers(totalExercises)}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-100/30 dark:border-green-800/30">
            <p className="text-xs text-green-500/70 dark:text-green-400/70">
              تعداد کل تمرین‌های تخصیص داده شده
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
