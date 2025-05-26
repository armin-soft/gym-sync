
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { History } from "lucide-react";

// Import new modern components
import { ModernStudentsHeader } from "@/components/students/modern/ModernStudentsHeader";
import { ModernStudentsGrid } from "@/components/students/modern/ModernStudentsGrid";
import { ModernSearchAndFilters } from "@/components/students/modern/ModernSearchAndFilters";

// Import existing components and hooks
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";
import { useStudentRefresh } from "@/hooks/useStudentRefresh"; 
import { useStudentEvents } from "./students/hooks/useStudentEvents";
import { useStudentHistory } from "@/hooks/useStudentHistory";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const deviceInfo = useDeviceInfo();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  // Check if profile is complete on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('trainerProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setIsProfileComplete(Boolean(profile.name && profile.gymName && profile.phone));
      } catch (error) {
        console.error('Error checking profile completeness:', error);
        setIsProfileComplete(false);
      }
    }
  }, []);
  
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
  
  const { refreshTrigger, triggerRefresh, lastRefresh } = useStudentRefresh();
  const { addHistoryEntry } = useStudentHistory();

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
    sortField,
    sortOrder,
    toggleSort,
    handleClearSearch
  } = useStudentFiltering(students);

  // Handler for opening the program manager
  const handleOpenProgramManager = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  // Calculate statistics
  const activeStudents = students.filter(s => s.status === "active").length;
  const newStudentsThisWeek = students.filter(s => {
    if (!s.startDate) return false;
    const studentDate = new Date(s.startDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return studentDate >= weekAgo;
  }).length;

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
        {/* Header with history link */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <ModernStudentsHeader 
              totalStudents={students.length}
              activeStudents={activeStudents}
              newStudentsThisWeek={newStudentsThisWeek}
              onAddStudent={() => dialogManagerRef.current?.handleAdd()}
              onRefresh={triggerRefresh}
            />
          </div>
          
          <Link to="/student-history">
            <Button variant="outline" className="flex items-center gap-2 mt-4">
              <History className="h-4 w-4" />
              <span>تاریخچه</span>
            </Button>
          </Link>
        </div>
        
        <div className="w-full flex-1 flex flex-col">
          {/* Search and Filters */}
          <ModernSearchAndFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={toggleSort}
            onClearSearch={handleClearSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalResults={sortedAndFilteredStudents.length}
          />
          
          {/* Students Grid */}
          <div className="flex-1 overflow-auto">
            <ModernStudentsGrid 
              students={sortedAndFilteredStudents}
              searchQuery={searchQuery}
              onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
              onDelete={handleDeleteWithHistory}
              onAddExercise={handleOpenProgramManager}
              onAddDiet={handleOpenProgramManager}
              onAddSupplement={handleOpenProgramManager}
              onAddStudent={() => dialogManagerRef.current?.handleAdd()}
              onClearSearch={handleClearSearch}
              isProfileComplete={isProfileComplete}
            />
          </div>
        </div>

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
