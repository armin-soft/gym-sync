
import { useState, useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useStudents } from "@/hooks/students";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentEvents } from "./useStudentEvents";
import { useStudentRefresh } from "./useStudentRefresh";

export const useStudentPageState = () => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  
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
  const { refreshTrigger, triggerRefresh } = useStudentRefresh();

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
  const handleOpenProgramManager = useCallback((student: Student) => {
    setSelectedStudentForProgram(student);
  }, []);
  
  // Handler for closing the program manager
  const handleCloseProgramManager = useCallback(() => {
    setSelectedStudentForProgram(null);
  }, []);
  
  return {
    // State
    viewMode,
    setViewMode,
    selectedStudentForProgram,
    refreshTrigger,
    
    // Data
    students,
    exercises, 
    meals,
    supplements,
    historyEntries,
    sortedAndFilteredStudents,
    
    // Search/Filter
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    
    // Program manager handlers
    handleOpenProgramManager,
    handleCloseProgramManager,
    
    // CRUD handlers with history
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  };
};
