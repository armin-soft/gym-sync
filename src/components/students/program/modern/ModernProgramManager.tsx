
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Supplement } from "@/types/supplement";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dumbbell, 
  Utensils, 
  Pill, 
  Calendar,
  Sparkles,
  Target,
  TrendingUp,
  Save,
  X,
  ChevronRight,
  Users,
  Clock,
  Star,
  Activity
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";
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
  const [activeTab, setActiveTab] = useState("exercise");
  const [selectedDay, setSelectedDay] = useState(1);
  const { toast } = useToast();

  const tabsConfig = [
    {
      id: "exercise",
      label: "برنامه تمرینی",
      icon: Dumbbell,
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50",
      darkBgColor: "from-purple-900/20 to-indigo-900/20",
      description: "تنظیم تمرینات روزانه"
    },
    {
      id: "diet",
      label: "برنامه غذایی",
      icon: Utensils,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      darkBgColor: "from-emerald-900/20 to-teal-900/20",
      description: "طراحی رژیم غذایی"
    },
    {
      id: "supplement",
      label: "مکمل و ویتامین",
      icon: Pill,
      color: "from-rose-500 to-pink-600",
      bgColor: "from-rose-50 to-pink-50",
      darkBgColor: "from-rose-900/20 to-pink-900/20",
      description: "تعیین مکمل‌های مورد نیاز"
    }
  ];

  const currentTabConfig = tabsConfig.find(tab => tab.id === activeTab);

  const handleSaveAll = () => {
    toast({
      title: "ذخیره موفق",
      description: "برنامه با موفقیت ذخیره شد",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-rose-400/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Modern Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="text-right">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    مدیریت برنامه ورزشی
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span>برای</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{student.name}</span>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 px-6 py-3 rounded-2xl border border-purple-200/50 dark:border-purple-700/50">
                  <div className="text-sm text-purple-700 dark:text-purple-300 font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    پیشرفت: {toPersianNumbers(student.progress || 75)}%
                  </div>
                  <div className="w-32 h-2 bg-purple-100 dark:bg-purple-800 rounded-full mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${student.progress || 75}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-12 w-12 rounded-2xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-6 py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/50 dark:border-purple-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">تمرینات</h3>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-2">{toPersianNumbers(exercises.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">وعده‌ها</h3>
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">{toPersianNumbers(meals.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200/50 dark:border-rose-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-rose-700 dark:text-rose-300">مکمل‌ها</h3>
                <p className="text-2xl font-bold text-rose-900 dark:text-rose-100 mt-2">{toPersianNumbers(supplements.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300">امتیاز</h3>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100 mt-2">{toPersianNumbers(95)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
              {/* Custom Tab Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 p-6">
                <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-100/80 to-gray-50/80 dark:from-gray-600/50 dark:to-gray-700/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 h-auto p-3 rounded-3xl shadow-lg">
                  {tabsConfig.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="relative h-20 rounded-2xl border-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-current transition-all duration-300 group"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTabBg"
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tab.bgColor} dark:bg-gradient-to-r dark:${tab.darkBgColor} shadow-xl border border-white/50 dark:border-gray-600/50`}
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                        
                        <div className="relative z-10 flex flex-col items-center gap-3 px-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive 
                              ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-gray-300 dark:group-hover:bg-gray-500'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="text-center">
                            <span className={`text-sm font-bold transition-all duration-300 ${
                              isActive 
                                ? 'text-gray-800 dark:text-gray-100' 
                                : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                            }`}>
                              {tab.label}
                            </span>
                            <p className={`text-xs mt-1 transition-all duration-300 ${
                              isActive 
                                ? 'text-gray-600 dark:text-gray-300' 
                                : 'text-gray-500 dark:text-gray-500'
                            }`}>
                              {tab.description}
                            </p>
                          </div>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <TabsContent value="exercise" className="mt-0">
                  <ModernExerciseTab
                    student={student}
                    exercises={exercises}
                    onSaveExercises={onSaveExercises}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </TabsContent>
                
                <TabsContent value="diet" className="mt-0">
                  <ModernDietTab
                    student={student}
                    meals={meals}
                    onSaveDiet={onSaveDiet}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </TabsContent>
                
                <TabsContent value="supplement" className="mt-0">
                  <ModernSupplementTab
                    student={student}
                    supplements={supplements}
                    onSaveSupplements={onSaveSupplements}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                  />
                </TabsContent>
              </div>
            </Tabs>

            {/* Action Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border-t border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 px-4 py-2">
                    <Clock className="w-4 h-4 mr-2" />
                    روز {toPersianNumbers(selectedDay)}
                  </Badge>
                  
                  {currentTabConfig && (
                    <Badge variant="outline" className={`bg-gradient-to-r ${currentTabConfig.bgColor} dark:${currentTabConfig.darkBgColor} text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 px-4 py-2`}>
                      <currentTabConfig.icon className="w-4 h-4 mr-2" />
                      {currentTabConfig.label}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <X className="h-4 w-4" />
                    انصراف
                  </Button>
                  
                  <Button
                    onClick={handleSaveAll}
                    className="gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    ذخیره برنامه
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernProgramManager;
