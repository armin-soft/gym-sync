
import React from "react";
import { useStudentPageState } from "./students/hooks/useStudentPageState";
import ProgramManagerView from "./students/components/views/ProgramManagerView";
import MainContent from "./students/components/layout/MainContent";

const StudentsPage = () => {
  const {
    viewMode,
    setViewMode,
    selectedStudentForProgram,
    refreshTrigger,
    students,
    exercises, 
    meals,
    supplements,
    historyEntries,
    sortedAndFilteredStudents,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleOpenProgramManager,
    handleCloseProgramManager,
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  } = useStudentPageState();

  // If a student is selected for program management, show the program manager
  if (selectedStudentForProgram) {
    return (
      <ProgramManagerView 
        selectedStudentForProgram={selectedStudentForProgram}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        onSaveExercisesWithHistory={handleSaveExercisesWithHistory}
        onSaveDietWithHistory={handleSaveDietWithHistory}
        onSaveSupplementsWithHistory={handleSaveSupplementsWithHistory}
        onClose={handleCloseProgramManager}
      />
    );
  }

  return (
    <MainContent 
      students={students}
      historyEntries={historyEntries}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleClearSearch={handleClearSearch}
      viewMode={viewMode}
      setViewMode={setViewMode}
      sortedAndFilteredStudents={sortedAndFilteredStudents}
      refreshTrigger={refreshTrigger}
      handleOpenProgramManager={handleOpenProgramManager}
      handleSaveWithHistory={handleSaveWithHistory}
      handleSaveExercisesWithHistory={handleSaveExercisesWithHistory}
      handleSaveDietWithHistory={handleSaveDietWithHistory}
      handleSaveSupplementsWithHistory={handleSaveSupplementsWithHistory}
      handleDeleteWithHistory={handleDeleteWithHistory}
      exercises={exercises}
      meals={meals}
      supplements={supplements}
    />
  );
};

export default StudentsPage;
