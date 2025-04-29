
import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { StudentTabs } from "./StudentTabs";
import { StudentDialogManager, StudentDialogManagerRef } from "@/components/students/StudentDialogManager";
import { useStudents } from "@/hooks/students"; 
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { useDeviceInfo } from "@/hooks/use-mobile";

const StudentsPage = () => {
  const dialogManagerRef = useRef<StudentDialogManagerRef>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const deviceInfo = useDeviceInfo();
  
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

  // Refresh when localStorage changes
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'students') {
        setRefreshTrigger(prev => prev + 1);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Refresh after save
  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
    // Simulate a storage event to refresh other tabs
    window.dispatchEvent(new StorageEvent('storage', { key: 'students' }));
  }, []);

  // Enhanced save handlers with history tracking
  const handleSaveWithHistory = useCallback((data: any, selectedStudent?: Student) => {
    const result = handleSave(data, selectedStudent);
    
    if (result) {
      if (selectedStudent) {
        addHistoryEntry(
          {...selectedStudent, ...data}, 
          'edit', 
          `اطلاعات ${data.name || selectedStudent.name} به‌روزرسانی شد`
        );
      } else {
        addHistoryEntry(
          {...data, id: Date.now()}, 
          'edit', 
          `شاگرد جدید ${data.name} اضافه شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSave, addHistoryEntry, triggerRefresh]);

  const handleSaveExercisesWithHistory = useCallback((exerciseIds: number[], studentId: number, dayNumber?: number) => {
    const result = handleSaveExercises(exerciseIds, studentId, dayNumber);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const dayText = dayNumber ? ` برای روز ${dayNumber}` : '';
        addHistoryEntry(
          student, 
          'exercise',
          `برنامه تمرینی${dayText} برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveExercises, students, addHistoryEntry, triggerRefresh]);

  const handleSaveDietWithHistory = useCallback((mealIds: number[], studentId: number) => {
    const result = handleSaveDiet(mealIds, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry(
          student, 
          'diet',
          `برنامه غذایی برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveDiet, students, addHistoryEntry, triggerRefresh]);

  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[]}, studentId: number) => {
    const result = handleSaveSupplements(data, studentId);
    
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry(
          student, 
          'supplement',
          `برنامه مکمل و ویتامین برای ${student.name} بروزرسانی شد`
        );
      }
      
      triggerRefresh();
    }
    
    return result;
  }, [handleSaveSupplements, students, addHistoryEntry, triggerRefresh]);
  
  const handleDeleteWithHistory = useCallback((studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      addHistoryEntry(
        student, 
        'edit',
        `شاگرد ${student.name} حذف شد`
      );
    }
    
    handleDelete(studentId);
    triggerRefresh();
  }, [handleDelete, students, addHistoryEntry, triggerRefresh]);

  // Determine the appropriate classes based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-2";
    if (deviceInfo.isTablet) return "px-4";
    return "px-4 sm:px-6 lg:px-8";
  };

  return (
    <PageContainer withBackground fullHeight className="w-full overflow-hidden">
      <div className={`w-full h-full flex flex-col mx-auto ${getContentPadding()} py-3 sm:py-4 md:py-6`}>
        <StudentsHeader onAddStudent={() => dialogManagerRef.current?.handleAdd()} />
        
        <StudentStatsCards students={students} />
        
        <StudentTabs 
          students={students}
          historyEntries={historyEntries}
          refreshTrigger={refreshTrigger}
          onEdit={(student: Student) => dialogManagerRef.current?.handleEdit(student)}
          onDelete={handleDeleteWithHistory}
          onAddExercise={(student: Student) => dialogManagerRef.current?.handleAddExercise(student)}
          onAddDiet={(student: Student) => dialogManagerRef.current?.handleAddDiet(student)}
          onAddSupplement={(student: Student) => dialogManagerRef.current?.handleAddSupplement(student)}
          onDownload={(student: Student) => dialogManagerRef.current?.handleDownload(student)}
          onAddStudent={() => dialogManagerRef.current?.handleAdd()}
        />

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
