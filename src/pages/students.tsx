
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { History } from "lucide-react";

// Import from the correct paths
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";
import StudentSearchControls from "./students/components/StudentSearchControls";
// Import from the list-views folder instead of local components
import { StudentTableView } from "@/components/students/list-views";
import { useStudentRefresh } from "@/hooks/useStudentRefresh"; 
import { useStudentEvents } from "./students/hooks/useStudentEvents";
import { useStudentHistory } from "@/hooks/useStudentHistory";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
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
        <div className="flex justify-between items-center">
          <StudentsHeader 
            onAddStudent={() => dialogManagerRef.current?.handleAdd()} 
            onRefresh={triggerRefresh}
            lastRefreshTime={lastRefresh}
          />
          
          <Link to="/student-history">
            <Button variant="outline" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>تاریخچه</span>
            </Button>
          </Link>
        </div>
        
        <StudentStatsCards students={students} />
        
        <div className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
          <div className="flex justify-end mb-4 md:mb-6">
            <StudentSearchControls 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
            />
          </div>
          
          <StudentTableView 
            students={students}
            sortedAndFilteredStudents={sortedAndFilteredStudents}
            searchQuery={searchQuery}
            refreshTrigger={refreshTrigger}
            onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
            onDelete={handleDeleteWithHistory}
            onAddStudent={() => dialogManagerRef.current?.handleAdd()}
            onClearSearch={handleClearSearch}
            viewMode="table"
            isProfileComplete={isProfileComplete}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={toggleSort}
          />
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
