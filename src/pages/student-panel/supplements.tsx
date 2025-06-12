
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pill, Heart, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { toPersianNumbers } from '@/lib/utils/numbers';

const StudentSupplementsPage = () => {
  const { studentId } = useParams();
  const { currentStudentProgram } = useStudentPrograms(Number(studentId));
  const [supplements, setSupplements] = useState<any[]>([]);

  // Load supplements data
  useEffect(() => {
    try {
      const savedSupplements = localStorage.getItem('supplements');
      if (savedSupplements) {
        const parsedSupplements = JSON.parse(savedSupplements);
        setSupplements(Array.isArray(parsedSupplements) ? parsedSupplements : []);
      }
    } catch (error) {
      console.error('Error loading supplements:', error);
      setSupplements([]);
    }
  }, []);

  const getAssignedSupplements = () => {
    if (!currentStudentProgram) return [];
    
    return currentStudentProgram.supplements
      .map((suppId: number) => {
        const supplementInfo = supplements.find(s => s.id === suppId);
        return supplementInfo;
      })
      .filter(Boolean);
  };

  const getAssignedVitamins = () => {
    if (!currentStudentProgram) return [];
    
    return currentStudentProgram.vitamins
      .map((vitId: number) => {
        const vitaminInfo = supplements.find(s => s.id === vitId);
        return vitaminInfo;
      })
      .filter(Boolean);
  };

  const assignedSupplements = getAssignedSupplements();
  const assignedVitamins = getAssignedVitamins();
  const totalItems = assignedSupplements.length + assignedVitamins.length;

  return (
    <PageContainer fullHeight className="bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-pink-950 dark:via-gray-900 dark:to-purple-950">
      <div className="container mx-auto p-4 h-full" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-pink-800 dark:text-pink-200 mb-2">
              مکمل‌ها و ویتامین‌های من
            </h1>
            <p className="text-pink-600 dark:text-pink-400">
              مکمل‌ها و ویتامین‌های تعیین شده توسط مربی
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Pill className="h-5 w-5 text-pink-600" />
                  <span className="font-medium text-pink-800 dark:text-pink-200">مکمل‌ها</span>
                </div>
                <p className="text-2xl font-bold text-pink-600">{toPersianNumbers(assignedSupplements.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">ویتامین‌ها</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{toPersianNumbers(assignedVitamins.length)}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium text-indigo-800 dark:text-indigo-200">کل آیتم‌ها</span>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{toPersianNumbers(totalItems)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="supplements" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-gray-800/50">
              <TabsTrigger value="supplements" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                مکمل‌ها
                {assignedSupplements.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {toPersianNumbers(assignedSupplements.length)}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="vitamins" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                ویتامین‌ها
                {assignedVitamins.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {toPersianNumbers(assignedVitamins.length)}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="supplements" className="mt-6">
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-pink-800 dark:text-pink-200">
                    <Pill className="h-5 w-5" />
                    مکمل‌های تعیین شده
                    {assignedSupplements.length > 0 && (
                      <Badge variant="outline">
                        {toPersianNumbers(assignedSupplements.length)} مکمل
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {assignedSupplements.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignedSupplements.map((supplement: any, index: number) => (
                          <motion.div
                            key={supplement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-700 hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                                    <Pill className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-pink-800 dark:text-pink-200">
                                      {supplement.name}
                                    </h4>
                                    {supplement.category && (
                                      <Badge variant="secondary" className="text-xs">
                                        {supplement.category}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                {supplement.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {supplement.description}
                                  </p>
                                )}
                                {supplement.dosage && (
                                  <div className="mt-2 p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                                    <p className="text-xs text-pink-700 dark:text-pink-300">
                                      <strong>دوز مصرف:</strong> {supplement.dosage}
                                    </p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Pill className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                          هیچ مکملی تعیین نشده
                        </h3>
                        <p className="text-gray-400 dark:text-gray-500">
                          مربی شما هنوز مکملی برای شما تعیین نکرده است
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitamins" className="mt-6">
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                    <Heart className="h-5 w-5" />
                    ویتامین‌های تعیین شده
                    {assignedVitamins.length > 0 && (
                      <Badge variant="outline">
                        {toPersianNumbers(assignedVitamins.length)} ویتامین
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {assignedVitamins.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {assignedVitamins.map((vitamin: any, index: number) => (
                          <motion.div
                            key={vitamin.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                                    <Heart className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-purple-800 dark:text-purple-200">
                                      {vitamin.name}
                                    </h4>
                                    {vitamin.category && (
                                      <Badge variant="secondary" className="text-xs">
                                        {vitamin.category}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                {vitamin.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {vitamin.description}
                                  </p>
                                )}
                                {vitamin.dosage && (
                                  <div className="mt-2 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <p className="text-xs text-purple-700 dark:text-purple-300">
                                      <strong>دوز مصرف:</strong> {vitamin.dosage}
                                    </p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                          هیچ ویتامینی تعیین نشده
                        </h3>
                        <p className="text-gray-400 dark:text-gray-500">
                          مربی شما هنوز ویتامینی برای شما تعیین نکرده است
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default StudentSupplementsPage;
