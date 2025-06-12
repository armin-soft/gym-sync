import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pill, Calendar, Star, Check, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { cn } from '@/lib/utils';
import { useDataRefresh } from '@/hooks/useDataRefresh';
import { getLocalStorageItem } from '@/utils/localStorage';

const PERSIAN_DAYS = [
  'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
];

const StudentSupplementsPage = () => {
  const { studentId } = useParams();
  const { currentStudentProgram } = useStudentPrograms(Number(studentId));
  const [selectedDay, setSelectedDay] = useState('شنبه');
  const [supplements, setSupplements] = useState<any[]>([]);
  const [vitamins, setVitamins] = useState<any[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh data
  const { refreshData } = useDataRefresh({
    keys: ['supplements', 'students'],
    interval: 10000, // Refresh every 10 seconds
    onStorageChange: true
  });

  // Load supplements and vitamins data with auto-refresh
  useEffect(() => {
    const loadSupplementsAndVitamins = () => {
      try {
        const savedSupplements = getLocalStorageItem('supplements', []);
        const savedVitamins = getLocalStorageItem('vitamins', []);

        setSupplements(Array.isArray(savedSupplements) ? savedSupplements : []);
        setVitamins(Array.isArray(savedVitamins) ? savedVitamins : []);
        setLastRefresh(new Date());
        console.log('Supplements and Vitamins loaded:', savedSupplements.length, savedVitamins.length);
      } catch (error) {
        console.error('Error loading supplements and vitamins:', error);
        setSupplements([]);
        setVitamins([]);
      }
    };

    loadSupplementsAndVitamins();

    // Listen for data changes
    const handleDataChange = () => {
      loadSupplementsAndVitamins();
    };

    window.addEventListener('dataChanged', handleDataChange);
    return () => window.removeEventListener('dataChanged', handleDataChange);
  }, []);

  const getSupplementsForDay = (day: string) => {
    if (!currentStudentProgram) return [];

    const { supplements: supplementIds, vitamins: vitaminIds } = currentStudentProgram;

    const supplementsList = supplements.filter(s => supplementIds.includes(s.id));
    const vitaminsList = vitamins.filter(v => vitaminIds.includes(v.id));

    return [...supplementsList, ...vitaminsList];
  };

  const daySupplements = getSupplementsForDay(selectedDay);
  const { supplements: totalSupplements, vitamins: totalVitamins } = currentStudentProgram || { supplements: [], vitamins: [] };
  const totalItems = (totalSupplements?.length || 0) + (totalVitamins?.length || 0);
  const completedDays = PERSIAN_DAYS.filter(day => getSupplementsForDay(day).length > 0).length;

  const handleManualRefresh = () => {
    refreshData();
    setLastRefresh(new Date());
  };

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-orange-950 dark:via-gray-900 dark:to-pink-950">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header with refresh */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                برنامه مکمل و ویتامین من
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
              برنامه مکمل و ویتامین اختصاصی تعیین شده توسط مربی
            </p>
            <p className="text-xs text-gray-500 mt-1">
              آخرین به‌روزرسانی: {toPersianNumbers(lastRefresh.toLocaleTimeString('fa-IR'))}
            </p>
          </div>

          {/* Stats Cards with theme colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Pill className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800 dark:text-orange-200">کل مکمل‌ها</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{toPersianNumbers(totalItems)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-pink-600" />
                  <span className="font-medium text-pink-800 dark:text-pink-200">روزهای فعال</span>
                </div>
                <p className="text-2xl font-bold text-pink-600">{toPersianNumbers(completedDays)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800 dark:text-red-200">تکمیل برنامه</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{toPersianNumbers(Math.round((completedDays / 7) * 100))}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-white/50 dark:bg-gray-800/50">
              {PERSIAN_DAYS.map((day) => {
                const daySupplementCount = getSupplementsForDay(day).length;
                return (
                  <TabsTrigger
                    key={day}
                    value={day}
                    className={cn(
                      "relative text-xs px-2 py-3",
                      daySupplementCount > 0 && "font-bold"
                    )}
                  >
                    <div className="text-center">
                      <div>{day}</div>
                      {daySupplementCount > 0 && (
                        <Badge variant="secondary" className="mt-1 text-[10px] px-1 bg-pink-100 text-pink-700">
                          {toPersianNumbers(daySupplementCount)}
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
                    <CardTitle className="flex items-center gap-2 text-pink-800 dark:text-pink-200">
                      <Pill className="h-5 w-5" />
                      مکمل‌ها و ویتامین‌ها {day}
                      {getSupplementsForDay(day).length > 0 && (
                        <Badge variant="outline" className="border-pink-300 text-pink-700">
                          {toPersianNumbers(getSupplementsForDay(day).length)} مورد
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      {getSupplementsForDay(day).length > 0 ? (
                        <div className="space-y-4">
                          {getSupplementsForDay(day).map((item: any, index: number) => (
                            <motion.div
                              key={`${item.id}-${index}`}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-pink-200 dark:border-pink-700">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
                                        {toPersianNumbers(index + 1)}. {item.name}
                                      </h4>
                                      <div className="grid grid-cols-1 gap-2 text-sm">
                                        <div className="flex items-center gap-2">
                                          <span className="text-gray-600 dark:text-gray-300">
                                            نوع: <span className="font-medium text-pink-600">{item.type}</span>
                                          </span>
                                        </div>
                                      </div>
                                      {item.description && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                          {item.description}
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
                          <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                            برای {day} مکملی تعیین نشده
                          </h3>
                          <p className="text-gray-400 dark:text-gray-500">
                            مربی شما هنوز برای این روز مکملی تعیین نکرده است
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

export default StudentSupplementsPage;
