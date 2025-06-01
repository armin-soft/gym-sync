
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useStudentRefresh } from "@/hooks/useStudentRefresh"; 
import { useStudentEvents } from "./students/hooks/useStudentEvents";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { motion, AnimatePresence } from "framer-motion";

// Import modern components
import { ModernStudentsHeader } from "@/components/students/modern/ModernStudentsHeader";
import { ModernSearchBar } from "@/components/students/modern/ModernSearchBar";
import { ModernGenderTabs } from "@/components/students/modern/ModernGenderTabs";
import { ModernStudentCard } from "@/components/students/modern/ModernStudentCard";
import { ModernEmptyState } from "@/components/students/modern/ModernEmptyState";

// Import from the correct paths
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const [activeGenderTab, setActiveGenderTab] = useState<string>("all");
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

  // Filter students by gender
  const filteredStudentsByGender = React.useMemo(() => {
    let filtered = sortedAndFilteredStudents;
    
    if (activeGenderTab === "male") {
      filtered = filtered.filter(student => student.gender === "male");
    } else if (activeGenderTab === "female") {
      filtered = filtered.filter(student => student.gender === "female");
    }
    
    return filtered;
  }, [sortedAndFilteredStudents, activeGenderTab]);

  // Handler for opening the program manager
  const handleOpenProgramManager = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  // Count students by gender
  const maleStudentsCount = students.filter(s => s.gender === "male").length;
  const femaleStudentsCount = students.filter(s => s.gender === "female").length;

  // Handler for viewing history
  const handleViewHistory = () => {
    // This would navigate to history page - can be implemented later
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
    <PageContainer 
      withBackground 
      fullHeight 
      className="w-full overflow-hidden bg-gradient-to-bl from-gray-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/10"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        
        {/* Header */}
        <ModernStudentsHeader
          students={students}
          onAddStudent={() => dialogManagerRef.current?.handleAdd()}
          onRefresh={triggerRefresh}
          onViewHistory={handleViewHistory}
        />
        
        {/* Search Bar */}
        <ModernSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
        />
        
        {/* Gender Tabs */}
        <ModernGenderTabs
          activeTab={activeGenderTab}
          onTabChange={setActiveGenderTab}
          totalCount={students.length}
          maleCount={maleStudentsCount}
          femaleCount={femaleStudentsCount}
        />
        
        {/* Students Grid */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {filteredStudentsByGender.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ModernEmptyState
                  searchQuery={searchQuery}
                  onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                  onClearSearch={searchQuery ? handleClearSearch : undefined}
                />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6"
              >
                {filteredStudentsByGender.map((student, index) => (
                  <ModernStudentCard
                    key={student.id}
                    student={student}
                    onEdit={() => dialogManagerRef.current?.handleEdit(student)}
                    onDelete={() => handleDeleteWithHistory(student.id)}
                    onAddProgram={() => handleOpenProgramManager(student)}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dialog Manager */}
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
      </motion.div>
    </PageContainer>
  );
};

export default StudentsPage;
