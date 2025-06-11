
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Dumbbell, 
  Utensils, 
  Pill, 
  User,
  CheckCircle2,
  Calendar,
  Target
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import ModernExerciseTab from "./tabs/ModernExerciseTab";
import ModernDietTab from "./tabs/ModernDietTab";
import ModernSupplementTab from "./tabs/ModernSupplementTab";

interface ModernProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  onClose: () => void;
}

const ModernProgramManager: React.FC<ModernProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState("exercise");

  console.log("ModernProgramManager loaded with data:", {
    exercisesCount: exercises.length,
    mealsCount: meals.length,
    supplementsCount: supplements.length
  });

  const tabsConfig = [
    {
      id: "exercise",
      label: "برنامه تمرینی",
      icon: <Dumbbell className="w-4 h-4" />,
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50",
      darkBgColor: "from-purple-900/20 to-indigo-900/20"
    },
    {
      id: "diet",
      label: "برنامه غذایی",
      icon: <Utensils className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      darkBgColor: "from-emerald-900/20 to-teal-900/20"
    },
    {
      id: "supplement",
      label: "مکمل و ویتامین",
      icon: <Pill className="w-4 h-4" />,
      color: "from-rose-500 to-pink-600",
      bgColor: "from-rose-50 to-pink-50",
      darkBgColor: "from-rose-900/20 to-pink-900/20"
    }
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,92,246,0.02)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
      
      {/* Header */}
      <div className="relative z-10 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  مدیریت برنامه {student.name}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  تخصیص و مدیریت برنامه‌های ورزشی، غذایی و مکمل
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  روز {toPersianNumbers(selectedDay)}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-[calc(100vh-120px)] overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          {/* Tabs Header */}
          <div className="px-8 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-700/40">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-1 h-14">
              {tabsConfig.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`flex items-center gap-3 text-sm font-medium rounded-xl transition-all duration-300 data-[state=active]:shadow-lg ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white`
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <TabsContent value="exercise" className="h-full m-0 p-6 overflow-y-auto">
                  <ModernExerciseTab
                    student={student}
                    exercises={exercises}
                    onSaveExercises={onSaveExercises}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </TabsContent>

                <TabsContent value="diet" className="h-full m-0 p-6 overflow-y-auto">
                  <ModernDietTab
                    student={student}
                    meals={meals}
                    onSaveDiet={onSaveDiet}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </TabsContent>

                <TabsContent value="supplement" className="h-full m-0 p-6 overflow-y-auto">
                  <ModernSupplementTab
                    student={student}
                    supplements={supplements}
                    onSaveSupplements={onSaveSupplements}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ModernProgramManager;
