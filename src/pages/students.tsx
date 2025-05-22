import React, { useRef, useState } from "react";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentHistory } from "@/components/students/StudentHistory";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDeviceInfo } from "@/hooks/use-mobile";

// Import from the correct paths
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";
import StudentTabControls from "./students/components/StudentTabControls";
import StudentSearchControls from "./students/components/StudentSearchControls";
// Import from the list-views folder instead of local components
import { StudentTableView } from "@/components/students/list-views";
import { useStudentRefresh } from "./students/hooks/useStudentRefresh";
import { useStudentEvents } from "./students/hooks/useStudentEvents";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
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
  const { refreshTrigger, triggerRefresh, lastRefresh } = useStudentRefresh();

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

  const {
    searchQuery,
    setSearchQuery,
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
      <StudentProgramManagerView 
        student={selectedStudentForProgram}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        onSaveExercises={handleSaveExercisesWithHistory}
        onSaveDiet={handleSaveDietWithHistory}
        onSaveSupplements={handleSaveSupplementsWithHistory}
        onClose={() => setSelectedStudentForProgram(null)}
      />
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <StudentsHeader 
          onAddStudent={() => dialogManagerRef.current?.handleAdd()} 
          onRefresh={triggerRefresh}
          lastRefreshTime={lastRefresh}
        />
        
        <StudentStatsCards students={students} />
        
        <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
            <StudentTabControls />

            <StudentSearchControls 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
          
          <StudentTableView 
            students={students}
            sortedAndFilteredStudents={sortedAndFilteredStudents}
            searchQuery={searchQuery}
            refreshTrigger={refreshTrigger}
            onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
            onDelete={handleDeleteWithHistory}
            onAddExercise={handleOpenProgramManager}
            onAddDiet={handleOpenProgramManager}
            onAddSupplement={handleOpenProgramManager}
            onDownload={(student) => {}}
            onAddStudent={() => dialogManagerRef.current?.handleAdd()}
            onClearSearch={handleClearSearch}
            viewMode={viewMode}
            isProfileComplete={isProfileComplete}
          />
          
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
