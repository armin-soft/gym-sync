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
  // محاسبه میانگین وزن با استفاده از داده‌های دقیق
  const averageWeight = useMemo(() => {
    // فقط دانش‌آموزانی که وزن آنها ثبت شده است را در نظر بگیریم
    const studentsWithWeight = students.filter(student => student.weight && student.weight !== '');
    if (studentsWithWeight.length === 0) return 0;
    
    const sum = studentsWithWeight.reduce((acc, student) => acc + Number(student.weight), 0);
    return Math.round(sum / studentsWithWeight.length);
  }, [students]);

  // محاسبه میانگین قد با استفاده از داده‌های دقیق
  const averageHeight = useMemo(() => {
    // فقط دانش‌آموزانی که قد آنها ثبت شده است را در نظر بگیریم
    const studentsWithHeight = students.filter(student => student.height && student.height !== '');
    if (studentsWithHeight.length === 0) return 0;
    
    const sum = studentsWithHeight.reduce((acc, student) => acc + Number(student.height), 0);
    return Math.round(sum / studentsWithHeight.length);
  }, [students]);

  // محاسبه تعداد دقیق تمرین‌های انتخاب شده برای تمام شاگردان
  const totalExercises = useMemo(() => {
    let totalCount = 0;
    
    students.forEach(student => {
      // بررسی و اضافه کردن تمرین‌ها فقط در صورت وجود آرایه مربوطه
      if (Array.isArray(student.exercises)) {
        totalCount += student.exercises.length;
      }
      if (Array.isArray(student.exercisesDay1)) {
        totalCount += student.exercisesDay1.length;
      }
      if (Array.isArray(student.exercisesDay2)) {
        totalCount += student.exercisesDay2.length;
      }
      if (Array.isArray(student.exercisesDay3)) {
        totalCount += student.exercisesDay3.length;
      }
      if (Array.isArray(student.exercisesDay4)) {
        totalCount += student.exercisesDay4.length;
      }
    });
    
    // Subtract 3 from the total exercise count as requested
    return Math.max(0, totalCount - 3);
  }, [students]);

  // محاسبه مجموع درآمد با استفاده از داده‌های دقیق
  const totalPayments = useMemo(() => {
    return students.reduce((acc, student) => {
      // اگر پرداخت خالی یا نامعتبر باشد، صفر اضافه می‌کنیم
      if (!student.payment) return acc;
      
      // حذف کاراکترهای غیر عدد مانند کاما
      const numericValue = student.payment.replace(/[^\d]/g, '');
      
      // اگر مقدار عددی معتبر باشد آن را به مجموع اضافه می‌کنیم
      return acc + (numericValue ? parseInt(numericValue) : 0);
    }, 0);
  }, [students]);

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
              مجموع کل تمرین‌های انتخاب شده برای تمام شاگردان
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
