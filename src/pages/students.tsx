
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StudentHeader } from "@/components/students/modern/StudentHeader";
import { StudentStats } from "@/components/students/modern/StudentStats";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/modern/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import from the correct paths
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";
// Import from the list-views folder instead of local components
import { StudentTableView } from "@/components/students/modern/StudentTableView";
import { useStudentRefresh } from "@/hooks/useStudentRefresh"; 
import { useStudentEvents } from "./students/hooks/useStudentEvents";
import { useStudentHistory } from "@/hooks/useStudentHistory";

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

  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  // Count students by gender
  const maleStudentsCount = students.filter(s => s.gender === "male").length;
  const femaleStudentsCount = students.filter(s => s.gender === "female").length;

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
          <StudentHeader 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddStudent={() => dialogManagerRef.current?.handleAdd()} 
            onRefresh={triggerRefresh}
          />
          
          <Link to="/Management/Student-History">
            <Button variant="outline" className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white border-0 hover:from-emerald-600 hover:to-sky-600">
              <History className="h-4 w-4" />
              <span>تاریخچه</span>
            </Button>
          </Link>
        </div>
        
        <StudentStats students={students} />
        
        <div className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
          {/* Gender Tabs */}
          <Tabs value={activeGenderTab} onValueChange={setActiveGenderTab} className="w-full mb-4">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-500 data-[state=active]:text-white">همه ({students.length})</TabsTrigger>
              <TabsTrigger value="male" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-500 data-[state=active]:text-white">آقایان ({maleStudentsCount})</TabsTrigger>
              <TabsTrigger value="female" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-500 data-[state=active]:text-white">بانوان ({femaleStudentsCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
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
                onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                onClearSearch={handleClearSearch}
                viewMode="table"
                isProfileComplete={isProfileComplete}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={toggleSort}
              />
            </TabsContent>
            
            <TabsContent value="male" className="mt-4">
              <StudentTableView 
                students={students}
                sortedAndFilteredStudents={filteredStudentsByGender}
                searchQuery={searchQuery}
                refreshTrigger={refreshTrigger}
                onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
                onDelete={handleDeleteWithHistory}
                onAddExercise={handleOpenProgramManager}
                onAddDiet={handleOpenProgramManager}
                onAddSupplement={handleOpenProgramManager}
                onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                onClearSearch={handleClearSearch}
                viewMode="table"
                isProfileComplete={isProfileComplete}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={toggleSort}
              />
            </TabsContent>
            
            <TabsContent value="female" className="mt-4">
              <StudentTableView 
                students={students}
                sortedAndFilteredStudents={filteredStudentsByGender}
                searchQuery={searchQuery}
                refreshTrigger={refreshTrigger}
                onEdit={(student) => dialogManagerRef.current?.handleEdit(student)}
                onDelete={handleDeleteWithHistory}
                onAddExercise={handleOpenProgramManager}
                onAddDiet={handleOpenProgramManager}
                onAddSupplement={handleOpenProgramManager}
                onAddStudent={() => dialogManagerRef.current?.handleAdd()}
                onClearSearch={handleClearSearch}
                viewMode="table"
                isProfileComplete={isProfileComplete}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={toggleSort}
              />
            </TabsContent>
          </Tabs>
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
