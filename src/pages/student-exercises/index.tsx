
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Dumbbell, Target, Calendar, TrendingUp, 
  Play, CheckCircle, Eye, Filter, Grid, List, 
  ChevronRight, ChevronLeft, Activity, Award, Clock
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { getLocalStorageItem } from "@/utils/localStorage";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const StudentExercises = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [studentExercises, setStudentExercises] = useState<any[]>([]);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string>("all");
  
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseData();
  const deviceInfo = useDeviceInfo();

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = () => {
    const loggedInStudentId = getLocalStorageItem<number>('loggedInStudentId', 0);
    const students = getLocalStorageItem<any[]>('students', []);
    
    if (loggedInStudentId && students.length > 0) {
      const student = students.find(s => s.id === loggedInStudentId);
      if (student) {
        setCurrentStudent(student);
        loadStudentExercises(student);
      }
    }
  };

  const loadStudentExercises = (student: any) => {
    const allExercises: any[] = [];
    
    for (let day = 1; day <= 6; day++) {
      const dayExercises = student[`exercisesDay${day}`] || [];
      const daySets = student[`exerciseSetsDay${day}`] || {};
      const dayReps = student[`exerciseRepsDay${day}`] || {};
      
      dayExercises.forEach((exerciseId: number) => {
        const exercise = exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
          allExercises.push({
            ...exercise,
            day,
            sets: daySets[exerciseId] || 3,
            reps: dayReps[exerciseId] || "8-12",
            assigned: true,
            completed: Math.random() > 0.7,
            progress: Math.floor(Math.random() * 100)
          });
        }
      });
    }
    
    setStudentExercises(allExercises);
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      categories.find(cat => cat.id === exercise.categoryId)?.name === selectedCategory;
    const matchesType = selectedExerciseType === "all" || 
      categories.find(cat => cat.id === exercise.categoryId)?.type === selectedExerciseType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const filteredStudentExercises = studentExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      categories.find(cat => cat.id === exercise.categoryId)?.name === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || "نامشخص";
  };

  const getDayLabel = (day: number) => {
    const dayLabels = {
      1: "شنبه", 2: "یکشنبه", 3: "دوشنبه", 
      4: "سه‌شنبه", 5: "چهارشنبه", 6: "پنج‌شنبه"
    };
    return dayLabels[day as keyof typeof dayLabels] || `روز ${toPersianNumbers(day.toString())}`;
  };

  // محاسبه آمار
  const totalAssigned = studentExercises.length;
  const completedExercises = studentExercises.filter(ex => ex.completed).length;
  const weeklyProgress = totalAssigned > 0 ? Math.round((completedExercises / totalAssigned) * 100) : 0;
  const activeDays = [...new Set(studentExercises.map(ex => ex.day))].length;

  const containerPadding = deviceInfo.isMobile ? "p-4" : deviceInfo.isTablet ? "p-6" : "p-8";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center" dir="rtl">
        <Card className="p-8">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl animate-pulse flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">در حال بارگذاری تمرینات شما...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">خطا در احراز هویت</h2>
            <p className="text-gray-600">اطلاعات شاگرد یافت نشد. لطفاً دوباره وارد شوید.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40", containerPadding)}
      dir="rtl"
    >
      {/* Header مدرن */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-xl">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-l from-emerald-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                برنامه تمرینی من
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                مدیریت و پیگیری تمرینات شخصی
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-2xl">
              <div className="text-2xl font-bold text-emerald-700">
                {toPersianNumbers(totalAssigned.toString())}
              </div>
              <p className="text-xs text-emerald-600">تمرین اختصاصی</p>
            </div>
            <div className="text-center px-4 py-2 bg-gradient-to-r from-sky-100 to-purple-100 rounded-2xl">
              <div className="text-2xl font-bold text-sky-700">
                {toPersianNumbers(weeklyProgress.toString())}%
              </div>
              <p className="text-xs text-sky-600">پیشرفت هفتگی</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* آمار کلی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {[
          { icon: Target, label: "تمرین اختصاصی", value: totalAssigned, color: "from-emerald-500 to-teal-500" },
          { icon: CheckCircle, label: "تکمیل شده", value: completedExercises, color: "from-green-500 to-emerald-500" },
          { icon: Calendar, label: "روزهای فعال", value: activeDays, color: "from-sky-500 to-blue-500" },
          { icon: TrendingUp, label: "درصد پیشرفت", value: weeklyProgress, suffix: "%", color: "from-purple-500 to-pink-500" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", stat.color)}>
                    <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {toPersianNumbers(stat.value.toString())}{stat.suffix || ""}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* تب‌های اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 text-base">
              <Activity className="w-5 h-5" />
              <span className="hidden sm:inline">داشبورد</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2 text-base">
              <Dumbbell className="w-5 h-5" />
              <span className="hidden sm:inline">تمرینات من</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2 text-base">
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">کتابخانه</span>
            </TabsTrigger>
          </TabsList>

          {/* تب داشبورد */}
          <TabsContent value="dashboard" className="space-y-8">
            <DashboardTab 
              studentExercises={studentExercises}
              categories={categories}
              getDayLabel={getDayLabel}
              getCategoryName={getCategoryName}
            />
          </TabsContent>

          {/* تب تمرینات من */}
          <TabsContent value="exercises" className="space-y-8">
            <MyExercisesTab 
              exercises={filteredStudentExercises}
              categories={categories}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              viewMode={viewMode}
              setViewMode={setViewMode}
              getDayLabel={getDayLabel}
              getCategoryName={getCategoryName}
            />
          </TabsContent>

          {/* تب کتابخانه */}
          <TabsContent value="library" className="space-y-8">
            <ExerciseLibraryTab 
              exercises={filteredExercises}
              categories={categories}
              exerciseTypes={exerciseTypes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedExerciseType={selectedExerciseType}
              setSelectedExerciseType={setSelectedExerciseType}
              viewMode={viewMode}
              setViewMode={setViewMode}
              getCategoryName={getCategoryName}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

// کامپوننت تب داشبورد
const DashboardTab = ({ studentExercises, categories, getDayLabel, getCategoryName }: any) => {
  // گروه‌بندی تمرینات بر اساس روز
  const exercisesByDay = studentExercises.reduce((acc: any, exercise: any) => {
    if (!acc[exercise.day]) acc[exercise.day] = [];
    acc[exercise.day].push(exercise);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* نمای هفتگی */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            برنامه هفتگی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(day => {
              const dayExercises = exercisesByDay[day] || [];
              const completedCount = dayExercises.filter((ex: any) => ex.completed).length;
              const progress = dayExercises.length > 0 ? (completedCount / dayExercises.length) * 100 : 0;
              
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: day * 0.1 }}
                  className="p-6 bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{getDayLabel(day)}</h3>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white">
                      {toPersianNumbers(dayExercises.length.toString())} تمرین
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>پیشرفت</span>
                      <span className="font-bold text-emerald-600">
                        {toPersianNumbers(Math.round(progress).toString())}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="text-xs text-gray-600">
                      {toPersianNumbers(completedCount.toString())} از {toPersianNumbers(dayExercises.length.toString())} تکمیل شده
                    </div>
                  </div>
                  
                  {dayExercises.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {dayExercises.slice(0, 2).map((exercise: any) => (
                        <div key={exercise.id} className="flex items-center gap-2 text-sm">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            exercise.completed ? "bg-green-500" : "bg-orange-500"
                          )} />
                          <span className="truncate">{exercise.name}</span>
                        </div>
                      ))}
                      {dayExercises.length > 2 && (
                        <div className="text-xs text-gray-500">
                          و {toPersianNumbers((dayExercises.length - 2).toString())} تمرین دیگر
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* تمرینات امروز */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            تمرینات پیشنهادی امروز
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentExercises.slice(0, 6).map((exercise: any, index: number) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-white to-sky-50/50 rounded-xl border border-sky-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1">{exercise.name}</h4>
                    <p className="text-xs text-gray-500">{getCategoryName(exercise.categoryId)}</p>
                  </div>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    exercise.completed ? "bg-green-500" : "bg-orange-500"
                  )} />
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <span>{toPersianNumbers(exercise.sets?.toString() || "3")} ست</span>
                  <span>{exercise.reps || "8-12"} تکرار</span>
                </div>
                
                <Button
                  size="sm"
                  className={cn(
                    "w-full text-xs",
                    exercise.completed
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      : "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
                  )}
                >
                  {exercise.completed ? (
                    <>
                      <CheckCircle className="w-3 h-3 ml-1" />
                      تکمیل شده
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 ml-1" />
                      شروع تمرین
                    </>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// کامپوننت تب تمرینات من
const MyExercisesTab = ({ exercises, categories, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, viewMode, setViewMode, getDayLabel, getCategoryName }: any) => {
  return (
    <div className="space-y-6">
      {/* فیلترها */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="جستجو در تمرینات من..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-300 focus:ring-emerald-200 bg-white"
              >
                <option value="all">همه دسته‌ها</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="gap-2 border-gray-200 hover:border-emerald-300"
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                {viewMode === "grid" ? "لیستی" : "شبکه‌ای"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* لیست تمرینات */}
      {exercises.length === 0 ? (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Dumbbell className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              هیچ تمرینی یافت نشد
            </h3>
            <p className="text-gray-500">
              فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        )}>
          {exercises.map((exercise: any, index: number) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {exercise.name}
                      </CardTitle>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs">
                        {getCategoryName(exercise.categoryId)}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                      <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {getDayLabel(exercise.day)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-sky-600" />
                          <span className="text-xs text-gray-600">
                            {toPersianNumbers(exercise.sets?.toString() || "3")} ست
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-600">
                            {exercise.reps || "8-12"} تکرار
                          </span>
                        </div>
                      </div>
                    </div>

                    {exercise.progress !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">پیشرفت</span>
                          <span className="text-emerald-600 font-medium">
                            {toPersianNumbers(exercise.progress.toString())}%
                          </span>
                        </div>
                        <Progress value={exercise.progress} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
                    >
                      <Eye className="w-4 h-4 ml-2" />
                      مشاهده
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "border-2 transition-all duration-300",
                        exercise.completed
                          ? "border-green-500 text-green-600 bg-green-50 hover:bg-green-100"
                          : "border-orange-500 text-orange-600 bg-orange-50 hover:bg-orange-100"
                      )}
                    >
                      {exercise.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 ml-2" />
                          تکمیل
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 ml-2" />
                          شروع
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// کامپوننت تب کتابخانه
const ExerciseLibraryTab = ({ exercises, categories, exerciseTypes, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedExerciseType, setSelectedExerciseType, viewMode, setViewMode, getCategoryName }: any) => {
  return (
    <div className="space-y-6">
      {/* فیلترهای پیشرفته */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجو در کتابخانه حرکات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع تمرین</label>
                <select
                  value={selectedExerciseType}
                  onChange={(e) => setSelectedExerciseType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-300 focus:ring-emerald-200 bg-white"
                >
                  <option value="all">همه انواع</option>
                  {exerciseTypes.map((type: string) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-300 focus:ring-emerald-200 bg-white"
                >
                  <option value="all">همه دسته‌ها</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نمایش</label>
                <Button
                  variant="outline"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="w-full gap-2 border-gray-200 hover:border-emerald-300"
                >
                  {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  {viewMode === "grid" ? "نمایش لیستی" : "نمایش شبکه‌ای"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* لیست حرکات */}
      {exercises.length === 0 ? (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              حرکتی یافت نشد
            </h3>
            <p className="text-gray-500">
              فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        )}>
          {exercises.map((exercise: any, index: number) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {exercise.name}
                      </CardTitle>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs">
                        {getCategoryName(exercise.categoryId)}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                      <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {exercise.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {exercise.description}
                    </p>
                  )}

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    مشاهده جزئیات
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentExercises;
