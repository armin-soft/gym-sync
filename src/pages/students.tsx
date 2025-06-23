
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { History } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";
import { Button } from "@/components/ui/button";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { useStudents } from "@/hooks/students";
import { useStudentHistory } from "@/hooks/useStudentHistory";
import { Student } from "@/components/students/StudentTypes";

// Import new components
import { StudentManagementHeader } from "@/components/student-management/StudentManagementHeader";
import { StudentFilters } from "@/components/student-management/StudentFilters";
import { StudentGrid } from "@/components/student-management/StudentGrid";
import { StudentFormDialog } from "@/components/student-management/StudentFormDialog";

// Import existing program manager
import StudentProgramManagerView from "./students/components/program/StudentProgramManagerView";

const StudentsPage = () => {
  const deviceInfo = useDeviceInfo();
  const { addHistoryEntry } = useStudentHistory();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'male' | 'female' | 'active'>('all');
  const [selectedStudentForProgram, setSelectedStudentForProgram] = useState<Student | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

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

  // Filter and search students
  const filteredStudents = useMemo(() => {
    let filtered = students;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(student =>
        (student.name || '').toLowerCase().includes(query) ||
        (student.phone || '').toLowerCase().includes(query)
      );
    }

    // Apply gender/status filter
    switch (activeFilter) {
      case 'male':
        filtered = filtered.filter(student => student.gender === 'male');
        break;
      case 'female':
        filtered = filtered.filter(student => student.gender === 'female');
        break;
      case 'active':
        // Consider students with recent activity as active
        filtered = filtered.filter(student => 
          student.exercises?.length > 0 || 
          student.meals?.length > 0 || 
          student.supplements?.length > 0
        );
        break;
    }

    return filtered;
  }, [students, searchQuery, activeFilter]);

  // Calculate student counts
  const studentCounts = useMemo(() => ({
    total: students.length,
    male: students.filter(s => s.gender === 'male').length,
    female: students.filter(s => s.gender === 'female').length,
    active: students.filter(s => 
      s.exercises?.length > 0 || 
      s.meals?.length > 0 || 
      s.supplements?.length > 0
    ).length,
  }), [students]);

  // Enhanced handlers with history tracking
  const handleSaveWithHistory = (studentData: Student) => {
    const isEdit = !!editingStudent;
    const result = handleSave(studentData, editingStudent);
    
    if (result) {
      addHistoryEntry({
        studentId: studentData.id,
        studentName: studentData.name || 'نامشخص',
        action: isEdit ? 'edited' : 'added',
        changes: isEdit ? 
          `ویرایش اطلاعات ${studentData.name}` : 
          `افزودن شاگرد جدید: ${studentData.name}`,
        timestamp: new Date().toISOString()
      });
      
      setIsFormDialogOpen(false);
      setEditingStudent(undefined);
    }
    
    return result;
  };

  const handleDeleteWithHistory = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    const result = handleDelete(studentId);
    
    if (result && student) {
      addHistoryEntry({
        studentId: student.id,
        studentName: student.name || 'نامشخص',
        action: 'deleted',
        changes: `حذف شاگرد: ${student.name}`,
        timestamp: new Date().toISOString()
      });
    }
    
    return result;
  };

  const handleAddStudent = () => {
    setEditingStudent(undefined);
    setIsFormDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormDialogOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    console.log('View student details:', student);
    // TODO: Implement student details view
  };

  const handleManageProgram = (student: Student) => {
    setSelectedStudentForProgram(student);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    
    // Simulate refresh delay
    setTimeout(() => {
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent('studentsUpdated'));
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Enhanced program manager handlers
  const handleSaveExercisesWithHistory = (exercisesData: any[], studentId: number, dayNumber?: number) => {
    const result = handleSaveExercises(exercisesData, studentId, dayNumber);
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry({
          studentId: student.id,
          studentName: student.name || 'نامشخص',
          action: 'program_updated',
          changes: `بروزرسانی برنامه تمرینی ${student.name}`,
          timestamp: new Date().toISOString()
        });
      }
    }
    return result;
  };

  const handleSaveDietWithHistory = (mealIds: number[], studentId: number, dayNumber?: number) => {
    const result = handleSaveDiet(mealIds, studentId, dayNumber);
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry({
          studentId: student.id,
          studentName: student.name || 'نامشخص',
          action: 'diet_updated',
          changes: `بروزرسانی برنامه غذایی ${student.name}`,
          timestamp: new Date().toISOString()
        });
      }
    }
    return result;
  };

  const handleSaveSupplementsWithHistory = (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    const result = handleSaveSupplements(data, studentId);
    if (result) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        addHistoryEntry({
          studentId: student.id,
          studentName: student.name || 'نامشخص',
          action: 'supplements_updated',
          changes: `بروزرسانی مکمل‌ها ${student.name}`,
          timestamp: new Date().toISOString()
        });
      }
    }
    return result;
  };

  // Determine padding based on device type
  const getContentPadding = () => {
    if (deviceInfo.isMobile) return "px-4 py-4";
    if (deviceInfo.isTablet) return "px-6 py-6";
    return "px-8 py-8";
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
    <PageContainer withBackground fullHeight className="min-h-screen">
      <div className={`w-full min-h-screen ${getContentPadding()}`}>
        
        {/* Header with History Link */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <StudentManagementHeader
              totalStudents={studentCounts.total}
              activeStudents={studentCounts.active}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddStudent={handleAddStudent}
              onRefresh={handleRefresh}
              lastRefresh={lastRefresh}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mr-4"
          >
            <Link to="/Management/Student-History">
              <Button 
                variant="outline" 
                className="gap-2 student-gradient-accent hover:opacity-90 text-white border-0 shadow-lg rounded-xl px-6 py-3"
              >
                <History className="h-5 w-5" />
                <span>تاریخچه</span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Filters */}
        <StudentFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          studentCounts={studentCounts}
        />

        {/* Students Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StudentGrid
              students={filteredStudents}
              searchQuery={searchQuery}
              onAddStudent={handleAddStudent}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteWithHistory}
              onViewStudent={handleViewStudent}
              onManageProgram={handleManageProgram}
              onClearSearch={handleClearSearch}
              isLoading={isLoading}
            />
          </motion.div>
        </AnimatePresence>

        {/* Student Form Dialog */}
        <StudentFormDialog
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
          student={editingStudent}
          onSave={handleSaveWithHistory}
        />
      </div>
    </PageContainer>
  );
};

export default StudentsPage;
