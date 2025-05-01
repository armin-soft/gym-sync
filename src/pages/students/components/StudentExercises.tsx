
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Plus, Filter, Calendar, BookOpen, Dumbbell, BarChart3, CalendarDays, ListFilter } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Exercise } from "@/types/exercise";
import { ExerciseWithSets } from "@/types/exercise";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useDeviceInfo } from "@/hooks/use-mobile";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { useStudentExercises } from "@/hooks/students/useStudentExercises";

interface StudentExercisesProps {
  student: Student;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onOpenChange?: (open: boolean) => void;
}

export function StudentExercises({ student, students, setStudents, onOpenChange }: StudentExercisesProps) {
  const deviceInfo = useDeviceInfo();
  const { toast } = useToast();
  const { handleSaveExercises } = useStudentExercises(students, setStudents);
  
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch exercises data
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => {
      const exercisesData = localStorage.getItem("exercises");
      return exercisesData ? JSON.parse(exercisesData) : [];
    },
  });
  
  // Fetch categories data
  const { data: categories = [] } = useQuery({
    queryKey: ["exerciseCategories"],
    queryFn: () => {
      const categoriesData = localStorage.getItem("exerciseCategories");
      return categoriesData ? JSON.parse(categoriesData) : [];
    },
  });
  
  // Get exercise details by ID
  const getExerciseName = (exerciseId: number): string => {
    const exercise = exercises.find((ex: Exercise) => ex.id === exerciseId);
    return exercise ? exercise.name : `تمرین ${exerciseId}`;
  };
  
  const getCategoryName = (exerciseId: number): string => {
    const exercise = exercises.find((ex: Exercise) => ex.id === exerciseId);
    if (!exercise) return "دسته‌بندی نامشخص";
    
    const category = categories.find((cat: any) => cat.id === exercise.categoryId);
    return category ? category.name : "دسته‌بندی نامشخص";
  };
  
  // Check if student has exercises
  const hasExercises = Boolean(
    (student.exercises && student.exercises.length > 0) || 
    (student.exercisesDay1 && student.exercisesDay1.length > 0) ||
    (student.exercisesDay2 && student.exercisesDay2.length > 0) ||
    (student.exercisesDay3 && student.exercisesDay3.length > 0) ||
    (student.exercisesDay4 && student.exercisesDay4.length > 0)
  );
  
  // Calculate total exercise count
  const totalExerciseCount = [
    student.exercises?.length || 0,
    student.exercisesDay1?.length || 0,
    student.exercisesDay2?.length || 0,
    student.exercisesDay3?.length || 0,
    student.exercisesDay4?.length || 0
  ].reduce((acc, val) => acc + val, 0);
  
  // Handle save exercises
  const handleSaveExercisesWrapper = (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => {
    return handleSaveExercises(exercisesWithSets, student.id, dayNumber);
  };
  
  // Get animation variants based on device type
  const getVariants = () => {
    if (deviceInfo.isMobile) {
      return {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
      };
    }
    return {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };
  };
  
  // Generate tailwind classes for container based on device
  const getContainerClasses = () => {
    return deviceInfo.isMobile 
      ? "gap-3 p-3" 
      : deviceInfo.isTablet 
        ? "gap-4 p-4" 
        : "gap-6 p-5";
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            مدیریت تمرین‌های {student.name}
          </h2>
          <p className="text-muted-foreground text-sm">
            برنامه‌ریزی و مدیریت تمرین‌های روزانه شاگرد
          </p>
        </div>
        
        <Button 
          onClick={() => setIsExerciseDialogOpen(true)} 
          className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
        >
          <Plus className="h-4 w-4" />
          افزودن تمرین
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="flex-1 flex flex-col"
      >
        <TabsList className="flex bg-muted/60 p-1 rounded-xl mb-5">
          <TabsTrigger value="overview" className="flex-1 rounded-lg data-[state=active]:bg-background transition-all duration-300">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>خلاصه تمرین‌ها</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex-1 rounded-lg data-[state=active]:bg-background transition-all duration-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>برنامه روزانه</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex-1 rounded-lg data-[state=active]:bg-background transition-all duration-300">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4" />
              <span>آمار و تحلیل</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={getVariants()}
            className="flex-1 overflow-auto"
          >
            <TabsContent 
              value="overview" 
              className="w-full h-full mt-0 border-none flex-1 data-[state=active]:flex flex-col"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 border-indigo-100 dark:border-indigo-900 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">تعداد کل تمرین‌ها</CardTitle>
                    <CardDescription>مجموع تمام تمرین‌های شاگرد</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalExerciseCount}</span>
                      <span className="text-sm text-muted-foreground mb-1">تمرین</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-900 border-purple-100 dark:border-purple-900 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">روزهای تمرین</CardTitle>
                    <CardDescription>تقسیم‌بندی روزهای تمرین شاگرد</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {[
                          student.exercisesDay1?.length ? 1 : 0, 
                          student.exercisesDay2?.length ? 1 : 0, 
                          student.exercisesDay3?.length ? 1 : 0, 
                          student.exercisesDay4?.length ? 1 : 0
                        ].reduce((acc, val) => acc + val, 0)}
                      </span>
                      <span className="text-sm text-muted-foreground mb-1">روز</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 border-pink-100 dark:border-pink-900 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">نسبت تکمیل</CardTitle>
                    <CardDescription>درصد تکمیل برنامه تمرینی شاگرد</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                        {hasExercises ? Math.min(100, Math.round((totalExerciseCount / 24) * 100)) : 0}%
                      </span>
                      <span className="text-sm text-muted-foreground mb-1">تکمیل شده</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {hasExercises ? (
                <ScrollArea className="flex-1 pr-4">
                  {student.exercises && student.exercises.length > 0 && (
                    <Card className="mb-6 border border-indigo-100 dark:border-indigo-900 shadow-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex gap-2 items-center">
                            <Dumbbell className="h-5 w-5 text-indigo-500" />
                            تمرین‌های عمومی
                          </CardTitle>
                          <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700">
                            {student.exercises.length} تمرین
                          </Badge>
                        </div>
                        <CardDescription>تمرین‌های کلی و عمومی شاگرد</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {student.exercises.map((exerciseId) => {
                            const exerciseName = getExerciseName(exerciseId);
                            const categoryName = getCategoryName(exerciseId);
                            const sets = student.exerciseSets?.[exerciseId] || 3;
                            const reps = student.exerciseReps?.[exerciseId] || "12-15";
                            
                            return (
                              <div 
                                key={exerciseId} 
                                className="p-3 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg"
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{exerciseName}</span>
                                    <Badge variant="secondary" className="bg-white/80 dark:bg-gray-800/80">
                                      {categoryName}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <span className="font-medium text-foreground">{sets}</span> ست
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="font-medium text-foreground">{reps}</span> تکرار
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {[1, 2, 3, 4].map(day => {
                    const exercisesDay = student[`exercisesDay${day}` as keyof Student] as number[] | undefined;
                    if (!exercisesDay || exercisesDay.length === 0) return null;
                    
                    return (
                      <Card key={`day-${day}`} className="mb-6 border border-violet-100 dark:border-violet-900 shadow-sm">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex gap-2 items-center">
                              <CalendarDays className="h-5 w-5 text-violet-500" />
                              تمرین‌های روز {day}
                            </CardTitle>
                            <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700">
                              {exercisesDay.length} تمرین
                            </Badge>
                          </div>
                          <CardDescription>برنامه تمرینی روز {day} شاگرد</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {exercisesDay.map((exerciseId) => {
                              const exerciseName = getExerciseName(exerciseId);
                              const categoryName = getCategoryName(exerciseId);
                              const sets = student[`exerciseSetsDay${day}` as keyof Student]?.[exerciseId] || 3;
                              const reps = student[`exerciseRepsDay${day}` as keyof Student]?.[exerciseId] || "12-15";
                              
                              return (
                                <div 
                                  key={exerciseId} 
                                  className="p-3 bg-violet-50/50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-lg"
                                >
                                  <div className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                      <span className="font-medium">{exerciseName}</span>
                                      <Badge variant="secondary" className="bg-white/80 dark:bg-gray-800/80">
                                        {categoryName}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <span className="font-medium text-foreground">{sets}</span> ست
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <span className="font-medium text-foreground">{reps}</span> تکرار
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </ScrollArea>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-3">
                    <Dumbbell className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">برنامه تمرینی خالی</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    هنوز هیچ تمرینی برای این شاگرد اضافه نشده است. برای شروع، روی دکمه «افزودن تمرین» کلیک کنید.
                  </p>
                  <Button 
                    onClick={() => setIsExerciseDialogOpen(true)}
                    className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    افزودن تمرین
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent 
              value="daily" 
              className="w-full h-full mt-0 border-none flex-1 data-[state=active]:flex flex-col"
            >
              <Tabs defaultValue="day1" className="flex-1 flex flex-col">
                <TabsList className="flex bg-muted/60 p-1 rounded-xl mb-5">
                  {[1, 2, 3, 4].map((day) => (
                    <TabsTrigger key={day} value={`day${day}`} className="flex-1 rounded-lg data-[state=active]:bg-background transition-all duration-300">
                      روز {day}
                      {student[`exercisesDay${day}` as keyof Student] && 
                       (student[`exercisesDay${day}` as keyof Student] as number[])?.length > 0 && (
                        <Badge className="bg-primary ml-2 text-2xs h-5 min-w-5 px-1 flex items-center justify-center">
                          {(student[`exercisesDay${day}` as keyof Student] as number[])?.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <ScrollArea className="flex-1">
                  {[1, 2, 3, 4].map(day => (
                    <TabsContent 
                      key={`content-day${day}`}
                      value={`day${day}`} 
                      className="mt-0 border-none data-[state=active]:flex flex-col"
                    >
                      {(student[`exercisesDay${day}` as keyof Student] as number[] | undefined)?.length ? (
                        <div className="space-y-4">
                          {(student[`exercisesDay${day}` as keyof Student] as number[])?.map((exerciseId) => {
                            const exerciseName = getExerciseName(exerciseId);
                            const categoryName = getCategoryName(exerciseId);
                            const sets = student[`exerciseSetsDay${day}` as keyof Student]?.[exerciseId] || 3;
                            const reps = student[`exerciseRepsDay${day}` as keyof Student]?.[exerciseId] || "12-15";
                            
                            return (
                              <Card key={exerciseId} className="border-violet-100 dark:border-violet-900/40 overflow-hidden">
                                <div className="bg-violet-50 dark:bg-violet-900/20 py-2 px-4 flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Dumbbell className="h-4 w-4 text-violet-500" />
                                    <span className="font-medium">{exerciseName}</span>
                                  </div>
                                  <Badge variant="secondary" className="bg-white/80 dark:bg-gray-800/80">
                                    {categoryName}
                                  </Badge>
                                </div>
                                <CardContent className="py-3">
                                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-muted-foreground">تعداد ست:</span>
                                      <span className="font-medium">{sets} ست</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-muted-foreground">تکرار هر ست:</span>
                                      <span className="font-medium">{reps}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-muted-foreground">استراحت بین ست‌ها:</span>
                                      <span className="font-medium">60-90 ثانیه</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm text-muted-foreground">شدت:</span>
                                      <span className="font-medium">متوسط</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                          
                          <div className="flex justify-center mt-6">
                            <Button
                              onClick={() => setIsExerciseDialogOpen(true)}
                              variant="outline"
                              className="border-dashed border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              افزودن تمرین به روز {day}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-3">
                            <CalendarDays className="h-8 w-8 text-muted-foreground/40" />
                          </div>
                          <h3 className="text-base font-medium mb-2">برنامه روز {day} خالی است</h3>
                          <p className="text-muted-foreground text-center text-sm max-w-xs mb-5">
                            هنوز هیچ تمرینی برای روز {day} این شاگرد اضافه نشده است.
                          </p>
                          <Button
                            onClick={() => setIsExerciseDialogOpen(true)}
                            className="gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            افزودن تمرین
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </ScrollArea>
              </Tabs>
            </TabsContent>
            
            <TabsContent 
              value="stats" 
              className="w-full h-full mt-0 border-none flex-1 data-[state=active]:flex flex-col"
            >
              <Card className="flex-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>تحلیل تمرین‌ها</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span className="text-xs">فیلتر</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="text-xs">مرتب‌سازی</span>
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    آمار و تحلیل تمرین‌های شاگرد بر اساس نوع تمرین و عضلات هدف
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-3">
                      <BarChart3 className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-base font-medium mb-2">آماری برای نمایش وجود ندارد</h3>
                    <p className="text-muted-foreground text-center text-sm max-w-xs">
                      با افزودن تمرین‌های بیشتر، آمار و تحلیل‌های دقیق‌تری در این بخش نمایش داده خواهد شد.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      {/* Exercise Dialog */}
      <StudentExerciseDialog
        open={isExerciseDialogOpen}
        onOpenChange={setIsExerciseDialogOpen}
        studentName={student.name}
        onSave={handleSaveExercisesWrapper}
        initialExercises={student.exercises}
        initialExercisesDay1={student.exercisesDay1}
        initialExercisesDay2={student.exercisesDay2}
        initialExercisesDay3={student.exercisesDay3}
        initialExercisesDay4={student.exercisesDay4}
      />
    </div>
  );
}
