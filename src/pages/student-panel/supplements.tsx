
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pill, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentPrograms } from '@/hooks/useStudentPrograms';
import { toPersianNumbers } from '@/lib/utils/numbers';
import { SupplementStatsCards } from './components/SupplementStatsCards';
import { SupplementCard } from './components/SupplementCard';
import { EmptySupplementState } from './components/EmptySupplementState';

const StudentSupplementsPage = () => {
  const { studentId } = useParams();
  const { currentStudentProgram } = useStudentPrograms(Number(studentId));
  const [supplements, setSupplements] = useState<any[]>([]);

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
      .map((suppId: number) => supplements.find(s => s.id === suppId))
      .filter(Boolean);
  };

  const getAssignedVitamins = () => {
    if (!currentStudentProgram) return [];
    
    return currentStudentProgram.vitamins
      .map((vitId: number) => supplements.find(s => s.id === vitId))
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
          <SupplementStatsCards
            supplementCount={assignedSupplements.length}
            vitaminCount={assignedVitamins.length}
            totalCount={totalItems}
          />

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
                          <SupplementCard
                            key={supplement.id}
                            supplement={supplement}
                            index={index}
                            type="supplement"
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptySupplementState type="supplement" />
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
                          <SupplementCard
                            key={vitamin.id}
                            supplement={vitamin}
                            index={index}
                            type="vitamin"
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptySupplementState type="vitamin" />
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
