
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Student } from "../StudentTypes";
import { StudentTableRow } from "./StudentTableRow";
import { EmptyStudentState } from "../EmptyStudentState";

interface StudentTableViewProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (studentId: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
}

export const StudentTableView = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onAddStudent,
  onClearSearch,
}: StudentTableViewProps) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  if (sortedAndFilteredStudents.length === 0) {
    return (
      <EmptyStudentState
        isSearching={searchQuery.length > 0}
        onAddStudent={onAddStudent}
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <ScrollArea className="h-[500px] rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>
            <TableHead>نام و نام خانوادگی</TableHead>
            <TableHead>موبایل</TableHead>
            <TableHead>قد</TableHead>
            <TableHead>وزن</TableHead>
            <TableHead>تمرین‌ها</TableHead>
            <TableHead>مکمل‌ها</TableHead>
            <TableHead>برنامه غذایی</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredStudents.map((student, index) => (
            <StudentTableRow
              key={student.id}
              student={student}
              index={index}
              hoveredRowId={hoveredRowId}
              openMenuId={openMenuId}
              isProfileComplete={isProfileComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddExercise={onAddExercise}
              onAddDiet={onAddDiet}
              onAddSupplement={onAddSupplement}
              setHoveredRowId={setHoveredRowId}
              setOpenMenuId={setOpenMenuId}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
