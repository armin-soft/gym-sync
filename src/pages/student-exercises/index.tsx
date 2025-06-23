
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, Dumbbell, Target, Clock, 
  TrendingUp, Play, Pause, Check, Star,
  Calendar, Award, Activity, ChevronRight,
  Eye, Heart, Zap, Shield
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { getLocalStorageItem } from "@/utils/localStorage";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import ExerciseFilters from "./components/ExerciseFilters";
import ExerciseGrid from "./components/ExerciseGrid";
import HierarchicalExerciseView from "./components/HierarchicalExerciseView";
import ExerciseStats from "./components/ExerciseStats";
import StudentProgress from "./components/StudentProgress";

const StudentExercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("exercises");
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [studentExercises, setStudentExercises] = useState<any[]>([]);
  
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
    
    // Load exercises from all days
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
            completed: false,
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
      categories.find(cat => cat.id === exercise.categoryId)?.type === selectedCategory;
    const matchesType = selectedType === "all" || 
      categories.find(cat => cat.id === exercise.categoryId)?.name === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const containerPadding = deviceInfo.isMobile ? "p-3" : deviceInfo.isTablet ? "p-4" : "p-6";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center" dir="rtl">
        <Card className="p-8">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl animate-pulse"></div>
            <p className="text-gray-600">در حال بارگذاری حرکات تمرینی...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 flex items-center justify-center" dir="rtl">
        <Card className="p-8 text-center">
          <CardContent>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">خطا در احراز هویت</h2>
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
      {/* Modern Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-gradient-to-l from-emerald-500/10 via-sky-500/5 to-purple-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-l from-emerald-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                  حرکات تمرینی
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  مجموعه کامل حرکات و تمرینات ورزشی
                </p>
              </div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              {toPersianNumbers(studentExercises.length.toString())}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">تمرین اختصاص‌یافته</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <ExerciseStats 
        studentExercises={studentExercises}
        totalExercises={exercises.length}
        totalCategories={categories.length}
      />

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">تمام حرکات</span>
              <span className="sm:hidden">حرکات</span>
            </TabsTrigger>
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">تمرینات من</span>
              <span className="sm:hidden">من</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">پیشرفت</span>
              <span className="sm:hidden">آمار</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exercises" className="space-y-6">
            <ExerciseFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              categories={categories}
              exerciseTypes={exerciseTypes}
            />
            <ExerciseGrid exercises={filteredExercises} categories={categories} />
          </TabsContent>

          <TabsContent value="assigned" className="space-y-6">
            <HierarchicalExerciseView 
              exercises={studentExercises} 
              categories={categories}
              showAssignedDetails={true}
            />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <StudentProgress 
              studentExercises={studentExercises}
              currentStudent={currentStudent}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default StudentExercises;
