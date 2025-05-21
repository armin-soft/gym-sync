
import React from "react";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentSearchSort } from "@/components/students/StudentSearchSort";
import { StudentsViewToggle } from "@/components/students/StudentsViewToggle";
import { ProfileWarning } from "@/components/students/ProfileWarning";
import { StudentStatsCards } from "@/components/students/StudentStatsCards";
import { Student } from "@/components/students/StudentTypes";

interface StudentsHeaderSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: string;
  sortOrder: "asc" | "desc";
  toggleSort: (field: string) => void;
  viewMode: "table" | "grid";
  setViewMode: (mode: "table" | "grid") => void;
  isProfileComplete: boolean;
  students: Student[];
  onAddStudent: () => void;
}

export const StudentsHeaderSection: React.FC<StudentsHeaderSectionProps> = ({
  searchQuery,
  setSearchQuery,
  sortField,
  sortOrder,
  toggleSort,
  viewMode,
  setViewMode,
  isProfileComplete,
  students,
  onAddStudent
}) => {
  return (
    <>
      <StudentsHeader onAddStudent={onAddStudent} />
      
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
    </>
  );
};
