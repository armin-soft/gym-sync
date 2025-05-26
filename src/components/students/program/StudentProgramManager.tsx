
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { useStudentProgramManager } from "./hooks/useStudentProgramManager";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Save, 
  Dumbbell, 
  Utensils, 
  Pill, 
  User, 
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Activity,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentProgramExerciseContent from "./components/StudentProgramExerciseContent";
import StudentProgramDietContent from "./components/StudentProgramDietContent";
import StudentProgramSupplementContent from "./components/StudentProgramSupplementContent";

interface StudentProgramManagerProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: Supplement[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  onClose: () => void;
}

const StudentProgramManager: React.FC<StudentProgramManagerProps> = ({
  student,
  exercises,
  meals,
  supplements,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  onClose
}) => {
  const {
    activeTab,
    setActiveTab,
    currentDay,
    setCurrentDay,
    currentDietDay,
    setCurrentDietDay,
    currentSupplementDay,
    setCurrentSupplementDay,
    selectedExercises,
    setSelectedExercises,
    selectedMeals,
    setSelectedMeals,
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    handleSaveAll
  } = useStudentProgramManager({
    student,
    onSaveExercises,
    onSaveDiet,
    onSaveSupplements
  });

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
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const tabs = [
    {
      value: "exercise",
      label: "برنامه تمرینی",
      icon: Dumbbell,
      count: selectedExercises.length,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-900/20 to-indigo-900/20"
    },
    {
      value: "diet",
      label: "برنامه غذایی",
      icon: Utensils,
      count: selectedMeals.length,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      darkBgGradient: "from-emerald-900/20 to-green-900/20"
    },
    {
      value: "supplement",
      label: "مکمل و ویتامین",
      icon: Pill,
      count: selectedSupplements.length + selectedVitamins.length,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20"
    }
  ];

  const currentDate = new Date().toLocaleDateString('fa-IR');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900" dir="rtl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full flex flex-col relative overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="relative z-10">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>بازگشت</span>
                  </Button>
                  
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      تخصیص برنامه ورزشی
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <span>برای</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{student.name}</span>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 px-4 py-2 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                    <div className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                      پیشرفت: {toPersianNumbers(student.progress || 0)}%
                    </div>
                    <div className="w-20 h-1.5 bg-emerald-100 dark:bg-emerald-800 rounded-full mt-1">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${student.progress || 0}%` }}
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSaveAll}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                  >
                    <Save className="w-4 h-4 ml-2" />
                    ذخیره همه
                  </Button>
                </div>
              </div>

              {/* Student Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/50 dark:border-blue-700/50">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 dark:text-blue-400">تاریخ شروع</p>
                    <p className="font-semibold text-blue-800 dark:text-blue-300">{currentDate}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200/50 dark:border-emerald-700/50">
                  <CardContent className="p-4 text-center">
                    <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">وزن</p>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300">{toPersianNumbers(student.weight || 0)} کیلو</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200/50 dark:border-purple-700/50">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <p className="text-sm text-purple-600 dark:text-purple-400">قد</p>
                    <p className="font-semibold text-purple-800 dark:text-purple-300">{toPersianNumbers(student.height || 0)} سانتی</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200/50 dark:border-orange-700/50">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-orange-600 dark:text-orange-400">وضعیت</p>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      {student.status === 'active' ? 'فعال' : student.status === 'pending' ? 'در انتظار' : 'تکمیل شده'}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 relative z-10">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full h-full flex flex-col"
            dir="rtl"
          >
            <motion.div variants={itemVariants} className="flex-1 flex flex-col">
              <Card className="mx-6 mt-6 mb-6 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden flex-1 flex flex-col">
                <div className="bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="p-6" dir="rtl">
                    <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-700/50 dark:to-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 h-auto p-2 rounded-2xl shadow-lg">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.value;
                        
                        return (
                          <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="relative h-16 rounded-xl border-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-current transition-all duration-300 group"
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.bgGradient} dark:bg-gradient-to-r dark:${tab.darkBgGradient} shadow-lg border border-white/50 dark:border-gray-600/50`}
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            
                            <div className="relative z-10 flex flex-col items-center gap-2 px-4">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                isActive 
                                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md` 
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium transition-all duration-300 ${
                                  isActive 
                                    ? 'text-gray-800 dark:text-gray-100' 
                                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                                }`}>
                                  {tab.label}
                                </span>
                                {tab.count > 0 && (
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs ${
                                      isActive 
                                        ? 'bg-white/80 text-gray-700' 
                                        : 'bg-gray-200 text-gray-600'
                                    }`}
                                  >
                                    {toPersianNumbers(tab.count)}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </div>
                </div>
                
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
                      <TabsContent value="exercise" className="mt-0 h-full">
                        <StudentProgramExerciseContent 
                          currentDay={currentDay}
                          setCurrentDay={setCurrentDay}
                          selectedExercises={selectedExercises}
                          setSelectedExercises={setSelectedExercises}
                          exercises={exercises}
                        />
                      </TabsContent>
                      
                      <TabsContent value="diet" className="mt-0 h-full">
                        <StudentProgramDietContent 
                          selectedMeals={selectedMeals}
                          setSelectedMeals={setSelectedMeals}
                          meals={meals}
                          currentDietDay={currentDietDay}
                          setCurrentDietDay={setCurrentDietDay}
                        />
                      </TabsContent>
                      
                      <TabsContent value="supplement" className="mt-0 h-full">
                        <StudentProgramSupplementContent 
                          selectedSupplements={selectedSupplements}
                          setSelectedSupplements={setSelectedSupplements}
                          selectedVitamins={selectedVitamins}
                          setSelectedVitamins={setSelectedVitamins}
                          supplements={supplements}
                          currentDay={currentSupplementDay}
                          setCurrentDay={setCurrentSupplementDay}
                        />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProgramManager;
