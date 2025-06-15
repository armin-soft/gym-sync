
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dumbbell, Play, Pause, Check, Clock, Target, 
  RotateCcw, Calendar, Award, TrendingUp
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

const weekDays = [
  { id: 'saturday', name: 'شنبه', exercises: 8 },
  { id: 'sunday', name: 'یکشنبه', exercises: 6 },
  { id: 'monday', name: 'دوشنبه', exercises: 7 },
  { id: 'tuesday', name: 'سه‌شنبه', exercises: 5 },
  { id: 'wednesday', name: 'چهارشنبه', exercises: 8 },
  { id: 'thursday', name: 'پنج‌شنبه', exercises: 6 },
  { id: 'friday', name: 'جمعه', exercises: 0 }
];

const todayExercises = [
  {
    id: 1,
    name: "پرس سینه با دمبل",
    sets: 4,
    reps: 12,
    weight: 25,
    category: "سینه",
    duration: 15,
    completed: false,
    status: "pending"
  },
  {
    id: 2,
    name: "پول‌آپ",
    sets: 3,
    reps: 10,
    weight: 0,
    category: "پشت",
    duration: 12,
    completed: true,
    status: "completed"
  },
  {
    id: 3,
    name: "اسکوات",
    sets: 4,
    reps: 15,
    weight: 40,
    category: "پا",
    duration: 18,
    completed: false,
    status: "in-progress"
  },
  {
    id: 4,
    name: "شکم",
    sets: 3,
    reps: 20,
    weight: 0,
    category: "شکم",
    duration: 10,
    completed: false,
    status: "pending"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'emerald';
    case 'in-progress': return 'sky';
    case 'pending': return 'gray';
    default: return 'gray';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return Check;
    case 'in-progress': return Play;
    case 'pending': return Clock;
    default: return Clock;
  }
};

const StudentExercises = () => {
  const [selectedDay, setSelectedDay] = useState('saturday');
  const [activeExercise, setActiveExercise] = useState<number | null>(null);

  const completedExercises = todayExercises.filter(ex => ex.completed).length;
  const totalExercises = todayExercises.length;
  const progressPercentage = (completedExercises / totalExercises) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-gradient-to-l from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-l from-emerald-600 to-sky-600 bg-clip-text text-transparent mb-2">
              حرکات تمرینی
            </h1>
            <p className="text-lg text-muted-foreground">
              برنامه تمرینی و حرکات اختصاص‌داده‌شده
            </p>
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-emerald-600">
              {toPersianNumbers(completedExercises.toString())}/{toPersianNumbers(totalExercises.toString())}
            </div>
            <p className="text-sm text-muted-foreground">تمرین امروز</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>پیشرفت امروز</span>
            <span>{toPersianNumbers(Math.round(progressPercentage).toString())}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("85")}%
                </p>
                <p className="text-sm text-muted-foreground">تکمیل هفتگی</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("45")}
                </p>
                <p className="text-sm text-muted-foreground">دقیقه متوسط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers("12")}
                </p>
                <p className="text-sm text-muted-foreground">رکورد شکسته</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            برنامه هفتگی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => (
              <Button
                key={day.id}
                variant={selectedDay === day.id ? "default" : "outline"}
                onClick={() => setSelectedDay(day.id)}
                className={`h-20 flex flex-col gap-2 ${
                  selectedDay === day.id 
                    ? 'bg-gradient-to-br from-emerald-500 to-sky-500 text-white' 
                    : ''
                }`}
              >
                <span className="text-sm font-medium">{day.name}</span>
                <Badge variant={day.exercises > 0 ? "secondary" : "outline"} className="text-xs">
                  {toPersianNumbers(day.exercises.toString())} تمرین
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Exercises */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Dumbbell className="h-4 w-4 text-white" />
              </div>
              تمرینات امروز
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              {toPersianNumbers(todayExercises.length.toString())} تمرین
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayExercises.map((exercise, index) => {
              const StatusIcon = getStatusIcon(exercise.status);
              const isActive = activeExercise === exercise.id;
              
              return (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${getStatusColor(exercise.status)}-500 to-${getStatusColor(exercise.status)}-600 flex items-center justify-center shadow-lg`}>
                        <StatusIcon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {exercise.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{toPersianNumbers(exercise.sets.toString())} ست</span>
                          <span>{toPersianNumbers(exercise.reps.toString())} تکرار</span>
                          {exercise.weight > 0 && (
                            <span>{toPersianNumbers(exercise.weight.toString())} کیلو</span>
                          )}
                          <span>{toPersianNumbers(exercise.duration.toString())} دقیقه</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {exercise.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {exercise.status === 'completed' ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <Check className="w-3 h-3 ml-1" />
                          تکمیل شده
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setActiveExercise(isActive ? null : exercise.id)}
                          className={
                            isActive 
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-gradient-to-l from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white'
                          }
                        >
                          {isActive ? (
                            <>
                              <Pause className="w-4 h-4 ml-2" />
                              توقف
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 ml-2" />
                              شروع
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          ست فعلی: {toPersianNumbers("2")} از {toPersianNumbers(exercise.sets.toString())}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <RotateCcw className="w-4 h-4 ml-2" />
                            تکرار ست
                          </Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            <Check className="w-4 h-4 ml-2" />
                            تکمیل ست
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentExercises;
