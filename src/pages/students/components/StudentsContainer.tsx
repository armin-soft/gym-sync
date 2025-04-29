
import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Student } from "@/components/students/StudentTypes";
import { useStudents } from "@/hooks/useStudents";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { ProfileWarning } from "@/components/students/ProfileWarning";
import { StudentsList } from "./StudentsList";
import { StudentDialogManagerWrapper } from "@/components/students/StudentDialogManagerWrapper";

const StudentsContainer = () => {
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
  } = useStudents();
  
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

  return (
    <div className="container px-0 md:px-4 flex flex-col h-[calc(100vh-4rem)]">
      <StudentsHeader onAddStudent={handleAddStudent} />
      
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <StudentSearchSort 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortField={sortField}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
          />
        </div>
        <div>
          <StudentsViewToggle viewMode={viewMode} onChange={setViewMode} />
        </div>
      </div>
      
      {!isProfileComplete && (
        <ProfileWarning 
          isProfileComplete={isProfileComplete}
          className="mb-6"
        />
      )}
      
      <StudentStatsCards students={students} />
      
      <ScrollArea className="flex-1 w-full mt-8">
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
          onClearSearch={() => setSearchQuery("")}
        />
      </ScrollArea>
      
      <StudentDialogManagerWrapper
        ref={dialogRef}
        onSave={handleSave}
        onSaveExercises={handleSaveExercises}
        onSaveDiet={handleSaveDiet}
        onSaveSupplements={handleSaveSupplements}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
      />
    </div>
  );
};

export default StudentsContainer;
