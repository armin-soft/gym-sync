
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { StudentsList } from "./StudentsList";
import { StudentHistoryTab } from "./StudentHistoryTab";
import { StudentsDialogSection } from "./StudentsDialogSection";
import { StudentsHeaderSection } from "./StudentsHeaderSection";
import { StudentsTabs } from "./StudentsTabs";
import { useStudentsContainer } from "../hooks/useStudentsContainer";

const StudentsContainer = () => {
  const {
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
  } = useStudentsContainer();

  return (
    <div className="container px-0 md:px-4 flex flex-col h-[calc(100vh-4rem)]">
      <StudentsHeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortField={sortField}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isProfileComplete={isProfileComplete}
        students={students}
        onAddStudent={handleAddStudent}
      />
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <StudentsTabs />
        
        <div className="flex-1 mt-4">
          <TabsContent value="all" className="flex-1 mt-0">
            <StudentsList 
              students={sortedAndFilteredStudents}
              searchQuery={searchQuery}
              viewMode={viewMode}
              isProfileComplete={isProfileComplete}
              onAddStudent={handleAddStudent}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddExercise={handleAddExercise}
              onAddDiet={handleAddDiet}
              onAddSupplement={handleAddSupplement}
              onClearSearch={handleClearSearch}
              onDownload={handleDownload}
            />
          </TabsContent>
          
          <TabsContent value="history" className="flex-1 h-full mt-0">
            <StudentHistoryTab 
              students={students} 
              historyEntries={historyEntries}
              onClearHistory={clearHistory}
            />
          </TabsContent>
        </div>
      </Tabs>
      
      <StudentsDialogSection
        dialogRef={dialogRef}
        onSave={handleSave}
        onSaveExercises={handleSaveExercises}
        onSaveDiet={handleSaveDiet}
        onSaveSupplements={handleSaveSupplements}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        students={students}
        addHistoryEntry={(student, type, description) => {
          // Create a proper HistoryEntry object and pass it to addHistoryEntry
          const entry = {
            id: Date.now(),
            timestamp: Date.now(),
            studentId: student.id,
            studentName: student.name,
            studentImage: student.picture,
            action: type,
            details: description,
            type: type as 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete',
            description: description
          };
          addHistoryEntry(entry);
        }}
      />
    </div>
  );
};

export default StudentsContainer;
