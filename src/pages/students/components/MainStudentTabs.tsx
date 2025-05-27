import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentGridView } from "@/components/students/list-views/StudentGridView";
import { StudentTableView } from "@/components/students/list-views/StudentTableView";
import { DataStatusIndicator } from "@/components/students/DataStatusIndicator";
import { Student } from "@/types/student";

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
  onRefresh
}) => {
  // Filter students based on active tab
  const activeStudents = students.filter(student => !student.archived)
    .filter(student =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const sortByValue = sortBy === 'firstName' ? 'firstName' : 'lastName';
      const aValue = a[sortByValue].toLowerCase();
      const bValue = b[sortByValue].toLowerCase();

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
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const sortByValue = sortBy === 'firstName' ? 'firstName' : 'lastName';
      const aValue = a[sortByValue].toLowerCase();
      const bValue = b[sortByValue].toLowerCase();

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

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
              selectedStudents={selectedStudents}
              onStudentSelect={onStudentSelect}
              onStudentSelectAll={onStudentSelectAll}
              onClearSelection={onClearSelection}
              onEditStudent={onEditStudent}
              onDeleteStudent={onDeleteStudent}
              onViewStudentHistory={onViewStudentHistory}
              onManageStudentProgram={onManageStudentProgram}
            />
          ) : (
            <StudentTableView
              students={activeStudents}
              selectedStudents={selectedStudents}
              onStudentSelect={onStudentSelect}
              onStudentSelectAll={onStudentSelectAll}
              onClearSelection={onClearSelection}
              onEditStudent={onEditStudent}
              onDeleteStudent={onDeleteStudent}
              onViewStudentHistory={onViewStudentHistory}
              onManageStudentProgram={onManageStudentProgram}
            />
          )}
        </TabsContent>
        
        <TabsContent value="archived" className="flex-1 mt-0">
          {viewMode === "grid" ? (
            <StudentGridView
              students={archivedStudents}
              selectedStudents={selectedStudents}
              onStudentSelect={onStudentSelect}
              onStudentSelectAll={onStudentSelectAll}
              onClearSelection={onClearSelection}
              onEditStudent={onEditStudent}
              onDeleteStudent={onDeleteStudent}
              onViewStudentHistory={onViewStudentHistory}
              onManageStudentProgram={onManageStudentProgram}
            />
          ) : (
            <StudentTableView
              students={archivedStudents}
              selectedStudents={selectedStudents}
              onStudentSelect={onStudentSelect}
              onStudentSelectAll={onStudentSelectAll}
              onClearSelection={onClearSelection}
              onEditStudent={onEditStudent}
              onDeleteStudent={onDeleteStudent}
              onViewStudentHistory={onViewStudentHistory}
              onManageStudentProgram={onManageStudentProgram}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
