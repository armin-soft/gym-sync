import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dumbbell, Calendar, Target, Timer, TrendingUp, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';
import { useDataRefresh } from '@/hooks/useDataRefresh';
import { getLocalStorageItem } from '@/utils/localStorage';

const PERSIAN_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
];

const StudentExercisesPage = () => {
  const { studentId } = useParams();
  const { currentStudentProgram } = useStudentPrograms(Number(studentId));
  const [selectedDay, setSelectedDay] = useState('شنبه');
  const [exercises, setExercises] = useState<any[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh data
  const { refreshData } = useDataRefresh({
    keys: ['exercises', 'students'],
    interval: 10000, // Refresh every 10 seconds
    onStorageChange: true
  });

  // Load exercises data with auto-refresh
  useEffect(() => {
    const loadExercises = () => {
      try {
        const savedExercises = getLocalStorageItem('exercises', []);
        setExercises(Array.isArray(savedExercises) ? savedExercises : []);
        setLastRefresh(new Date());
        console.log('Exercises loaded:', savedExercises.length);
      } catch (error) {
        console.error('Error loading exercises:', error);
        setExercises([]);
      }
    };

    loadExercises();
    
    // Listen for data changes
    const handleDataChange = () => {
      loadExercises();
    };

    window.addEventListener('dataChanged', handleDataChange);
    return () => window.removeEventListener('dataChanged', handleDataChange);
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

  const handleManualRefresh = () => {
    refreshData();
    setLastRefresh(new Date());
  };

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header with refresh */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent">
                برنامه تمرینی من
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                به‌روزرسانی
              </Button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              برنامه تمرینی اختصاصی تعیین شده توسط مربی
            </p>
            <p className="text-xs text-gray-500 mt-1">
              آخرین به‌روزرسانی: {toPersianNumbers(lastRefresh.toLocaleTimeString('fa-IR'))}
            </p>
          </div>

          {/* Stats Cards with theme colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Dumbbell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">کل تمرینات</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{toPersianNumbers(totalExercises)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800 dark:text-orange-200">روزهای فعال</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{toPersianNumbers(completedDays)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">پیشرفت</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{toPersianNumbers(Math.round((completedDays / 7) * 100))}%</p>
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
                        <Badge variant="secondary" className="mt-1 text-[10px] px-1 bg-orange-100 text-orange-700">
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
                    <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <Dumbbell className="h-5 w-5" />
                      تمرینات {day}
                      {getExercisesForDay(day).length > 0 && (
                        <Badge variant="outline" className="border-orange-300 text-orange-700">
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
                              <Card className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-orange-200 dark:border-orange-700">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
                                        {toPersianNumbers(index + 1)}. {exercise.name}
                                      </h4>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                          <Timer className="h-4 w-4 text-orange-600" />
                                          <span className="text-gray-600 dark:text-gray-300">
                                            ست‌ها: <span className="font-medium text-orange-600">{toPersianNumbers(exercise.sets)}</span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <TrendingUp className="h-4 w-4 text-orange-600" />
                                          <span className="text-gray-600 dark:text-gray-300">
                                            تکرار: <span className="font-medium text-orange-600">{exercise.reps}</span>
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
