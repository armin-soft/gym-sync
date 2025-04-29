
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { StudentTableHeader } from "./table/StudentTableHeader";
import { StudentTableBody } from "./table/StudentTableBody";
import { StudentTableEmpty } from "./table/StudentTableEmpty";

interface StudentsTableProps {
  students: Student[];
  sortedAndFilteredStudents: Student[];
  searchQuery: string;
  refreshTrigger: number;
  onEdit?: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
  onDownload?: (student: Student) => void;
  onAddStudent: () => void;
  onClearSearch: () => void;
  viewMode: "table" | "grid";
  isProfileComplete: boolean;
}

export const StudentTable: React.FC<StudentsTableProps> = ({
  students,
  sortedAndFilteredStudents,
  searchQuery,
  refreshTrigger,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  onDownload,
  onAddStudent,
  onClearSearch,
  viewMode,
  isProfileComplete
}) => {
  // Define columns for the table
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => <div className="text-center">تصویر</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {/* Cell content will be handled by StudentTableRow */}
        </div>
      ),
      size: 80,
    },
    {
      accessorKey: "name",
      header: () => <div>نام</div>,
      cell: ({ row }) => <div className="font-medium">{/* Cell content handled by row */}</div>,
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">شماره موبایل</div>,
      cell: ({ row }) => <div className="text-center">{/* Cell content handled by row */}</div>,
    },
    {
      accessorKey: "height",
      header: () => <div className="text-center">قد</div>,
      cell: ({ row }) => <div className="text-center">{/* Cell content handled by row */}</div>,
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-center">وزن</div>,
      cell: ({ row }) => <div className="text-center">{/* Cell content handled by row */}</div>,
    },
    {
      accessorKey: "payment",
      header: () => <div className="text-center">مبلغ</div>,
      cell: ({ row }) => <div className="text-center">{/* Cell content handled by row */}</div>,
    },
    {
      accessorKey: "progress",
      header: () => <div className="text-center">تکمیل پروفایل</div>,
      cell: ({ row }) => <div className="text-center">{/* Cell content handled by row */}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-center">اقدامات</div>,
      cell: ({ row }) => <div>{/* Cell content handled by row */}</div>,
    },
  ];

  const table = useReactTable({
    data: sortedAndFilteredStudents,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <StudentTableHeader />
        {table.getRowModel().rows?.length ? (
          <StudentTableBody
            students={sortedAndFilteredStudents}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddExercise={onAddExercise}
            onAddDiet={onAddDiet}
            onAddSupplement={onAddSupplement}
            onDownload={onDownload}
            isProfileComplete={isProfileComplete}
            columns={columns}
          />
        ) : (
          <StudentTableEmpty columnsCount={columns.length} />
        )}
      </Table>
    </div>
  );
};
