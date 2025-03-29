
import React, { useMemo } from "react";
import { UserRound, Trophy, Scale, Ruler, DollarSign, Dumbbell } from "lucide-react";
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

  // محاسبه دقیق تعداد تمرین‌های انتخاب شده برای تمام شاگردان
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
    
    return totalCount;
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {/* تعداد شاگردان */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="group"
      >
        <div className="h-full rounded-3xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/20 p-6 border border-violet-200/50 dark:border-violet-800/30 hover:shadow-lg hover:shadow-violet-200/20 dark:hover:shadow-violet-800/10 transition-all duration-300 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-violet-300/5 dark:from-violet-600/10 dark:to-violet-500/5 blur-2xl rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/30 transition-all duration-300 group-hover:scale-105">
              <UserRound className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <span className="text-5xl font-bold text-violet-950 dark:text-violet-100">
              {toPersianNumbers(students.length)}
            </span>
          </div>
          <div className="flex flex-col mt-auto">
            <h3 className="text-lg font-semibold text-violet-700 dark:text-violet-300 mb-1">تعداد شاگردان</h3>
            <p className="text-sm text-violet-600/70 dark:text-violet-400/70">
              تعداد کل شاگردان ثبت شده در سیستم
            </p>
          </div>
        </div>
      </motion.div>

      {/* مجموع درآمد */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="group"
      >
        <div className="h-full rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-900/20 p-6 border border-emerald-200/50 dark:border-emerald-800/30 hover:shadow-lg hover:shadow-emerald-200/20 dark:hover:shadow-emerald-800/10 transition-all duration-300 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-emerald-300/5 dark:from-emerald-600/10 dark:to-emerald-500/5 blur-2xl rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
              <DollarSign className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold text-emerald-950 dark:text-emerald-100">
                {toPersianNumbers(formatCurrency(totalPayments))}
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">تومان</span>
            </div>
          </div>
          <div className="flex flex-col mt-auto">
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-1">مجموع درآمد</h3>
            <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70">
              مجموع کل درآمد از شاگردان
            </p>
          </div>
        </div>
      </motion.div>

      {/* میانگین وزن */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="group"
      >
        <div className="h-full rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/20 p-6 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg hover:shadow-blue-200/20 dark:hover:shadow-blue-800/10 transition-all duration-300 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-300/5 dark:from-blue-600/10 dark:to-blue-500/5 blur-2xl rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-105">
              <Scale className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold text-blue-950 dark:text-blue-100">
                {toPersianNumbers(averageWeight)}
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-400 mt-1">کیلوگرم</span>
            </div>
          </div>
          <div className="flex flex-col mt-auto">
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-1">میانگین وزن</h3>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70">
              میانگین وزن تمامی شاگردان
            </p>
          </div>
        </div>
      </motion.div>

      {/* تمرین‌های تخصیصی */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="group"
      >
        <div className="h-full rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-900/20 p-6 border border-amber-200/50 dark:border-amber-800/30 hover:shadow-lg hover:shadow-amber-200/20 dark:hover:shadow-amber-800/10 transition-all duration-300 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-300/5 dark:from-amber-600/10 dark:to-amber-500/5 blur-2xl rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 transition-all duration-300 group-hover:scale-105">
              <Dumbbell className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <span className="text-5xl font-bold text-amber-950 dark:text-amber-100">
              {toPersianNumbers(totalExercises)}
            </span>
          </div>
          <div className="flex flex-col mt-auto">
            <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300 mb-1">تمرین‌های تخصیصی</h3>
            <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
              مجموع کل تمرین‌های انتخاب شده برای تمام شاگردان
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
