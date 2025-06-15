
import React from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Target, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernActiveStudentsProps {
  activeStudentsCount: number;
  totalStudents: number;
  withExercisePrograms: number;
  withNutritionPrograms: number;
}

export const ModernActiveStudents: React.FC<ModernActiveStudentsProps> = ({
  activeStudentsCount,
  totalStudents,
  withExercisePrograms,
  withNutritionPrograms
}) => {
  const navigate = useNavigate();

  const handleAddStudent = () => {
    navigate('/Management/Students');
  };

  const handleManagePrograms = () => {
    navigate('/Management/Students');
  };

  const progressPercentage = totalStudents > 0 ? Math.round((activeStudentsCount / totalStudents) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="w-full"
      dir="rtl"
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/20 dark:to-sky-950/30 border-emerald-200/50 dark:border-emerald-800/30 shadow-xl">
        {/* تأثیرات پس‌زمینه */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 p-6">
          {/* هدر */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  مدیریت حرفه‌ای برنامه‌های تمرینی و تغذیه
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  نظارت و پیگیری پیشرفت شاگردان
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleAddStudent}
              className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg rounded-xl px-6"
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن شاگرد
            </Button>
          </div>

          {/* آمار اصلی */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* شاگردان فعال */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  فعال
                </Badge>
              </div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {toPersianNumbers(activeStudentsCount.toString())}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                شاگردان فعال
              </p>
            </motion.div>

            {/* کل شاگردان */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-sky-200/50 dark:border-sky-800/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                  <Target className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                  کل
                </Badge>
              </div>
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-1">
                {toPersianNumbers(totalStudents.toString())}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                کل شاگردان
              </p>
            </motion.div>

            {/* برنامه تمرینی */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-orange-800/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
                  تمرین
                </Badge>
              </div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {toPersianNumbers(withExercisePrograms.toString())}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                برنامه تمرینی
              </p>
            </motion.div>

            {/* برنامه تغذیه */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/30"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                  تغذیه
                </Badge>
              </div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {toPersianNumbers(withNutritionPrograms.toString())}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                برنامه تغذیه
              </p>
            </motion.div>
          </div>

          {/* نوار پیشرفت */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/30"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                میزان فعالیت شاگردان
              </h3>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {toPersianNumbers(progressPercentage.toString())}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
              />
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {activeStudentsCount > 0 
                ? `${toPersianNumbers(activeStudentsCount.toString())} نفر از ${toPersianNumbers(totalStudents.toString())} شاگرد در حال حاضر فعال هستند`
                : totalStudents > 0 
                  ? "هنوز هیچ شاگردی فعال نیست. برای شروع برنامه‌ها اقدام کنید"
                  : "برای شروع، اولین شاگرد خود را اضافه کنید"
              }
            </p>
          </motion.div>

          {/* دکمه‌های عملیاتی */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3 mt-6"
          >
            <Button
              onClick={handleManagePrograms}
              variant="outline"
              className="flex-1 border-emerald-200 hover:bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
            >
              <Users className="w-4 h-4 ml-2" />
              مدیریت شاگردان
            </Button>
            
            <Button
              onClick={() => navigate('/Management/Exercise-Movements')}
              variant="outline"
              className="flex-1 border-orange-200 hover:bg-orange-50 text-orange-700 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950/50"
            >
              <TrendingUp className="w-4 h-4 ml-2" />
              برنامه‌های تمرینی
            </Button>
            
            <Button
              onClick={() => navigate('/Management/Diet-Plan')}
              variant="outline"
              className="flex-1 border-purple-200 hover:bg-purple-50 text-purple-700 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-950/50"
            >
              <Award className="w-4 h-4 ml-2" />
              برنامه‌های تغذیه
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
