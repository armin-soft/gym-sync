
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentGridView } from "@/components/students/list-views/StudentGridView";
import { StudentTableView } from "@/components/students/list-views/StudentTableView";
import { DataStatusIndicator } from "@/components/students/DataStatusIndicator";
import { Student } from "@/components/students/StudentTypes";

interface MainStudentTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  students: Student[];
  viewMode: "grid" | "table";
  searchQuery: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  selectedStudents: number[];
  onStudentSelect: (studentId: number) => void;
  onStudentSelectAll: () => void;
  onClearSelection: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
  onViewStudentHistory: (student: Student) => void;
  onManageStudentProgram: (student: Student) => void;
  lastRefreshTime: Date;
  onRefresh: () => void;
  onAddStudent: () => void;
  isProfileComplete: boolean;
}

export const MainStudentTabs: React.FC<MainStudentTabsProps> = ({
  activeTab,
  onTabChange,
  students,
  viewMode,
  searchQuery,
  sortBy,
  sortOrder,
  selectedStudents,
  onStudentSelect,
  onStudentSelectAll,
  onClearSelection,
  onEditStudent,
  onDeleteStudent,
  onViewStudentHistory,
  onManageStudentProgram,
  lastRefreshTime,
  onRefresh,
  onAddStudent,
  isProfileComplete
}) => {
  // Filter students based on active tab - using safe property access
  const activeStudents = students.filter(student => !student.archived)
    .filter(student =>
      (student.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.family || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const sortByValue = sortBy === 'name' ? 'name' : 'family';
      const aValue = (a[sortByValue as keyof Student] || '').toString().toLowerCase();
      const bValue = (b[sortByValue as keyof Student] || '').toString().toLowerCase();

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const archivedStudents = students.filter(student => student.archived)
    .filter(student =>
      (student.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.family || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const sortByValue = sortBy === 'name' ? 'name' : 'family';
      const aValue = (a[sortByValue as keyof Student] || '').toString().toLowerCase();
      const bValue = (b[sortByValue as keyof Student] || '').toString().toLowerCase();

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleClearSearch = () => {
    // Clear search functionality
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">شاگردان فعال</TabsTrigger>
            <TabsTrigger value="archived">شاگردان آرشیو شده</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mr-4">
          <DataStatusIndicator 
            lastRefreshTime={lastRefreshTime}
            onRefresh={onRefresh}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
        <TabsContent value="active" className="flex-1 mt-0">
          {viewMode === "grid" ? (
            <StudentGridView
              students={activeStudents}
              searchQuery={searchQuery}
              onEdit={onEditStudent}
              onDelete={(id: number) => {
                const student = activeStudents.find(s => s.id === id);
                if (student) onDeleteStudent(student);
              }}
              onAddExercise={onManageStudentProgram}
              onAddDiet={onManageStudentProgram}
              onAddSupplement={onManageStudentProgram}
              onAddStudent={onAddStudent}
              onClearSearch={handleClearSearch}
              isProfileComplete={isProfileComplete}
            />
          ) : (
            <StudentTableView
              students={activeStudents}
              sortedAndFilteredStudents={activeStudents}
              searchQuery={searchQuery}
              isProfileComplete={isProfileComplete}
              onEdit={onEditStudent}
              onDelete={(id: number) => {
                const student = activeStudents.find(s => s.id === id);
                if (student) onDeleteStudent(student);
              }}
              onAddExercise={onManageStudentProgram}
              onAddDiet={onManageStudentProgram}
              onAddSupplement={onManageStudentProgram}
              onAddStudent={onAddStudent}
              onClearSearch={handleClearSearch}
              viewMode="table"
            />
          )}
        </TabsContent>
        
        <TabsContent value="archived" className="flex-1 mt-0">
          {viewMode === "grid" ? (
            <StudentGridView
              students={archivedStudents}
              searchQuery={searchQuery}
              onEdit={onEditStudent}
              onDelete={(id: number) => {
                const student = archivedStudents.find(s => s.id === id);
                if (student) onDeleteStudent(student);
              }}
              onAddExercise={onManageStudentProgram}
              onAddDiet={onManageStudentProgram}
              onAddSupplement={onManageStudentProgram}
              onAddStudent={onAddStudent}
              onClearSearch={handleClearSearch}
              isProfileComplete={isProfileComplete}
            />
          ) : (
            <StudentTableView
              students={archivedStudents}
              sortedAndFilteredStudents={archivedStudents}
              searchQuery={searchQuery}
              isProfileComplete={isProfileComplete}
              onEdit={onEditStudent}
              onDelete={(id: number) => {
                const student = archivedStudents.find(s => s.id === id);
                if (student) onDeleteStudent(student);
              }}
              onAddExercise={onManageStudentProgram}
              onAddDiet={onManageStudentProgram}
              onAddSupplement={onManageStudentProgram}
              onAddStudent={onAddStudent}
              onClearSearch={handleClearSearch}
              viewMode="table"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
