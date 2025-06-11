
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useProgramTabs } from "../hooks/useProgramTabs";
import { containerVariants, itemVariants } from "../utils/animations";
import ProgramTabsHeader from "./ProgramTabsHeader";
import ProgramTabsContent from "./ProgramTabsContent";
import { Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[]) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[]}) => boolean;
}

const ProgramManager: React.FC<ProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements
}) => {
  const { activeTab, setActiveTab } = useProgramTabs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40" dir="rtl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full flex flex-col relative overflow-hidden"
      >
        {/* عناصر تزئینی پس‌زمینه با رنگ‌های جدید */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-sky-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* بخش هدر */}
        <motion.div variants={itemVariants} className="relative z-10">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-emerald-200/30 dark:border-emerald-700/30 shadow-custom-soft">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-custom-medium">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-sky-600 dark:from-emerald-300 dark:to-sky-400 bg-clip-text text-transparent">
                      تخصیص برنامه ورزشی
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <span>برای</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{student.name}</span>
                      <TrendingUp className="w-4 h-4 text-sky-500" />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/30 dark:to-sky-900/30 px-4 py-2 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50 shadow-custom-soft">
                    <div className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                      پیشرفت: {toPersianNumbers(student.progress || 0)}%
                    </div>
                    <div className="w-20 h-1.5 bg-emerald-100 dark:bg-emerald-800 rounded-full mt-1">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full transition-all duration-500"
                        style={{ width: `${student.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* محتوای اصلی */}
        <div className="flex-1 relative z-10">
          <Tabs 
            defaultValue="exercise" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full h-full flex flex-col"
            dir="rtl"
          >
            <motion.div variants={itemVariants} className="flex-1 flex flex-col">
              <Card className="mx-6 mt-6 mb-6 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-emerald-200/30 dark:border-emerald-700/30 shadow-custom-strong overflow-hidden flex-1 flex flex-col">
                <div className="bg-gradient-to-r from-white/95 to-emerald-50/50 dark:from-gray-800/95 dark:to-emerald-900/20 border-b border-emerald-200/30 dark:border-emerald-700/30">
                  <ProgramTabsHeader activeTab={activeTab} />
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <ProgramTabsContent 
                    student={student}
                    exercises={exercises}
                    meals={meals}
                    supplements={supplements}
                    onSaveExercises={onSaveExercises}
                    onSaveDiet={onSaveDiet}
                    onSaveSupplements={onSaveSupplements}
                  />
                </div>
              </Card>
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgramManager;
