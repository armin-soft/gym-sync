
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Users } from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { StudentHistory } from "@/components/students/StudentHistory";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { StudentTableView } from "@/components/students/list-views";
import StudentSearchControls from "./StudentSearchControls";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DataStatusIndicator } from "@/components/students/DataStatusIndicator";

interface MainStudentTabsProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  viewMode: "table";
  refreshTrigger: number;
  historyEntries: HistoryEntry[];
  isLoading?: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload: (student: Student) => void;
  onAddStudent: () => void;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
  isProfileComplete: boolean;
}

const MainStudentTabs: React.FC<MainStudentTabsProps> = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  viewMode,
  refreshTrigger,
  historyEntries,
  isLoading = false,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  sortField,
  sortOrder,
  onSortChange,
  isProfileComplete = true
}) => {
  return (
    <Tabs defaultValue="all" className="w-full mt-4 md:mt-6 flex-1 flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
        <TabsList className="h-11 w-full md:w-auto">
          <TabsTrigger value="all" className="flex gap-2 items-center">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">لیست شاگردان</span>
            <span className="md:hidden">شاگردان</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex gap-2 items-center">
            <History className="h-4 w-4" />
            <span className="hidden md:inline">تاریخچه تغییرات</span>
            <span className="md:hidden">تاریخچه</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <DataStatusIndicator 
            lastRefreshTime={new Date()} 
            isOnline={navigator.onLine} 
          />
          
          <StudentSearchControls
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleClearSearch={handleClearSearch}
          />
        </div>
      </div>

      <TabsContent value="all" className="flex-1 mt-0">
        {isLoading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <StudentTableView
            viewMode="table"
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
            isProfileComplete={isProfileComplete}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
          />
        )}
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
