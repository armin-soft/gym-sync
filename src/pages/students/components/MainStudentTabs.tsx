
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Student } from "@/components/students/StudentTypes";
import { StudentHistory } from "@/components/students/StudentHistory";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import StudentTabControls from "./StudentTabControls";
import StudentSearchControls from "./StudentSearchControls";
import StudentTableView from "./StudentTableView";

interface MainStudentTabsProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
  refreshTrigger: number;
  historyEntries: HistoryEntry[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
}

const MainStudentTabs: React.FC<MainStudentTabsProps> = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  viewMode,
  setViewMode,
  refreshTrigger,
  historyEntries,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent
}) => {
  return (
    <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
        <StudentTabControls />

        <StudentSearchControls 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClearSearch={handleClearSearch}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
      
      <TabsContent value="all" className="flex-1 flex flex-col w-full mt-0">
        <StudentTableView 
          viewMode={viewMode}
          sortedAndFilteredStudents={sortedAndFilteredStudents}
          students={students}
          searchQuery={searchQuery}
          refreshTrigger={refreshTrigger}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddExercise={onAddExercise}
          onAddDiet={onAddDiet}
          onAddSupplement={onAddSupplement}
          onDownload={onDownload}
          onAddStudent={onAddStudent}
          onClearSearch={handleClearSearch}
        />
      </TabsContent>
      
      <TabsContent value="history" className="flex-1">
        <StudentHistory 
          students={students} 
          historyEntries={historyEntries} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default MainStudentTabs;
