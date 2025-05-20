
import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { useStudentPageState } from "./hooks/useStudentPageState";
import ProgramManagerView from "./components/views/ProgramManagerView";
import MainContent from "./components/layout/MainContent";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useShamsiDate } from "@/hooks/useShamsiDate";

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

  const { dateInfo, isLoading } = useShamsiDate();

  // If loading date information or no students loaded yet, show loading screen
  if (isLoading || (!students && !sortedAndFilteredStudents)) {
    return <LoadingScreen />;
  }

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="persian-numbers"
    >
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
        currentDate={dateInfo?.Shamsi_Date}
        seasonEmoji={dateInfo?.Season_Emoji}
      />
    </motion.div>
  );
};

export default StudentsPage;
