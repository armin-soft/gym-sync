
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "@/components/students/StudentTypes";
import { CheckCircle, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { EditStudentButton } from "./EditStudentButton";
import { StudentActions } from "./StudentActions";

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
  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => <div className="text-center">تصویر</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage src={row.original.image} alt={row.original.name} />
            <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        </div>
      ),
      size: 80,
    },
    {
      accessorKey: "name",
      header: () => <div>نام</div>,
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">شماره موبایل</div>,
      cell: ({ row }) => <div className="text-center">{row.original.phone}</div>,
    },
    {
      accessorKey: "height",
      header: () => <div className="text-center">قد</div>,
      cell: ({ row }) => <div className="text-center">{row.original.height}</div>,
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-center">وزن</div>,
      cell: ({ row }) => <div className="text-center">{row.original.weight}</div>,
    },
    {
      accessorKey: "payment",
      header: () => <div className="text-center">مبلغ</div>,
      cell: ({ row }) => <div className="text-center">{row.original.payment}</div>,
    },
    {
      accessorKey: "progress",
      header: () => <div className="text-center">تکمیل پروفایل</div>,
      cell: ({ row }) => (
        <div className="text-center">
          {isProfileComplete ? (
            <Badge variant="outline" className="gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              کامل
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-2">
              ناقص
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">اقدامات</div>,
      cell: ({ row }) => {
        const student = row.original;
        return (
          <td className="p-2 text-center">
            <div className="flex items-center justify-center gap-1">
              {onEdit ? (
                <Button
                  onClick={() => onEdit(student)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <EditStudentButton studentId={student.id} />
              )}
              
              <StudentActions
                student={student}
                onDelete={onDelete}
                onAddExercise={onAddExercise}
                onAddDiet={onAddDiet}
                onAddSupplement={onAddSupplement}
                onDownload={onDownload}
              />
            </div>
          </td>
        );
      },
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
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <tr>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                هنوز هیچ شاگردی ثبت نشده است.
              </TableCell>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
