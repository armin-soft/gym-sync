
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dumbbell, Calendar, Target, Timer, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';

const PERSIAN_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
];

const StudentExercisesPage = () => {
  const { studentId } = useParams();
  const { currentStudentProgram } = useStudentPrograms(Number(studentId));
  const [selectedDay, setSelectedDay] = useState('شنبه');
  const [exercises, setExercises] = useState<any[]>([]);

  // Load exercises data
  useEffect(() => {
    try {
      const savedExercises = localStorage.getItem('exercises');
      if (savedExercises) {
        const parsedExercises = JSON.parse(savedExercises);
        setExercises(Array.isArray(parsedExercises) ? parsedExercises : []);
      }
    } catch (error) {
      console.error('Error loading exercises:', error);
      setExercises([]);
    }
  }, []);

  const getExercisesForDay = (day: string) => {
    if (!currentStudentProgram) return [];
    
    return currentStudentProgram.exercises
      .filter((ex: any) => ex.day === day)
      .map((ex: any) => {
        const exerciseInfo = exercises.find(e => e.id === ex.id);
        return {
          ...ex,
          ...exerciseInfo
        };
      });
  };

  const dayExercises = getExercisesForDay(selectedDay);
  const totalExercises = currentStudentProgram?.exercises?.length || 0;
  const completedDays = PERSIAN_DAYS.filter(day => getExercisesForDay(day).length > 0).length;

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-violet-800 dark:text-violet-200 mb-2">
              برنامه تمرینی من
            </h1>
            <p className="text-violet-600 dark:text-violet-400">
              برنامه تمرینی اختصاصی تعیین شده توسط مربی
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Dumbbell className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">کل تمرینات</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{toPersianNumbers(totalExercises)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">روزهای فعال</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{toPersianNumbers(completedDays)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">پیشرفت</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{toPersianNumbers(Math.round((completedDays / 7) * 100))}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-white/50 dark:bg-gray-800/50">
              {PERSIAN_DAYS.map((day) => {
                const dayExerciseCount = getExercisesForDay(day).length;
                return (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className={cn(
                      "relative text-xs px-2 py-3",
                      dayExerciseCount > 0 && "font-bold"
                    )}
                  >
                    <div className="text-center">
                      <div>{day}</div>
                      {dayExerciseCount > 0 && (
                        <Badge variant="secondary" className="mt-1 text-[10px] px-1">
                          {toPersianNumbers(dayExerciseCount)}
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {PERSIAN_DAYS.map((day) => (
              <TabsContent key={day} value={day} className="mt-6">
                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-violet-800 dark:text-violet-200">
                      <Dumbbell className="h-5 w-5" />
                      تمرینات {day}
                      {getExercisesForDay(day).length > 0 && (
                        <Badge variant="outline">
                          {toPersianNumbers(getExercisesForDay(day).length)} تمرین
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {getExercisesForDay(day).length > 0 ? (
                        <div className="space-y-4">
                          {getExercisesForDay(day).map((exercise: any, index: number) => (
                            <motion.div
                              key={`${exercise.id}-${index}`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-violet-200 dark:border-violet-700">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
                                        {toPersianNumbers(index + 1)}. {exercise.name}
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                          <Timer className="h-4 w-4 text-violet-600" />
                                          <span className="text-gray-600 dark:text-gray-300">
                                            ست‌ها: <span className="font-medium">{toPersianNumbers(exercise.sets)}</span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <TrendingUp className="h-4 w-4 text-violet-600" />
                                          <span className="text-gray-600 dark:text-gray-300">
                                            تکرار: <span className="font-medium">{exercise.reps}</span>
                                          </span>
                                        </div>
                                      </div>
                                      {exercise.description && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                          {exercise.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Dumbbell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                            برای {day} تمرینی تعیین نشده
                          </h3>
                          <p className="text-gray-400 dark:text-gray-500">
                            مربی شما هنوز برای این روز تمرینی تعیین نکرده است
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default StudentExercisesPage;
