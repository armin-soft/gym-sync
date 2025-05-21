
import { useRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useStudents } from "@/hooks/useStudents";
import { useStudentHistory, HistoryEntry } from "@/hooks/useStudentHistory";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";

export const useStudentsContainer = () => {
  const {
    sortedAndFilteredStudents,
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    viewMode,
    setViewMode,
    isProfileComplete,
    students,
    exercises,
    meals,
    supplements,
    handleSave,
    handleDelete,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    handleClearSearch
  } = useStudents();
  
  const { historyEntries, addHistoryEntry, clearHistory } = useStudentHistory();
  
  const dialogRef = useRef<any>(null);

  const handleAddStudent = () => {
    if (dialogRef.current) {
      dialogRef.current.handleAdd();
    }
  };

  const handleEdit = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleEdit(student);
    }
  };

  const handleAddExercise = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleAddExercise(student);
    }
  };

  const handleAddDiet = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleAddDiet(student);
    }
  };

  const handleAddSupplement = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleAddSupplement(student);
    }
  };

  const handleDownload = (student: Student) => {
    if (dialogRef.current) {
      dialogRef.current.handleDownload(student);
    }
  };

  return {
    // Student data
    students,
    sortedAndFilteredStudents,
    exercises,
    meals,
    supplements,
    
    // Search & filters
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    handleClearSearch,
    
    // View state
    viewMode,
    setViewMode,
    isProfileComplete,
    
    // Dialog handlers
    dialogRef,
    handleAddStudent,
    handleEdit,
    handleAddExercise,
    handleAddDiet,
    handleAddSupplement,
    handleDownload,
    
    // CRUD operations
    handleSave,
    handleDelete,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    
    // History
    historyEntries,
    addHistoryEntry,
    clearHistory
  };
};
