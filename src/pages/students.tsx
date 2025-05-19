
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
import { UserRound, History, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { ExerciseWithSets } from "@/types/exercise";
import StudentProgramManager from "@/components/students/program/StudentProgramManager";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const deviceInfo = useDeviceInfo();
  
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
  
  const { historyEntries, addHistoryEntry } = useStudentHistory();

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

  const handleSaveExercisesWithHistory = useCallback((exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => {
    if (!selectedStudentForProgram) return false;
    
    const result = handleSaveExercises(exercisesWithSets, selectedStudentForProgram.id, dayNumber);
    
    if (result) {
      const dayText = dayNumber ? ` برای روز ${dayNumber}` : '';
      addHistoryEntry(
        selectedStudentForProgram, 
        'exercise',
        `برنامه تمرینی${dayText} برای ${selectedStudentForProgram.name} بروزرسانی شد`
      );
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveExercises, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);

  const handleSaveDietWithHistory = useCallback((mealIds: number[]) => {
    if (!selectedStudentForProgram) return false;
    
    const result = handleSaveDiet(mealIds, selectedStudentForProgram.id);
    
    if (result) {
      addHistoryEntry(
        selectedStudentForProgram, 
        'diet',
        `برنامه غذایی برای ${selectedStudentForProgram.name} بروزرسانی شد`
      );
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveDiet, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);

  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[]}) => {
    if (!selectedStudentForProgram) return false;
    
    const result = handleSaveSupplements(data, selectedStudentForProgram.id);
    
    if (result) {
      addHistoryEntry(
        selectedStudentForProgram, 
        'supplement',
        `برنامه مکمل و ویتامین برای ${selectedStudentForProgram.name} بروزرسانی شد`
      );
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveSupplements, selectedStudentForProgram, addHistoryEntry, triggerRefresh]);
  
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

  // Handler for opening the program manager
  const handleOpenProgramManager = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  // If a student is selected for program management, show the program manager
  if (selectedStudentForProgram) {
    return (
      <PageContainer withBackground fullHeight className="w-full overflow-hidden">
        <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
          <StudentProgramManager 
            student={selectedStudentForProgram}
            exercises={exercises}
            meals={meals}
            supplements={supplements}
            onSaveExercises={handleSaveExercisesWithHistory}
            onSaveDiet={handleSaveDietWithHistory}
            onSaveSupplements={handleSaveSupplementsWithHistory}
            onClose={() => setSelectedStudentForProgram(null)}
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
        
        <StudentStatsCards students={students} />
        
        <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
            <TabsList className={`h-10 sm:h-12 p-1 ${deviceInfo.isMobile ? 'w-full' : ''}`}>
              <TabsTrigger value="all" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
                <UserRound className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">همه شاگردان</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2 h-8 sm:h-10 px-3 sm:px-6">
                <History className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-sm sm:text-base">تاریخچه</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
              {searchQuery && (
                <Button 
                  variant="outline" 
                  size={deviceInfo.isMobile ? "sm" : "icon"}
                  onClick={handleClearSearch}
                  className={deviceInfo.isMobile ? "h-8 w-8" : "h-10 w-10 flex-shrink-0"}
                >
                  <FilterX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              )}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`${deviceInfo.isMobile ? 'w-full' : 'w-full md:w-80'}`}
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
          
          <TabsContent value="all" className="flex-1 flex flex-col w-full mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border border-gray-200/70 dark:border-gray-800/70 shadow-lg shadow-gray-200/20 dark:shadow-black/10 overflow-hidden transition-all duration-300 flex-1 w-full"
              >
                <StudentsTable 
                  students={students}
                  sortedAndFilteredStudents={sortedAndFilteredStudents}
                  searchQuery={searchQuery}
                  refreshTrigger={refreshTrigger}
                  onEdit={(student: Student) => dialogManagerRef.current?.handleEdit(student)}
                  onDelete={handleDeleteWithHistory}
                  onAddExercise={handleOpenProgramManager}  // Changed to use our unified program manager
                  onAddDiet={handleOpenProgramManager}      // Changed to use our unified program manager
                  onAddSupplement={handleOpenProgramManager}  // Changed to use our unified program manager
                  onDownload={(student: Student) => {}}     // Removed download functionality as requested
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
