
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentsTable } from "@/components/students/StudentsTable";
import { StudentHistory } from "@/components/students/StudentHistory";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { UserRound, History, FilterX, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const {
    students,
    exercises,
    meals,
    supplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    generateMockData
  } = useStudents();
  
  const { historyEntries, addHistoryEntry } = useStudentHistory();

  // Check if data is empty and show a notification
  useEffect(() => {
    const isEmpty = 
      (exercises.length === 0 || supplements.length === 0 || meals.length === 0) && 
      localStorage.getItem('dataNotificationShown') !== 'true';
    
    if (isEmpty) {
      toast({
        title: "داده‌های نمایشی وجود ندارد",
        description: "برای نمایش بهتر برنامه می‌توانید داده‌های نمایشی را ایجاد کنید.",
        duration: 7000,
      });
      localStorage.setItem('dataNotificationShown', 'true');
    }
  }, [exercises.length, supplements.length, meals.length, toast]);

  // Refresh when localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Refresh after save
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // Simulate a storage event to refresh other tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);

  // Enhanced save handlers with history tracking
  const handleSaveWithHistory = useCallback((data: any, selectedStudent?: Student) => {
    const result = handleSave(data, selectedStudent);
    
    if (result) {
      if (selectedStudent) {
        addHistoryEntry(
          {...selectedStudent, ...data}, 
          'edit', 
          `اطلاعات ${data.name || selectedStudent.name} به‌روزرسانی شد`
        );
      } else {
        addHistoryEntry(
          {...data, id: Date.now()}, 
          'edit', 
          `شاگرد جدید ${data.name} اضافه شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSave, addHistoryEntry, triggerRefresh]);

  const handleSaveExercisesWithHistory = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    const result = handleSaveExercises(exerciseIds, studentId, dayNumber);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const dayText = dayNumber ? ` برای روز ${dayNumber}` : '';
        addHistoryEntry(
          student, 
          'exercise',
          `برنامه تمرینی${dayText} برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveExercises, students, addHistoryEntry, triggerRefresh]);

  const handleSaveDietWithHistory = useCallback((mealIds: number[], studentId: number) => {
    const result = handleSaveDiet(mealIds, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry(
          student, 
          'diet',
          `برنامه غذایی برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveDiet, students, addHistoryEntry, triggerRefresh]);

  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const result = handleSaveSupplements(data, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry(
          student, 
          'supplement',
          `برنامه مکمل و ویتامین برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveSupplements, students, addHistoryEntry, triggerRefresh]);
  
  const handleDeleteWithHistory = useCallback((studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      addHistoryEntry(
        student, 
        'edit',
        `شاگرد ${student.name} حذف شد`
      );
    }
    
    handleDelete(studentId);
    triggerRefresh();
  }, [handleDelete, students, addHistoryEntry, triggerRefresh]);

  const {
    searchQuery,
    setSearchQuery,
    sortOrder,
    sortField,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);

  return (
    <PageContainer withBackground className="w-full h-full min-h-screen overflow-auto">
      <div className="w-full h-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
        
        {(exercises.length === 0 || supplements.length === 0 || meals.length === 0) && (
          <div className="mb-6">
            <Card className="backdrop-blur-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/30 p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">داده‌های نمایشی</h3>
                <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mt-1">
                  برای مشاهده بهتر قابلیت‌های برنامه، می‌توانید داده‌های نمایشی را ایجاد کنید.
                </p>
              </div>
              <Button 
                variant="default"
                className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                onClick={generateMockData}
              >
                <Database className="h-4 w-4" />
                ایجاد داده‌های نمایشی
              </Button>
            </Card>
          </div>
        )}
        
        <StudentStatsCards students={students} />
        
        <Tabs defaultValue="all" className="w-full mt-6 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <TabsList className="h-12 p-1">
              <TabsTrigger value="all" className="gap-2 h-10 px-6">
                <UserRound className="h-4 w-4" />
                همه شاگردان
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2 h-10 px-6">
                <History className="h-4 w-4" />
                تاریخچه
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              {searchQuery && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleClearSearch}
                  className="h-10 w-10 flex-shrink-0"
                >
                  <FilterX className="h-4 w-4" />
                </Button>
              )}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full md:w-80"
              >
                <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 p-1">
                  <div className="relative">
                    <StudentSearch 
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  </div>
                </Card>
              </motion.div>
              
              <StudentsViewToggle 
                viewMode={viewMode} 
                onChange={setViewMode} 
              />
            </div>
          </div>
          
          <TabsContent value="all" className="flex-1 flex flex-col w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 flex-1 w-full"
              >
                <StudentsTable 
                  students={students}
                  sortedAndFilteredStudents={sortedAndFilteredStudents}
                  searchQuery={searchQuery}
                  refreshTrigger={refreshTrigger}
                  onEdit={(student: Student) => dialogManagerRef.current?.handleEdit(student)}
                  onDelete={handleDeleteWithHistory}
                  onAddExercise={(student: Student) => dialogManagerRef.current?.handleAddExercise(student)}
                  onAddDiet={(student: Student) => dialogManagerRef.current?.handleAddDiet(student)}
                  onAddSupplement={(student: Student) => dialogManagerRef.current?.handleAddSupplement(student)}
                  onDownload={(student: Student) => dialogManagerRef.current?.handleDownload(student)}
                  onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                  onClearSearch={handleClearSearch}
                  viewMode={viewMode}
                />
              </motion.div>
            </AnimatePresence>
          </TabsContent>
          
          <TabsContent value="history" className="flex-1">
            <StudentHistory 
              students={students} 
              historyEntries={historyEntries} 
            />
          </TabsContent>
        </Tabs>

        <StudentDialogManager
          ref={dialogManagerRef}
          onSave={handleSaveWithHistory}
          onSaveExercises={handleSaveExercisesWithHistory}
          onSaveDiet={handleSaveDietWithHistory}
          onSaveSupplements={handleSaveSupplementsWithHistory}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      </div>
    </PageContainer>
  );
};

export default StudentsPage;
