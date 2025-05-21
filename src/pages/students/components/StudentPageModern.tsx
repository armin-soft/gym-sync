
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { useStudentRefresh } from "../hooks/useStudentRefresh";
import { useStudentFiltering } from "@/hooks/useStudentFiltering";
import { StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";

// Import components
import StudentModernHeader from "./modern/StudentModernHeader";
import StudentModernStats from "./modern/StudentModernStats";
import StudentModernTabs from "./modern/StudentModernTabs";
import StudentModernList from "./modern/StudentModernList";
import StudentModernDialogManager from "./modern/StudentModernDialogManager";
import { StudentModernProgramManager } from "./modern/StudentModernProgramManager";
import { StudentModernSearch } from "./modern/StudentModernSearch";
import { StudentModernFilters } from "./modern/StudentModernFilters";
import { PageContainer } from "@/components/ui/page-container";

const StudentPageModern = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid" | "kanban">("grid");
  const [activeTab, setActiveTab] = useState<"all" | "history" | "analytics">("all");
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const { toast } = useToast();
  
  // Get students data
  const {
    students,
    exercises,
    meals,
    supplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    isProfileComplete,
    loading
  } = useStudents();
  
  // Get history data
  const { historyEntries, addHistoryEntry, clearHistory } = useStudentHistory();
  const { refreshTrigger, triggerRefresh } = useStudentRefresh();
  
  // Filtering and search
  const {
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);

  // Handle actions with history tracking
  const handleSaveWithHistory = (data: any, selectedStudent?: Student) => {
    const success = handleSave(data, selectedStudent);
    if (success) {
      addHistoryEntry({
        type: selectedStudent ? 'edit' : 'add',
        studentName: data.name,
        studentId: selectedStudent?.id || students.length + 1,
        timestamp: Date.now(),
        details: `${selectedStudent ? 'ویرایش' : 'افزودن'} اطلاعات شاگرد ${data.name}`
      });
      triggerRefresh();
      toast({
        title: selectedStudent ? "ویرایش موفق" : "افزودن موفق",
        description: `اطلاعات شاگرد با موفقیت ${selectedStudent ? 'ویرایش' : 'اضافه'} شد.`,
        variant: "default",
      });
    }
    return success;
  };

  const handleDeleteWithHistory = (id: number) => {
    const student = students.find(s => s.id === id);
    if (student) {
      const success = handleDelete(id);
      if (success) {
        addHistoryEntry({
          type: 'delete',
          studentName: student.name,
          studentId: id,
          timestamp: Date.now(),
          details: `حذف شاگرد ${student.name}`
        });
        triggerRefresh();
        toast({
          title: "حذف موفق",
          description: `شاگرد ${student.name} با موفقیت حذف شد.`,
          variant: "default",
        });
      }
      return success;
    }
    return false;
  };

  const handleSaveExercisesWithHistory = (exercisesWithSets: any[], studentId: number, dayNumber?: number) => {
    const student = students.find(s => s.id === studentId);
    const success = handleSaveExercises(exercisesWithSets, studentId, dayNumber);
    
    if (success && student) {
      addHistoryEntry({
        type: 'exercise',
        studentName: student.name,
        studentId: studentId,
        timestamp: Date.now(),
        details: `تنظیم برنامه تمرینی برای ${student.name} ${dayNumber ? `(روز ${toPersianNumbers(dayNumber)})` : ''}`
      });
      triggerRefresh();
      toast({
        title: "تنظیم برنامه موفق",
        description: `برنامه تمرینی با موفقیت برای ${student.name} تنظیم شد.`,
        variant: "default",
      });
    }
    
    return success;
  };

  const handleSaveDietWithHistory = (mealIds: number[], studentId: number) => {
    const student = students.find(s => s.id === studentId);
    const success = handleSaveDiet(mealIds, studentId);
    
    if (success && student) {
      addHistoryEntry({
        type: 'diet',
        studentName: student.name,
        studentId: studentId,
        timestamp: Date.now(),
        details: `تنظیم برنامه غذایی برای ${student.name}`
      });
      triggerRefresh();
      toast({
        title: "تنظیم برنامه موفق",
        description: `برنامه غذایی با موفقیت برای ${student.name} تنظیم شد.`,
        variant: "default",
      });
    }
    
    return success;
  };

  const handleSaveSupplementsWithHistory = (data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const student = students.find(s => s.id === studentId);
    const success = handleSaveSupplements(data, studentId);
    
    if (success && student) {
      addHistoryEntry({
        type: 'supplement',
        studentName: student.name,
        studentId: studentId,
        timestamp: Date.now(),
        details: `تنظیم مکمل و ویتامین برای ${student.name}`
      });
      triggerRefresh();
      toast({
        title: "تنظیم مکمل موفق",
        description: `مکمل و ویتامین با موفقیت برای ${student.name} تنظیم شد.`,
        variant: "default",
      });
    }
    
    return success;
  };

  // Dialog handlers
  const handleAddStudent = () => {
    dialogManagerRef.current?.handleAdd();
  };

  const handleEdit = (student: Student) => {
    dialogManagerRef.current?.handleEdit(student);
  };

  const handleAddExercise = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  const handleAddDiet = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  const handleAddSupplement = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  const handleCloseProgramManager = () => {
    setSelectedStudentForProgram(null);
  };

  const handleDownload = (student: Student) => {
    dialogManagerRef.current?.handleDownload?.(student);
  };

  // If a student is selected for program management, show the program manager
  if (selectedStudentForProgram) {
    return (
      <StudentModernProgramManager
        student={selectedStudentForProgram}
        exercises={exercises}
        meals={meals}
        supplements={supplements}
        onSaveExercises={handleSaveExercisesWithHistory}
        onSaveDiet={handleSaveDietWithHistory}
        onSaveSupplements={handleSaveSupplementsWithHistory}
        onClose={handleCloseProgramManager}
      />
    );
  }

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className="w-full h-full flex flex-col mx-auto px-0 sm:px-4 lg:px-6 py-3 sm:py-4 md:py-6">
        <StudentModernHeader 
          onAddStudent={handleAddStudent} 
          students={students} 
        />
        
        <StudentModernStats 
          students={students}
        />
        
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mt-4 md:mt-6 mb-4">
          <StudentModernTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
            <StudentModernSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleClearSearch={handleClearSearch}
            />
            
            <StudentModernFilters 
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortField={sortField}
              sortOrder={sortOrder}
              toggleSort={toggleSort}
            />
          </div>
        </div>
        
        <StudentModernList
          activeTab={activeTab}
          viewMode={viewMode}
          students={students}
          sortedAndFilteredStudents={sortedAndFilteredStudents}
          searchQuery={searchQuery}
          historyEntries={historyEntries}
          refreshTrigger={refreshTrigger}
          isProfileComplete={isProfileComplete}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteWithHistory}
          onAddExercise={handleAddExercise}
          onAddDiet={handleAddDiet}
          onAddSupplement={handleAddSupplement}
          onDownload={handleDownload}
          onAddStudent={handleAddStudent}
          onClearSearch={handleClearSearch}
          onClearHistory={clearHistory}
        />

        <StudentModernDialogManager
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

export default StudentPageModern;
