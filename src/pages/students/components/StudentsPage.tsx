
import React, { useRef } from "react";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/useStudents";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useState } from "react";

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
  
  // Main data and operations
  const {
    students,
    exercises,
    meals,
    supplements,
    sortedAndFilteredStudents,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  } = useStudents();
  
  // Custom hooks
  const { historyEntries, addHistoryEntry } = useStudentHistory();
  const { refreshTrigger, triggerRefresh } = useStudentRefresh();
  const { selectedStudentForProgram, handleOpenProgramManager, handleCloseProgramManager } = useStudentProgram();

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

  // Helper function to get appropriate padding based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
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
    <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
      <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
      
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
  );
};

export default StudentsPage;
