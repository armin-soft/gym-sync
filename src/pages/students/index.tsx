
import { useRef } from "react";
import { motion } from "framer-motion";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { ProfileWarning } from "@/components/students/ProfileWarning";
import { StudentCard } from "@/components/students/StudentCard";
import { StudentTable } from "@/components/students/StudentTable";
import { EmptyStudentState } from "@/components/students/EmptyStudentState";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentDialogManagerWrapper } from "@/components/students/StudentDialogManagerWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/components/students/StudentTypes";

const Students = () => {
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
    handleClearSearch,
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
        {students.length === 0 ? (
          <EmptyStudentState 
            isSearching={searchQuery.length > 0} 
            onAddStudent={handleAddStudent} 
            onClearSearch={() => setSearchQuery("")}
          />
        ) : sortedAndFilteredStudents.length === 0 ? (
          <EmptyStudentState 
            isSearching={true} 
            onAddStudent={handleAddStudent} 
            onClearSearch={() => setSearchQuery("")}
          />
        ) : (
          <div className="pr-2">
            <motion.div 
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedAndFilteredStudents.map(student => (
                    <StudentCard 
                      key={student.id}
                      student={student}
                      onEdit={() => handleEdit(student)}
                      onDelete={() => handleDelete(student.id)}
                      onAddExercise={() => handleAddExercise(student)}
                      onAddDiet={() => handleAddDiet(student)}
                      onAddSupplement={() => handleAddSupplement(student)}
                      isProfileComplete={isProfileComplete}
                    />
                  ))}
                </div>
              ) : (
                <StudentTable 
                  students={sortedAndFilteredStudents}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddExercise={handleAddExercise}
                  onAddDiet={handleAddDiet}
                  onAddSupplement={handleAddSupplement}
                  isProfileComplete={isProfileComplete}
                />
              )}
            </motion.div>
          </div>
        )}
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

export default Students;
