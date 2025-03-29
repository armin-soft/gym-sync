
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsTable } from "@/components/students/StudentsTable";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/useStudents";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Grid3X3, Table as TableIcon } from "lucide-react";

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

  // تازه‌سازی هنگام تغییر localStorage
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

  // تازه‌سازی بعد از ذخیره
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // شبیه‌سازی یک رویداد ذخیره‌سازی برای تازه‌سازی در سایر تب‌ها
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);

  // توابع پوشش‌دهنده برای تازه‌سازی بعد از ذخیره
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
  } = useStudentFiltering(students, exercises);

  return (
    <PageContainer withBackground>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
        
        <StudentStatsCards students={students} />
        
        <StudentSearchSort 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300"
        >
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-gray-200/70 dark:border-gray-800/70 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
              <TabsList className="bg-gray-100/70 dark:bg-gray-800/70 p-1 rounded-lg">
                <TabsTrigger 
                  value="all" 
                  className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-md px-4 py-2 transition-all"
                >
                  همه شاگردان
                </TabsTrigger>
                <TabsTrigger 
                  value="active" 
                  className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-md px-4 py-2 transition-all"
                >
                  پرداخت شده
                </TabsTrigger>
                <TabsTrigger 
                  value="inactive" 
                  className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 rounded-md px-4 py-2 transition-all"
                >
                  بدون پرداخت
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="bg-gray-100/70 dark:bg-gray-800/70 p-1 rounded-lg flex">
                  <button 
                    onClick={() => setViewMode("table")} 
                    className={`p-2 rounded-md transition-all ${viewMode === "table" ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
                  >
                    <TableIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode("grid")} 
                    className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <TabsContent value="all" className="p-0 focus-visible:outline-none focus-visible:ring-0">
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
            </TabsContent>
            
            <TabsContent value="active" className="p-0 focus-visible:outline-none focus-visible:ring-0">
              <StudentsTable 
                students={students}
                sortedAndFilteredStudents={sortedAndFilteredStudents.filter((student) => student.payment && student.payment !== '')}
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
            </TabsContent>
            
            <TabsContent value="inactive" className="p-0 focus-visible:outline-none focus-visible:ring-0">
              <StudentsTable 
                students={students}
                sortedAndFilteredStudents={sortedAndFilteredStudents.filter((student) => !student.payment || student.payment === '')}
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
            </TabsContent>
          </Tabs>
        </motion.div>

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
