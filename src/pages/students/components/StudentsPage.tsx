
import React, { useRef, useEffect } from "react";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Import our refactored components and hooks
import MainStudentTabs from "./MainStudentTabs";
import StudentProgramManagerView from "./program/StudentProgramManagerView";
import { useStudentRefresh } from "../hooks/useStudentRefresh";
import { useStudentEvents } from "../hooks/useStudentEvents";
import { useStudentProgram } from "../hooks/useStudentProgram";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const deviceInfo = useDeviceInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Main data and operations
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
    refreshData
  } = useStudents();
  
  // Custom hooks
  const { historyEntries, addHistoryEntry } = useStudentHistory();
  const { refreshTrigger, triggerRefresh, lastRefresh } = useStudentRefresh();
  const { selectedStudentForProgram, handleOpenProgramManager, handleCloseProgramManager } = useStudentProgram();

  // Initial data loading effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  // Effect to refresh data based on the refresh trigger
  useEffect(() => {
    if (refreshTrigger > 0) {
      console.log('Refreshing student data due to trigger change');
      refreshData();
      
      // Show toast only on automatic refreshes (not initial load)
      if (refreshTrigger > 1) {
        toast({
          title: "به‌روزرسانی",
          description: "داده‌های شاگردان با موفقیت به‌روزرسانی شدند",
          duration: 3000,
        });
      }
    }
  }, [refreshTrigger, refreshData, toast]);

  // Student events with history tracking
  const {
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  } = useStudentEvents(
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    handleDelete,
    addHistoryEntry,
    triggerRefresh,
    students,
    selectedStudentForProgram
  );

  // Filtering and search
  const {
    searchQuery,
    setSearchQuery,
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);

  // Helper function to get appropriate padding based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  // Manual refresh handler for user-triggered refreshes
  const handleManualRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      triggerRefresh();
      setIsLoading(false);
    }, 500);
  };

  // If a student is selected for program management, show the program manager
  if (selectedStudentForProgram) {
    return (
      <StudentProgramManagerView 
        student={selectedStudentForProgram}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        onSaveExercises={handleSaveExercisesWithHistory}
        onSaveDiet={handleSaveDietWithHistory}
        onSaveSupplements={handleSaveSupplementsWithHistory}
        onClose={handleCloseProgramManager}
      />
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <StudentsHeader 
          onAddStudent={() => dialogManagerRef.current?.handleAdd()} 
          onRefresh={handleManualRefresh}
          lastRefreshTime={lastRefresh}
        />
        
        <StudentStatsCards students={students} />
        
        <MainStudentTabs
          students={students}
          sortedAndFilteredStudents={sortedAndFilteredStudents}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClearSearch={handleClearSearch}
          viewMode={viewMode}
          setViewMode={setViewMode}
          refreshTrigger={refreshTrigger}
          historyEntries={historyEntries}
          isLoading={isLoading}
          onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
          onDelete={handleDeleteWithHistory}
          onAddExercise={handleOpenProgramManager}
          onAddDiet={handleOpenProgramManager}
          onAddSupplement={handleOpenProgramManager}
          onDownload={(student) => dialogManagerRef.current?.handleDownload?.(student)}
          onAddStudent={() => dialogManagerRef.current?.handleAdd()}
        />

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
