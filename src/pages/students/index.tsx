import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentsTable } from "@/components/students/StudentsTable";
import { StudentHistory } from "@/components/students/StudentHistory";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { useStudentManagement } from "@/hooks/students/useStudentManagement";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";
import { StudentSearch } from "@/components/students/search-sort/StudentSearch";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { UserRound, History, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);

  const {
    students,
    exercises,
    meals,
    supplements
  } = useStudents();

  const { historyEntries } = useStudentHistory();

  const {
    handleSave,
    handleDelete,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudentManagement(triggerRefresh);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const {
    searchQuery,
    setSearchQuery,
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
            </div>
          </div>
          
          <TabsContent value="all" className="flex-1 flex flex-col w-full">
            <AnimatePresence mode="wait">
              <motion.div
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
                  onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
                  onDelete={handleDelete}
                  onAddExercise={(student) => dialogManagerRef.current?.handleAddExercise(student)}
                  onAddDiet={(student) => dialogManagerRef.current?.handleAddDiet(student)}
                  onAddSupplement={(student) => dialogManagerRef.current?.handleAddSupplement(student)}
                  onDownload={(student) => dialogManagerRef.current?.handleDownload(student)}
                  onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                  onClearSearch={handleClearSearch}
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
          onSave={handleSave}
          onSaveExercises={handleSaveExercises}
          onSaveDiet={handleSaveDiet}
          onSaveSupplements={handleSaveSupplements}
          exercises={exercises}
          meals={meals}
          supplements={supplements}
        />
      </div>
    </PageContainer>
  );
};

export default StudentsPage;
