
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentsTable } from "@/components/students/StudentsTable";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; // Updated import path
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { UserRound, History, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  
  const {
    students,
    exercises,
    meals,
    supplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudents();

  // Refresh when localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
        console.log('Storage event detected, triggering refresh');
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

  // Wrapper functions to refresh after save
  const handleSaveExercisesWithRefresh = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    const result = handleSaveExercises(exerciseIds, studentId, dayNumber);
    if (result) {
      console.log(`Exercise saved for day ${dayNumber}, triggering refresh`);
      triggerRefresh();
    }
    return result;
  }, [handleSaveExercises, triggerRefresh]);

  const handleSaveDietWithRefresh = useCallback((mealIds: number[], studentId: number) => {
    const result = handleSaveDiet(mealIds, studentId);
    if (result) {
      console.log('Diet saved, triggering refresh');
      triggerRefresh();
    }
    return result;
  }, [handleSaveDiet, triggerRefresh]);

  const handleSaveSupplementsWithRefresh = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const result = handleSaveSupplements(data, studentId);
    if (result) {
      console.log('Supplements saved, triggering refresh');
      triggerRefresh();
    }
    return result;
  }, [handleSaveSupplements, triggerRefresh]);

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
          
          <TabsContent value="all" className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 flex-1"
              >
                <StudentsTable 
                  students={students}
                  sortedAndFilteredStudents={sortedAndFilteredStudents}
                  searchQuery={searchQuery}
                  refreshTrigger={refreshTrigger}
                  onEdit={(student: Student) => dialogManagerRef.current?.handleEdit(student)}
                  onDelete={handleDelete}
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
            <Card className="backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 p-8 rounded-3xl h-full">
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <History className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">تاریخچه شاگردان</h3>
                <p className="text-muted-foreground max-w-md">
                  این بخش در آینده فعال خواهد شد و شما می‌توانید تاریخچه تمام شاگردان و فعالیت‌های آنها را مشاهده کنید.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <StudentDialogManager
          ref={dialogManagerRef}
          onSave={handleSave}
          onSaveExercises={handleSaveExercisesWithRefresh}
          onSaveDiet={handleSaveDietWithRefresh}
          onSaveSupplements={handleSaveSupplementsWithRefresh}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      </div>
    </PageContainer>
  );
};

export default StudentsPage;
